# Historial de Vacunas COVID-19

Vista completa del historial de vacunación con gráficas interactivas y seguimiento de eventos.

## Componentes Creados

Todos los componentes están en `src/components/historial/` con su propio CSS modular:

### 1. **VaccineHeader**
Cabecera con información principal de la vacuna y botón de descarga de certificado.

**Props:**
- `vaccineName`: string - Nombre de la vacuna
- `vaccinationDate`: string - Fecha de vacunación
- `vaccineDose`: string - Dosis aplicada
- `patientName`: string - Nombre del paciente
- `patientAge`: number - Edad del paciente
- `applicationSite`: string - Sitio de aplicación

### 2. **StatsCard**
Tarjeta reutilizable para mostrar estadísticas.

**Props:**
- `icon`: ReactNode - Icono del componente
- `title`: string - Título de la estadística
- `value`: string - Valor principal
- `unit`: string (opcional) - Unidad de medida
- `status`: 'normal' | 'warning' | 'danger' - Estado visual

### 3. **TemperatureChart**
Gráfica de evolución de temperatura usando **Recharts**.

**Props:**
- `data`: Array<{ time: string, temperature: number }> - Datos de temperatura

### 4. **EventTimeline**
Línea de tiempo de eventos del proceso de vacunación.

**Props:**
- `events`: Array<TimelineEvent> - Lista de eventos

## Conectar con API o Base de Datos

### Opción 1: Usar API Routes de Next.js

Crea un archivo en `src/app/api/historial/route.ts`:

\`\`\`typescript
import { NextResponse } from 'next/server';

export async function GET() {
  // Conectar a tu base de datos
  const data = await fetch('TU_API_URL');
  const result = await data.json();
  
  return NextResponse.json(result);
}
\`\`\`

Luego en el componente page.tsx:

\`\`\`typescript
'use client';

import { useEffect, useState } from 'react';

export default function HistorialPage() {
  const [vaccineData, setVaccineData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/historial')
      .then(res => res.json())
      .then(data => {
        setVaccineData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className={styles.container}>
      <VaccineHeader {...vaccineData} />
      {/* resto de componentes */}
    </div>
  );
}
\`\`\`

### Opción 2: Server Components (Recomendado)

Convierte la página en un Server Component para mejor performance:

\`\`\`typescript
// src/app/historial/page.tsx
export default async function HistorialPage() {
  // Fetch directo desde el servidor
  const res = await fetch('TU_API_URL', {
    cache: 'no-store' // o 'force-cache' para cachear
  });
  const data = await res.json();

  return (
    <div className={styles.container}>
      <VaccineHeader {...data.vaccine} />
      <div className={styles.statsGrid}>
        {data.stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
      <TemperatureChart data={data.temperatureData} />
      <EventTimeline events={data.events} />
    </div>
  );
}
\`\`\`

### Opción 3: Con React Query (SWR o TanStack Query)

Instala SWR:
\`\`\`bash
npm install swr
\`\`\`

Usar en el componente:
\`\`\`typescript
'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function HistorialPage() {
  const { data, error, isLoading } = useSWR('/api/historial', fetcher);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar datos</div>;

  return (
    <div className={styles.container}>
      <VaccineHeader {...data.vaccine} />
      {/* resto de componentes */}
    </div>
  );
}
\`\`\`

## Formato de Datos Esperado

### Para la Gráfica de Temperatura (Recharts)

\`\`\`json
[
  { "time": "07:00 12/02", "temperature": -18.5 },
  { "time": "08:00 12/02", "temperature": -17.2 }
]
\`\`\`

**Conectar con Base de Datos:**
\`\`\`typescript
// Ejemplo con PostgreSQL usando Prisma
const temperatureData = await prisma.temperature.findMany({
  where: { vaccineId: params.id },
  select: {
    time: true,
    temperature: true
  },
  orderBy: { timestamp: 'asc' }
});
\`\`\`

### Para los Eventos

\`\`\`json
[
  {
    "id": 1,
    "title": "Fabricación Pfizer-Biotech",
    "date": "24/01/2023 16:24",
    "description": "Inicio del almacenaje...",
    "priority": "+98.4%"
  }
]
\`\`\`

## Estructura de Archivos

\`\`\`
src/
├── app/
│   └── historial/
│       ├── page.tsx              # Página principal
│       └── historial.module.css  # Estilos de la página
└── components/
    └── historial/
        ├── VaccineHeader/
        │   ├── VaccineHeader.tsx
        │   ├── VaccineHeader.module.css
        │   └── index.ts
        ├── StatsCard/
        │   ├── StatsCard.tsx
        │   ├── StatsCard.module.css
        │   └── index.ts
        ├── TemperatureChart/
        │   ├── TemperatureChart.tsx
        │   ├── TemperatureChart.module.css
        │   └── index.ts
        └── EventTimeline/
            ├── EventTimeline.tsx
            ├── EventTimeline.module.css
            └── index.ts
\`\`\`

## Tecnologías Utilizadas

- **Next.js 16** - Framework React
- **Recharts** - Librería de gráficas (instalada y configurada)
- **React Icons** - Iconos
- **CSS Modules** - Estilos modulares y encapsulados
- **TypeScript** - Tipado estático

## Ejecutar el Proyecto

\`\`\`bash
npm run dev
\`\`\`

Visita: `http://localhost:3000/historial`

## Personalización

### Cambiar Colores del Tema

Edita los archivos `.module.css` de cada componente. Los colores principales son:
- Azul principal: `#00bcd4`
- Fondo oscuro: `#0f2c47` a `#1a4d6d`
- Texto claro: `#ffffff`
- Texto secundario: `#8ab4d5`

### Modificar la Gráfica

En `TemperatureChart.tsx`, puedes ajustar:
- Rango del eje Y: `domain={[-25, -5]}`
- Color de la línea: `stroke="#00bcd4"`
- Tipo de interpolación: `type="monotone"` (puede ser "linear", "step", etc.)
