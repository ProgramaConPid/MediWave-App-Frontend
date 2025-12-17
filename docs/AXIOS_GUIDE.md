# Guía de Uso de Axios en MediWave

Este proyecto utiliza **Axios** para todas las llamadas a APIs. La configuración está centralizada y optimizada.

## 📁 Estructura

```
src/
├── lib/
│   └── axios.ts              # Configuración base de axios
├── services/
│   └── historialService.ts   # Servicios para el historial
├── hooks/
│   └── useHistorial.ts       # Hook personalizado
└── interfaces/
    └── historial.ts          # Interfaces TypeScript
```

## 🔧 Configuración Base

El archivo `src/lib/axios.ts` contiene la instancia configurada de axios con:

- **Base URL**: Configurable mediante variable de entorno
- **Timeout**: 10 segundos
- **Interceptores**: Manejo automático de tokens y errores
- **Headers**: Content-Type por defecto

### Variables de Entorno

Crea un archivo `.env.local` basado en `.env.example`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 📝 Crear un Nuevo Servicio

### 1. Define las interfaces en `src/interfaces/`

```typescript
export interface MiDato {
  id: string;
  nombre: string;
}
```

### 2. Crea el servicio en `src/services/`

```typescript
import axiosInstance from '../lib/axios';
import { MiDato } from '../interfaces/miInterface';

export const getMisDatos = async (): Promise<MiDato[]> => {
  try {
    const response = await axiosInstance.get<MiDato[]>('/mis-datos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
};

export const createMiDato = async (dato: Omit<MiDato, 'id'>): Promise<MiDato> => {
  try {
    const response = await axiosInstance.post<MiDato>('/mis-datos', dato);
    return response.data;
  } catch (error) {
    console.error('Error al crear dato:', error);
    throw error;
  }
};
```

### 3. Usa el servicio en tus componentes

#### Opción A: Directamente en el componente

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getMisDatos } from '@/services/miService';

export default function MiComponente() {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMisDatos();
        setDatos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) return <div>Cargando...</div>;

  return <div>{/* Renderiza tus datos */}</div>;
}
```

#### Opción B: Con Hook Personalizado (Recomendado)

```typescript
// src/hooks/useMisDatos.ts
import { useState, useEffect } from 'react';
import { getMisDatos } from '../services/miService';

export const useMisDatos = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMisDatos();
        setDatos(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return { datos, loading, error };
};

// En tu componente
'use client';

import { useMisDatos } from '@/hooks/useMisDatos';

export default function MiComponente() {
  const { datos, loading, error } = useMisDatos();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{/* Renderiza tus datos */}</div>;
}
```

## 🎯 Ejemplo Completo: Historial de Vacunas

### Uso del Hook

```typescript
'use client';

import { useHistorial } from '@/hooks/useHistorial';
import VaccineHeader from '@/components/ui/historial/VaccineHeader';

export default function HistorialPage() {
  const vaccineId = 'MED-2024-001';
  const { data, loading, error, refetch } = useHistorial(vaccineId);

  if (loading) {
    return <div>Cargando historial...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No se encontraron datos</div>;
  }

  return (
    <div>
      <VaccineHeader {...data.vaccine} />
      {/* Resto de componentes */}
    </div>
  );
}
```

## 🔐 Autenticación

El interceptor de axios agrega automáticamente el token de autenticación si existe en localStorage:

```typescript
// Para guardar el token después del login
localStorage.setItem('token', 'tu-token-jwt');

// Para eliminar el token al cerrar sesión
localStorage.removeItem('token');
```

## 📤 Manejo de Errores

Los errores se manejan automáticamente en los interceptores:

- **401 Unauthorized**: Elimina el token y redirige al login
- **Errores de red**: Se registran en consola
- **Otros errores**: Se propagan para manejo personalizado

### Ejemplo de manejo personalizado

```typescript
try {
  const data = await getMisDatos();
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      // Manejo específico para 404
    } else if (error.response?.status === 500) {
      // Manejo específico para 500
    }
  }
}
```

## 📥 Descargar Archivos

Ejemplo para descargar un PDF:

```typescript
import { downloadVaccineCertificate } from '@/services/historialService';

const handleDownload = async () => {
  try {
    const blob = await downloadVaccineCertificate('vaccine-id');
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'certificado.pdf';
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al descargar:', error);
  }
};
```

## 🚀 Operaciones CRUD Completas

```typescript
// GET - Obtener todos
export const getAll = async () => {
  const response = await axiosInstance.get('/items');
  return response.data;
};

// GET - Obtener uno por ID
export const getById = async (id: string) => {
  const response = await axiosInstance.get(`/items/${id}`);
  return response.data;
};

// POST - Crear
export const create = async (data: any) => {
  const response = await axiosInstance.post('/items', data);
  return response.data;
};

// PUT - Actualizar
export const update = async (id: string, data: any) => {
  const response = await axiosInstance.put(`/items/${id}`, data);
  return response.data;
};

// DELETE - Eliminar
export const remove = async (id: string) => {
  const response = await axiosInstance.delete(`/items/${id}`);
  return response.data;
};
```

## 📊 Tips y Mejores Prácticas

1. **Siempre define interfaces TypeScript** para las respuestas de la API
2. **Usa hooks personalizados** para reutilizar lógica de fetching
3. **Maneja estados de loading y error** en tus componentes
4. **Usa try-catch** en todas las llamadas a servicios
5. **Centraliza las rutas de la API** en constantes si es necesario
6. **Documenta tus servicios** con JSDoc

## 🔄 Revalidación de Datos

Con Next.js 13+ y Server Components, puedes usar:

```typescript
// Para revalidar datos en Server Components
import { revalidatePath } from 'next/cache';

export async function updateData() {
  await axiosInstance.put('/data');
  revalidatePath('/ruta');
}
```

## 📞 Soporte

Para más información sobre Axios: [Documentación oficial](https://axios-http.com/)
