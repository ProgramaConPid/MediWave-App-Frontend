import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  VaccineHeaderProps,
  StatsCardProps,
  TemperatureDataPoint,
  TimelineEvent,
} from '../interfaces/historial';

/**
 * Genera un PDF del historial completo
 * @param elementId - ID del elemento HTML a capturar
 * @param fileName - Nombre del archivo PDF (sin extensión)
 */
export const generateHistorialPDF = async (
  elementId: string = 'historial-content',
  fileName: string = 'historial-vacuna'
): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    
    if (!element) {
      throw new Error('Elemento no encontrado');
    }

    // Mostrar mensaje de carga
    const loadingElement = document.createElement('div');
    loadingElement.id = 'pdf-loading';
    loadingElement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(15, 44, 71, 0.95);
      padding: 30px;
      border-radius: 12px;
      color: white;
      font-size: 16px;
      z-index: 9999;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    `;
    loadingElement.textContent = 'Generando PDF...';
    document.body.appendChild(loadingElement);

    // Capturar el elemento como imagen
    const canvas = await html2canvas(element, {
      scale: 2, // Mayor calidad
      useCORS: true,
      logging: false,
      backgroundColor: '#0a1929',
    });

    // Eliminar mensaje de carga
    document.body.removeChild(loadingElement);

    const imgData = canvas.toDataURL('image/png');
    
    // Calcular dimensiones del PDF
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    // Crear PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // Agregar primera página
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Agregar páginas adicionales si es necesario
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Descargar el PDF
    pdf.save(`${fileName}-${new Date().toISOString().split('T')[0]}.pdf`);
  } catch (error) {
    console.error('Error al generar PDF:', error);
    alert('Error al generar el PDF. Por favor, intenta de nuevo.');
  }
};

/**
 * Genera un PDF usando jsPDF con datos estructurados
 * @param vaccineData - Datos de la vacuna
 * @param stats - Estadísticas
 * @param temperatureData - Datos de temperatura
 * @param events - Eventos de la cadena de frío
 * @param fileName - Nombre del archivo
 */
export const generateStructuredPDF = async (
  vaccineData: VaccineHeaderProps,
  stats: Omit<StatsCardProps, 'icon'>[],
  temperatureData: TemperatureDataPoint[],
  events: TimelineEvent[],
  fileName: string = 'historial-vacuna'
): Promise<void> => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    // Header
    pdf.setFillColor(15, 44, 71);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.text('Historial de Vacuna COVID-19', pageWidth / 2, 15, { align: 'center' });
    
    pdf.setFontSize(12);
    pdf.text(vaccineData.vaccineName, pageWidth / 2, 25, { align: 'center' });
    pdf.text(`ID: ${vaccineData.vaccineId} | Lote: ${vaccineData.lotNumber}`, pageWidth / 2, 32, { align: 'center' });

    yPosition = 50;

    // Información de la vacuna
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    pdf.text('Información de Trazabilidad', 15, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.text(`Origen: ${vaccineData.origin}`, 15, yPosition);
    yPosition += 7;
    pdf.text(`Destino: ${vaccineData.destination}`, 15, yPosition);
    yPosition += 7;
    pdf.text(`Rango Óptimo: ${vaccineData.temperatureRange}`, 15, yPosition);
    yPosition += 15;

    // Estadísticas
    pdf.setFontSize(14);
    pdf.text('Estadísticas de Temperatura', 15, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    stats.forEach((stat) => {
      pdf.text(`${stat.title}: ${stat.value}${stat.unit || ''}`, 15, yPosition);
      yPosition += 7;
    });
    yPosition += 10;

    // Tabla de temperaturas
    if (temperatureData.length > 0) {
      pdf.setFontSize(14);
      pdf.text('Registro de Temperaturas', 15, yPosition);
      yPosition += 10;

      pdf.setFontSize(9);
      const colWidth = (pageWidth - 30) / 2;

      // Headers
      pdf.setFillColor(26, 77, 109);
      pdf.setTextColor(255, 255, 255);
      pdf.rect(15, yPosition, colWidth, 8, 'F');
      pdf.rect(15 + colWidth, yPosition, colWidth, 8, 'F');
      pdf.text('Fecha/Hora', 17, yPosition + 5);
      pdf.text('Temperatura', 17 + colWidth, yPosition + 5);
      yPosition += 8;

      pdf.setTextColor(0, 0, 0);
      
      // Limitar a los primeros 20 registros para no exceder la página
      const displayData = temperatureData.slice(0, 20);
      
      displayData.forEach((temp, index: number) => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = 20;
        }

        const fillColor = index % 2 === 0 ? 240 : 255;
        pdf.setFillColor(fillColor, fillColor, fillColor);
        pdf.rect(15, yPosition, colWidth, 7, 'F');
        pdf.rect(15 + colWidth, yPosition, colWidth, 7, 'F');
        
        pdf.text(temp.time, 17, yPosition + 5);
        pdf.text(`${temp.temperature}°C`, 17 + colWidth, yPosition + 5);
        yPosition += 7;
      });

      yPosition += 10;
    }

    // Eventos
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = 20;
    }

    pdf.setFontSize(14);
    pdf.text('Timeline de Eventos', 15, yPosition);
    yPosition += 10;

    pdf.setFontSize(9);
    events.forEach((event) => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text(event.title, 15, yPosition);
      yPosition += 6;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.text(`Fecha: ${event.date}`, 15, yPosition);
      yPosition += 5;
      
      const lines = pdf.splitTextToSize(event.description, pageWidth - 30);
      pdf.text(lines, 15, yPosition);
      yPosition += lines.length * 5 + 8;
    });

    // Footer
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        `Página ${i} de ${totalPages} | Generado el ${new Date().toLocaleDateString('es-ES')}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }

    // Descargar
    pdf.save(`${fileName}-${new Date().toISOString().split('T')[0]}.pdf`);
  } catch (error) {
    console.error('Error al generar PDF estructurado:', error);
    alert('Error al generar el PDF. Por favor, intenta de nuevo.');
  }
};
