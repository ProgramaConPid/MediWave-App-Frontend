import jsPDF from 'jspdf';
import {
  VaccineHeaderProps,
  StatsCardProps,
  TemperatureDataPoint,
  TimelineEvent,
} from '../interfaces/historial';

/**
 * Generates a structured PDF using jsPDF with vaccine tracking data
 * @param vaccineData - Vaccine metadata (name, lot, origin, destination, temperature range)
 * @param stats - Temperature statistics (avg, min, max, violations)
 * @param temperatureData - Temperature readings over time
 * @param events - Timeline events of the cold chain
 * @param fileName - Output PDF filename (default: 'historial-vacuna')
 * @param medicationName - Display name of the medication
 */
export const generateStructuredPDF = async (
  vaccineData: VaccineHeaderProps,
  stats: Omit<StatsCardProps, 'icon'>[],
  temperatureData: TemperatureDataPoint[],
  events: TimelineEvent[],
  fileName: string = 'historial-vacuna',
  medicationName: string = 'Historial de Medicamento'
): Promise<void> => {
  try {
    // Create a new A4 PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    // HEADER: background rectangle and title
    pdf.setFillColor(15, 44, 71);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.text(`Historial de ${medicationName}`, pageWidth / 2, 15, { align: 'center' });
    pdf.setFontSize(12);
    pdf.text(vaccineData.vaccineName, pageWidth / 2, 25, { align: 'center' });
    pdf.text(`ID: ${vaccineData.vaccineId} | Lote: ${vaccineData.lotNumber}`, pageWidth / 2, 32, { align: 'center' });

    yPosition = 50;

    // Vaccine info section
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    pdf.text('Traceability Information', 15, yPosition);
    yPosition += 10;
    pdf.setFontSize(10);
    pdf.text(`Origin: ${vaccineData.origin}`, 15, yPosition);
    yPosition += 7;
    pdf.text(`Destination: ${vaccineData.destination}`, 15, yPosition);
    yPosition += 7;
    pdf.text(`Optimal Range: ${vaccineData.temperatureRange}`, 15, yPosition);
    yPosition += 15;

    // Temperature stats section
    pdf.setFontSize(14);
    pdf.text('Temperature Statistics', 15, yPosition);
    yPosition += 10;
    pdf.setFontSize(10);
    stats.forEach((stat) => {
      pdf.text(`${stat.title}: ${stat.value}${stat.unit || ''}`, 15, yPosition);
      yPosition += 7;
    });
    yPosition += 10;

    // Temperature data table
    if (temperatureData.length > 0) {
      pdf.setFontSize(14);
      pdf.text('Temperature Records', 15, yPosition);
      yPosition += 10;
      pdf.setFontSize(9);
      const colWidth = (pageWidth - 30) / 2;

      // Table headers
      pdf.setFillColor(26, 77, 109);
      pdf.setTextColor(255, 255, 255);
      pdf.rect(15, yPosition, colWidth, 8, 'F');
      pdf.rect(15 + colWidth, yPosition, colWidth, 8, 'F');
      pdf.text('Date/Time', 17, yPosition + 5);
      pdf.text('Temperature', 17 + colWidth, yPosition + 5);
      yPosition += 8;

      pdf.setTextColor(0, 0, 0);
      const displayData = temperatureData.slice(0, 20); // limit to 20 records

      // Fill table rows
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

    // Timeline events
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = 20;
    }
    pdf.setFontSize(14);
    pdf.text('Timeline Events', 15, yPosition);
    yPosition += 10;
    pdf.setFontSize(9);

    events.forEach((event) => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = 20;
      }

      // Event title
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text(event.title, 15, yPosition);
      yPosition += 6;

      // Event date
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.text(`Date: ${event.date}`, 15, yPosition);
      yPosition += 5;

      // Event description with word wrap
      const lines = pdf.splitTextToSize(event.description, pageWidth - 30);
      pdf.text(lines, 15, yPosition);
      yPosition += lines.length * 5 + 8;
    });

    // Footer with page numbers and generation date
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        `Page ${i} of ${totalPages} | Generated on ${new Date().toLocaleDateString('es-ES')}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }

    // Save PDF with current date in filename
    pdf.save(`${fileName}-${new Date().toISOString().split('T')[0]}.pdf`);
  } catch (error) {
    console.error('Error generating structured PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};
