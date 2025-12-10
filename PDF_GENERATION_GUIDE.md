# Generación de PDFs en MediWave

## 📄 Descripción

El sistema permite exportar el historial de vacunas en dos formatos de PDF:

1. **PDF Visual**: Captura todo el contenido visible (gráficas, estilos, colores)
2. **PDF Estructurado**: Genera un documento con datos tabulados y texto

## 🚀 Uso

### En la Página de Historial

Hay dos botones disponibles:

- **Exportar PDF Visual**: Captura la pantalla completa con todos los estilos
- **Exportar PDF Estructurado**: Genera un PDF profesional con datos organizados

```typescript
// PDF Visual - Captura todo el contenido
const handleGenerateVisualPDF = async () => {
  await generateHistorialPDF('historial-content', 'historial-vacuna-covid19');
};

// PDF Estructurado - Datos organizados
const handleGenerateStructuredPDF = async () => {
  const statsForPDF = statsData.map(({ icon, ...rest }) => rest);
  
  await generateStructuredPDF(
    vaccineData,
    statsForPDF,
    temperatureData,
    eventsData,
    'historial-vacuna-covid19'
  );
};
```

## 🔧 Funciones Disponibles

### `generateHistorialPDF(elementId, fileName)`

Captura un elemento HTML y lo convierte en PDF.

**Parámetros:**
- `elementId` (string): ID del elemento HTML a capturar
- `fileName` (string): Nombre del archivo (sin extensión .pdf)

**Ejemplo:**
```typescript
import { generateHistorialPDF } from '@/utils/pdfGenerator';

// Capturar un div específico
await generateHistorialPDF('mi-contenido', 'mi-reporte');
```

**Ventajas:**
- ✅ Captura estilos CSS, colores, gráficas
- ✅ Mantiene el diseño exacto
- ✅ Incluye gráficas de Recharts

**Desventajas:**
- ⚠️ Archivo más pesado
- ⚠️ Puede tener problemas con elementos muy largos

### `generateStructuredPDF(vaccineData, stats, temperatureData, events, fileName)`

Genera un PDF estructurado con datos organizados.

**Parámetros:**
- `vaccineData` (VaccineHeaderProps): Información de la vacuna
- `stats` (array): Estadísticas sin iconos
- `temperatureData` (TemperatureDataPoint[]): Datos de temperatura
- `events` (TimelineEvent[]): Eventos de la cadena
- `fileName` (string): Nombre del archivo

**Ejemplo:**
```typescript
import { generateStructuredPDF } from '@/utils/pdfGenerator';

await generateStructuredPDF(
  {
    vaccineName: 'Vacuna COVID-19',
    vaccineId: 'MED-2024-001',
    lotNumber: 'BTC-2024-001',
    // ... más datos
  },
  statsArray,
  temperatureArray,
  eventsArray,
  'reporte-vacuna'
);
```

**Ventajas:**
- ✅ Archivo más ligero
- ✅ Mejor para impresión
- ✅ Fácil de personalizar
- ✅ Soporta múltiples páginas automáticamente

**Desventajas:**
- ⚠️ No incluye gráficas
- ⚠️ Diseño más básico

## 🎨 Personalización

### Modificar Estilos del PDF Estructurado

Edita `src/utils/pdfGenerator.ts`:

```typescript
// Cambiar colores del header
pdf.setFillColor(15, 44, 71); // RGB del fondo

// Cambiar tamaño de fuente
pdf.setFontSize(20);

// Cambiar posición
let yPosition = 20; // Posición Y inicial
```

### Agregar Elementos al PDF

```typescript
// Agregar logo
pdf.addImage(logoBase64, 'PNG', x, y, width, height);

// Agregar línea
pdf.line(x1, y1, x2, y2);

// Agregar rectángulo
pdf.rect(x, y, width, height, 'F'); // 'F' = filled
```

## 📱 Integración con APIs

### Generar PDF desde datos de API

```typescript
'use client';

import { useHistorial } from '@/hooks/useHistorial';
import { generateStructuredPDF } from '@/utils/pdfGenerator';

export default function HistorialPage() {
  const { data, loading } = useHistorial('vaccine-id');

  const handleExport = async () => {
    if (!data) return;

    const statsForPDF = data.stats.map(({ icon, ...rest }) => rest);
    
    await generateStructuredPDF(
      data.vaccine,
      statsForPDF,
      data.temperatureData,
      data.events,
      `historial-${data.vaccine.vaccineId}`
    );
  };

  return (
    <div>
      <button onClick={handleExport} disabled={loading}>
        Exportar PDF
      </button>
      {/* Contenido */}
    </div>
  );
}
```

## 🔐 Enviar PDF por Email

```typescript
import { generateStructuredPDF } from '@/utils/pdfGenerator';
import axios from 'axios';

const sendPDFByEmail = async (email: string) => {
  // Generar PDF como Blob
  const pdf = new jsPDF();
  // ... configurar PDF
  const pdfBlob = pdf.output('blob');

  // Crear FormData
  const formData = new FormData();
  formData.append('pdf', pdfBlob, 'historial.pdf');
  formData.append('email', email);

  // Enviar al backend
  await axios.post('/api/send-pdf', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
```

## 🎯 Tips y Mejores Prácticas

### 1. Optimizar Rendimiento

```typescript
// Mostrar indicador de carga
const [isGenerating, setIsGenerating] = useState(false);

const handleExport = async () => {
  setIsGenerating(true);
  try {
    await generateHistorialPDF('content', 'reporte');
  } finally {
    setIsGenerating(false);
  }
};
```

### 2. Validar Datos Antes de Generar

```typescript
const handleExport = async () => {
  if (!vaccineData || temperatureData.length === 0) {
    alert('No hay datos suficientes para generar el PDF');
    return;
  }
  
  await generateStructuredPDF(/* ... */);
};
```

### 3. Manejar Errores

```typescript
const handleExport = async () => {
  try {
    await generateHistorialPDF('content', 'reporte');
    alert('PDF generado exitosamente');
  } catch (error) {
    console.error('Error:', error);
    alert('Error al generar el PDF');
  }
};
```

### 4. Personalizar Nombre del Archivo

```typescript
const fileName = `historial-${vaccineData.vaccineId}-${new Date().toISOString().split('T')[0]}`;
await generateStructuredPDF(data, fileName);
```

## 📊 Incluir Gráficas en PDF Estructurado

Para incluir la gráfica de Recharts en el PDF estructurado:

```typescript
import html2canvas from 'html2canvas';

// Capturar solo la gráfica
const chartElement = document.getElementById('temperature-chart');
const chartCanvas = await html2canvas(chartElement);
const chartImage = chartCanvas.toDataURL('image/png');

// Agregar al PDF
pdf.addImage(chartImage, 'PNG', 15, yPosition, 180, 100);
```

## 🌐 Compatibilidad

- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## 📦 Dependencias

```json
{
  "jspdf": "^2.x.x",
  "html2canvas": "^1.x.x"
}
```

## 🆘 Solución de Problemas

### El PDF está en blanco
- Verifica que el elemento con el ID existe
- Asegúrate de que el contenido esté renderizado antes de generar

### Las gráficas no aparecen
- Usa `generateHistorialPDF` en lugar de `generateStructuredPDF`
- Espera a que Recharts termine de renderizar

### Error de CORS con imágenes
- Usa `useCORS: true` en html2canvas
- Asegúrate de que las imágenes tienen CORS habilitado

### PDF muy grande
- Reduce la escala: `scale: 1` en lugar de `scale: 2`
- Usa `generateStructuredPDF` para archivos más ligeros

## 📚 Recursos Adicionales

- [jsPDF Documentation](https://github.com/parallax/jsPDF)
- [html2canvas Documentation](https://html2canvas.hertzen.com/)
