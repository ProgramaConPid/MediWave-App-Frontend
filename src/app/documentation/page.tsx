"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Database,
  Shield,
  Thermometer,
  MapPin,
  Bell,
  Code,
  FileJson,
  Layers,
  Zap,
  BookOpen,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  Cpu,
  Lock,
  Globe,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FloatingHexagons from "@/components/FloatingHexagons";
import BlockchainNetwork from "@/components/BlockchainNetwork";

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden">
      <div className="absolute top-0 left-0 px-3 py-1 text-xs font-mono text-primary bg-primary/10 rounded-br-lg">
        {language}
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-lg glass opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/20"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      <pre className="bg-card/80 backdrop-blur-xl border border-border/50 p-6 pt-10 overflow-x-auto">
        <code className="text-sm font-mono text-foreground/90">{code}</code>
      </pre>
    </div>
  );
};

const FeatureSection = ({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: any;
  title: string;
  description: string;
  children?: React.ReactNode;
}) => (
  <div className="glass-strong rounded-2xl p-8 hover:border-primary/30 transition-all duration-500 group">
    <div className="flex items-start gap-4 mb-6">
      <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
    {children}
  </div>
);

const DocNavItem = ({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
      active
        ? "bg-primary/20 text-primary border border-primary/30"
        : "hover:bg-card/60 text-muted-foreground hover:text-foreground"
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
    {active && <ChevronRight className="w-4 h-4 ml-auto" />}
  </button>
);

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const navItems = [
    { id: "overview", icon: BookOpen, label: "Visión General" },
    { id: "architecture", icon: Layers, label: "Arquitectura" },
    { id: "api", icon: Code, label: "API Reference" },
    { id: "blockchain", icon: Shield, label: "Blockchain" },
    { id: "coldchain", icon: Thermometer, label: "Cadena de Frío" },
    { id: "faq", icon: Zap, label: "FAQ" },
  ];

  const apiEndpoints = [
    {
      method: "GET",
      endpoint: "/api/v1/shipments",
      description: "Obtener todos los envíos activos",
    },
    {
      method: "GET",
      endpoint: "/api/v1/shipments/:id",
      description: "Obtener detalles de un envío específico",
    },
    {
      method: "POST",
      endpoint: "/api/v1/shipments",
      description: "Crear nuevo envío con registro blockchain",
    },
    {
      method: "PUT",
      endpoint: "/api/v1/temperature/:id",
      description: "Actualizar lectura de temperatura",
    },
    {
      method: "GET",
      endpoint: "/api/v1/blockchain/verify/:hash",
      description: "Verificar transacción en blockchain",
    },
  ];

  const faqItems = [
    {
      question: "¿Cómo se garantiza la integridad de los datos de temperatura?",
      answer:
        "Cada lectura de temperatura se registra automáticamente en la blockchain con timestamp inmutable. Los sensores IoT certificados envían datos encriptados que son validados antes de su registro permanente.",
    },
    {
      question: "¿Qué sucede si la cadena de frío se rompe?",
      answer:
        "El sistema genera alertas inmediatas a través de múltiples canales (SMS, email, dashboard). Se registra el evento en blockchain como evidencia y se activan protocolos de contingencia configurables por el usuario.",
    },
    {
      question: "¿Qué blockchain utiliza el sistema?",
      answer:
        "Utilizamos una arquitectura híbrida con Ethereum para registros públicos verificables y una red privada para datos sensibles, garantizando transparencia sin comprometer la confidencialidad.",
    },
    {
      question: "¿Cómo se integra con sistemas existentes?",
      answer:
        "Ofrecemos APIs RESTful y webhooks para integración con ERPs, WMS y otros sistemas. También soportamos protocolos estándar de la industria farmacéutica como GS1 EPCIS.",
    },
    {
      question: "¿Cuál es la latencia del sistema de monitoreo?",
      answer:
        "Las lecturas de temperatura se procesan en menos de 500ms. Las alertas críticas se disparan en tiempo real con latencia máxima de 2 segundos desde la detección hasta la notificación.",
    },
  ];

  return (
    <div className="min-h-screen gradient-cold relative overflow-hidden">
      <BlockchainNetwork />
      <FloatingHexagons />

      {/* Ambient Effects */}
      <div className="fixed top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="fixed bottom-1/4 -right-32 w-96 h-96 bg-glacier/20 rounded-full blur-3xl animate-pulse-glow" />

      {/* Header */}
      <header className="relative z-20 glass border-b border-border/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-glacier group-hover:scale-110 transition-transform">
                <Thermometer className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                ColdChain<span className="text-primary">Docs</span>
              </span>
            </Link>

            <nav className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-card/40 transition-colors text-muted-foreground hover:text-foreground"
              >
                <Home className="w-4 h-4" />
                <span>Inicio</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-card/40 transition-colors text-muted-foreground hover:text-foreground"
              >
                <Database className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/history"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-card/40 transition-colors text-muted-foreground hover:text-foreground"
              >
                <Workflow className="w-4 h-4" />
                <span>Historial</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar Navigation */}
          <aside className="glass-strong rounded-2xl p-6 h-fit sticky top-24">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Documentación
            </h2>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <DocNavItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  active={activeSection === item.id}
                  onClick={() => setActiveSection(item.id)}
                />
              ))}
            </nav>

            {/* Quick Links */}
            <div className="mt-8 pt-6 border-t border-border/30">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Enlaces Rápidos
              </h3>
              <div className="space-y-2">
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  GitHub Repository
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  API Playground
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Status Page
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="space-y-8">
            {/* Overview Section */}
            {activeSection === "overview" && (
              <div className="space-y-8 animate-fade-in">
                <div className="glass-strong rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-1 w-12 bg-gradient-to-r from-primary to-glacier rounded-full" />
                    <span className="text-primary font-mono text-sm">
                      v2.0.0
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold text-foreground mb-4">
                    Documentación ColdChain
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Sistema de trazabilidad farmacéutica con verificación
                    blockchain y monitoreo de cadena de frío en tiempo real.
                  </p>
                </div>

                {/* Quick Start Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="glass rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group cursor-pointer">
                    <Cpu className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      Inicio Rápido
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Configura tu primer envío en menos de 5 minutos
                    </p>
                  </div>
                  <div className="glass rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group cursor-pointer">
                    <Lock className="w-10 h-10 text-glacier mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      Seguridad
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Encriptación end-to-end y registros inmutables
                    </p>
                  </div>
                  <div className="glass rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group cursor-pointer">
                    <Globe className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      Integraciones
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      APIs RESTful y webhooks para cualquier sistema
                    </p>
                  </div>
                </div>

                {/* Installation */}
                <FeatureSection
                  icon={Code}
                  title="Instalación"
                  description="Instala el SDK de ColdChain en tu proyecto"
                >
                  <Tabs defaultValue="npm" className="mt-4">
                    <TabsList className="glass mb-4">
                      <TabsTrigger value="npm">npm</TabsTrigger>
                      <TabsTrigger value="yarn">yarn</TabsTrigger>
                      <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                    </TabsList>
                    <TabsContent value="npm">
                      <CodeBlock
                        language="bash"
                        code="npm install @coldchain/sdk @coldchain/blockchain"
                      />
                    </TabsContent>
                    <TabsContent value="yarn">
                      <CodeBlock
                        language="bash"
                        code="yarn add @coldchain/sdk @coldchain/blockchain"
                      />
                    </TabsContent>
                    <TabsContent value="pnpm">
                      <CodeBlock
                        language="bash"
                        code="pnpm add @coldchain/sdk @coldchain/blockchain"
                      />
                    </TabsContent>
                  </Tabs>
                </FeatureSection>
              </div>
            )}

            {/* Architecture Section */}
            {activeSection === "architecture" && (
              <div className="space-y-8 animate-fade-in">
                <div className="glass-strong rounded-2xl p-8">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Arquitectura del Sistema
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Una arquitectura distribuida diseñada para máxima
                    confiabilidad y escalabilidad.
                  </p>

                  {/* Architecture Diagram */}
                  <div className="relative bg-card/60 rounded-xl p-8 border border-border/50">
                    <div className="grid grid-cols-3 gap-8">
                      {/* IoT Layer */}
                      <div className="text-center">
                        <div className="glass rounded-xl p-6 mb-4 hover:border-primary/50 transition-all">
                          <Thermometer className="w-12 h-12 text-primary mx-auto mb-3" />
                          <h4 className="font-bold text-foreground">
                            Capa IoT
                          </h4>
                          <p className="text-xs text-muted-foreground mt-2">
                            Sensores y dispositivos
                          </p>
                        </div>
                        <div className="h-8 w-px bg-gradient-to-b from-primary to-transparent mx-auto" />
                      </div>

                      {/* Processing Layer */}
                      <div className="text-center">
                        <div className="glass rounded-xl p-6 mb-4 hover:border-glacier/50 transition-all">
                          <Database className="w-12 h-12 text-glacier mx-auto mb-3" />
                          <h4 className="font-bold text-foreground">
                            Procesamiento
                          </h4>
                          <p className="text-xs text-muted-foreground mt-2">
                            Edge computing & APIs
                          </p>
                        </div>
                        <div className="h-8 w-px bg-gradient-to-b from-glacier to-transparent mx-auto" />
                      </div>

                      {/* Blockchain Layer */}
                      <div className="text-center">
                        <div className="glass rounded-xl p-6 mb-4 hover:border-accent/50 transition-all">
                          <Shield className="w-12 h-12 text-accent mx-auto mb-3" />
                          <h4 className="font-bold text-foreground">
                            Blockchain
                          </h4>
                          <p className="text-xs text-muted-foreground mt-2">
                            Registro inmutable
                          </p>
                        </div>
                        <div className="h-8 w-px bg-gradient-to-b from-accent to-transparent mx-auto" />
                      </div>
                    </div>

                    {/* Connection Lines Animation */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                      <div className="absolute top-1/2 left-1/4 w-1/2 h-px bg-gradient-to-r from-primary via-glacier to-accent animate-shimmer" />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FeatureSection
                    icon={Cpu}
                    title="Edge Computing"
                    description="Procesamiento local para latencia mínima y operación offline."
                  >
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Procesamiento en tiempo real {"<"}100ms
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Buffer local para operación sin conexión
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Sincronización automática
                      </li>
                    </ul>
                  </FeatureSection>

                  <FeatureSection
                    icon={Lock}
                    title="Seguridad"
                    description="Múltiples capas de protección para tus datos sensibles."
                  >
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-glacier" />
                        Encriptación AES-256 en reposo
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-glacier" />
                        TLS 1.3 en tránsito
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-glacier" />
                        Firmas digitales blockchain
                      </li>
                    </ul>
                  </FeatureSection>
                </div>
              </div>
            )}

            {/* API Reference Section */}
            {activeSection === "api" && (
              <div className="space-y-8 animate-fade-in">
                <div className="glass-strong rounded-2xl p-8">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    API Reference
                  </h2>
                  <p className="text-muted-foreground">
                    Documentación completa de endpoints RESTful para integrar
                    ColdChain en tu aplicación.
                  </p>
                </div>

                {/* Base URL */}
                <div className="glass rounded-xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    Base URL
                  </h3>
                  <CodeBlock
                    language="text"
                    code="https://api.coldchain.io/v1"
                  />
                </div>

                {/* Endpoints Table */}
                <div className="glass-strong rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-border/30">
                    <h3 className="text-xl font-bold text-foreground">
                      Endpoints
                    </h3>
                  </div>
                  <div className="divide-y divide-border/30">
                    {apiEndpoints.map((endpoint, index) => (
                      <div
                        key={index}
                        className="p-6 hover:bg-card/40 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <span
                            className={`px-3 py-1 rounded-lg text-xs font-bold ${
                              endpoint.method === "GET"
                                ? "bg-green-500/20 text-green-400"
                                : endpoint.method === "POST"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {endpoint.method}
                          </span>
                          <div className="flex-1">
                            <code className="text-foreground font-mono">
                              {endpoint.endpoint}
                            </code>
                            <p className="text-sm text-muted-foreground mt-1">
                              {endpoint.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Example */}
                <FeatureSection
                  icon={FileJson}
                  title="Ejemplo de Request"
                  description="Crear un nuevo envío con datos de temperatura"
                >
                  <div className="mt-4">
                    <CodeBlock
                      language="javascript"
                      code={`const response = await fetch('https://api.coldchain.io/v1/shipments', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    medicineId: 'MED-2024-001',
    origin: 'Laboratorio Central, Madrid',
    destination: 'Hospital Universitario, Barcelona',
    temperatureRange: {
      min: 2,
      max: 8,
      unit: 'celsius'
    },
    blockchain: {
      network: 'ethereum',
      verify: true
    }
  })
});

const data = await response.json();
console.log('Shipment created:', data.transactionHash);`}
                    />
                  </div>
                </FeatureSection>
              </div>
            )}

            {/* Blockchain Section */}
            {activeSection === "blockchain" && (
              <div className="space-y-8 animate-fade-in">
                <div className="glass-strong rounded-2xl p-8">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Verificación Blockchain
                  </h2>
                  <p className="text-muted-foreground">
                    Registro inmutable y verificable de cada evento en la cadena
                    de suministro.
                  </p>
                </div>

                {/* Blockchain Features */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FeatureSection
                    icon={Shield}
                    title="Smart Contracts"
                    description="Contratos inteligentes auditados para automatización segura."
                  >
                    <CodeBlock
                      language="solidity"
                      code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ColdChainRegistry {
    struct TemperatureRecord {
        uint256 timestamp;
        int8 temperature;
        bytes32 sensorId;
        bool isValid;
    }
    
    mapping(bytes32 => TemperatureRecord[]) 
        public shipmentRecords;
    
    event TemperatureLogged(
        bytes32 indexed shipmentId,
        int8 temperature,
        uint256 timestamp
    );
}`}
                    />
                  </FeatureSection>

                  <FeatureSection
                    icon={Layers}
                    title="Arquitectura Híbrida"
                    description="Combinación de redes públicas y privadas para máxima flexibilidad."
                  >
                    <div className="mt-4 space-y-4">
                      <div className="glass rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                          <span className="font-medium text-foreground">
                            Ethereum Mainnet
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Registros públicos verificables por cualquier parte
                        </p>
                      </div>
                      <div className="glass rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-3 h-3 rounded-full bg-glacier animate-pulse" />
                          <span className="font-medium text-foreground">
                            Red Privada
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Datos sensibles con acceso controlado
                        </p>
                      </div>
                    </div>
                  </FeatureSection>
                </div>

                {/* Verification Flow */}
                <div className="glass-strong rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Flujo de Verificación
                  </h3>
                  <div className="flex items-center justify-between gap-4">
                    {[
                      { step: 1, label: "Lectura Sensor", icon: Thermometer },
                      { step: 2, label: "Firma Digital", icon: Lock },
                      { step: 3, label: "Smart Contract", icon: Code },
                      { step: 4, label: "Confirmación", icon: Check },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-2 group hover:bg-primary/20 transition-all">
                            <item.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {item.label}
                          </span>
                        </div>
                        {index < 3 && (
                          <ChevronRight className="w-6 h-6 text-muted-foreground/50" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Cold Chain Section */}
            {activeSection === "coldchain" && (
              <div className="space-y-8 animate-fade-in">
                <div className="glass-strong rounded-2xl p-8">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Monitoreo de Cadena de Frío
                  </h2>
                  <p className="text-muted-foreground">
                    Sistema de monitoreo en tiempo real con alertas automáticas
                    y registro blockchain.
                  </p>
                </div>

                {/* Temperature Ranges */}
                <div className="glass-strong rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Rangos de Temperatura Estándar
                  </h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      {
                        range: "2-8°C",
                        label: "Refrigerado",
                        color: "bg-temp-optimal",
                      },
                      {
                        range: "-20°C",
                        label: "Congelado",
                        color: "bg-temp-cold",
                      },
                      {
                        range: "-70°C",
                        label: "Ultra-frío",
                        color: "bg-primary",
                      },
                      {
                        range: "15-25°C",
                        label: "Ambiente",
                        color: "bg-temp-warm",
                      },
                    ].map((temp, index) => (
                      <div key={index} className="glass rounded-xl p-6 text-center">
                        <div
                          className={`w-4 h-4 ${temp.color} rounded-full mx-auto mb-3`}
                        />
                        <span className="text-2xl font-bold text-foreground">
                          {temp.range}
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {temp.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alert Configuration */}
                <FeatureSection
                  icon={Bell}
                  title="Configuración de Alertas"
                  description="Personaliza umbrales y canales de notificación"
                >
                  <CodeBlock
                    language="json"
                    code={`{
  "alertConfig": {
    "thresholds": {
      "warning": { "deviation": 1.5, "unit": "celsius" },
      "critical": { "deviation": 3.0, "unit": "celsius" }
    },
    "channels": {
      "email": ["ops@pharma.com", "qa@pharma.com"],
      "sms": ["+34600000000"],
      "webhook": "https://your-system.com/alerts"
    },
    "escalation": {
      "warningDelay": 300,
      "criticalImmediate": true
    }
  }
}`}
                  />
                </FeatureSection>

                {/* Sensors */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="glass rounded-xl p-6 text-center hover:border-primary/30 transition-all group">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Thermometer className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">
                      Sensores IoT
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Precisión ±0.1°C certificada
                    </p>
                  </div>
                  <div className="glass rounded-xl p-6 text-center hover:border-glacier/30 transition-all group">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-glacier/20 to-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <MapPin className="w-8 h-8 text-glacier" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">
                      GPS Integrado
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Ubicación en tiempo real
                    </p>
                  </div>
                  <div className="glass rounded-xl p-6 text-center hover:border-accent/30 transition-all group">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-glacier/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Zap className="w-8 h-8 text-accent" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">
                      Batería 5 años
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Sin mantenimiento
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* FAQ Section */}
            {activeSection === "faq" && (
              <div className="space-y-8 animate-fade-in">
                <div className="glass-strong rounded-2xl p-8">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Preguntas Frecuentes
                  </h2>
                  <p className="text-muted-foreground">
                    Respuestas a las dudas más comunes sobre el sistema
                    ColdChain.
                  </p>
                </div>

                <div className="glass-strong rounded-2xl p-6">
                  <Accordion type="single" collapsible className="space-y-2">
                    {faqItems.map((item, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="glass rounded-xl px-6 border-none"
                      >
                        <AccordionTrigger className="text-foreground hover:text-primary hover:no-underline py-6">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-6">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* Contact CTA */}
                <div className="glass-strong rounded-2xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    ¿Tienes más preguntas?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Nuestro equipo está disponible para ayudarte
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button className="bg-gradient-to-r from-primary to-glacier hover:opacity-90">
                      Contactar Soporte
                    </Button>
                    <Button variant="outline" className="border-border/50">
                      Unirse a Discord
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 glass border-t border-border/30 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 ColdChain. Trazabilidad farmacéutica con tecnología
              blockchain.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Términos
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacidad
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Seguridad
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Documentation;
