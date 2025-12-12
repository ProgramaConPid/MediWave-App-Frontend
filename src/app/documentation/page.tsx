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
import ParticlesBackground from "@/components/ParticlesBackground";
import styles from "./documentation.module.css";

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`${styles.codeBlockContainer} group`}>
      <div className={styles.languageLabel}>
        {language}
      </div>
      <button
        onClick={handleCopy}
        className={styles.copyButton}
      >
        {copied ? (
          <Check className={styles.checkIcon} />
        ) : (
          <Copy className={styles.copyIcon} />
        )}
      </button>
      <pre className={styles.codePre}>
        <code className={styles.codeContent}>{code}</code>
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
  <div className={`${styles.featureSection} group`}>
    <div className={styles.featureHeader}>
      <div className={styles.featureIconContainer}>
        <Icon className={styles.featureIcon} />
      </div>
      <div>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
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
    className={`${styles.navItem} ${
      active
        ? styles.navItemActive
        : styles.navItemInactive
    }`}
  >
    <Icon className={styles.navIcon} />
    <span className={styles.navLabel}>{label}</span>
    {active && <ChevronRight className={styles.navChevron} />}
  </button>
);

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const navItems = [
    { id: "overview", icon: BookOpen, label: "Visión General" },
    { id: "architecture", icon: Layers, label: "Arquitectura" },
    { id: "api", icon: Code, label: "API Reference" },
    { id: "blockchain", icon: Shield, label: "Blockchain" },
    { id: "MediWave", icon: Thermometer, label: "Cadena de Frío" },
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
    <div className={styles.pageContainer}>
      <ParticlesBackground />
      <BlockchainNetwork />
      <FloatingHexagons />

      {/* Ambient Effects */}
      <div className={styles.ambientEffect1} />
      <div className={styles.ambientEffect2} />

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.headerContent}>
            <Link href="/" className={`${styles.logoLink} group`}>
              <div className={styles.logoIconContainer}>
                <Thermometer className={styles.logoIcon} />
              </div>
              <span className={styles.logoText}>
                MediWave<span className={styles.logoTextHighlight}>Docs</span>
              </span>
            </Link>

            <nav className={styles.nav}>
              <Link
                href="/"
                className={styles.navLink}
              >
                <Home className={styles.navLinkIcon} />
                <span>Inicio</span>
              </Link>
              <Link
                href="/dashboard"
                className={styles.navLink}
              >
                <Database className={styles.navLinkIcon} />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/history"
                className={styles.navLink}
              >
                <Workflow className={styles.navLinkIcon} />
                <span>Historial</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className={styles.mainContainer}>
        <div className={styles.contentGrid}>
          {/* Sidebar Navigation */}
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>
              Documentación
            </h2>
            <nav className={styles.sidebarNav}>
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
            <div className={styles.quickLinksContainer}>
              <h3 className={styles.sidebarTitle}>
                Enlaces Rápidos
              </h3>
              <div className={styles.sidebarNav}>
                <a
                  href="#"
                  className={styles.quickLink}
                >
                  <ExternalLink className={styles.navLinkIcon} />
                  GitHub Repository
                </a>
                <a
                  href="#"
                  className={styles.quickLink}
                >
                  <ExternalLink className={styles.navLinkIcon} />
                  API Playground
                </a>
                <a
                  href="#"
                  className={styles.quickLink}
                >
                  <ExternalLink className={styles.navLinkIcon} />
                  Status Page
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className={styles.mainContent}>
            {/* Overview Section */}
            {activeSection === "overview" && (
              <div className={styles.sectionFadeIn}>
                <div className={styles.heroCard}>
                  <div className={styles.versionBadge}>
                    <div className={styles.versionIndicator} />
                    <span className={styles.versionText}>
                      v2.0.0
                    </span>
                  </div>
                  <h1 className={styles.heroTitle}>
                    Documentación MediWave
                  </h1>
                  <p className={styles.heroDescription}>
                    Sistema de trazabilidad farmacéutica con verificación
                    blockchain y monitoreo de cadena de frío en tiempo real.
                  </p>
                </div>

                {/* Quick Start Cards */}
                <div className={styles.quickStartGrid}>
                  <div className={`${styles.quickStartCard} group`}>
                    <Cpu className={styles.quickStartIcon} />
                    <h3 className={styles.quickStartTitle}>
                      Inicio Rápido
                    </h3>
                    <p className={styles.quickStartText}>
                      Configura tu primer envío en menos de 5 minutos
                    </p>
                  </div>
                  <div className={styles.quickStartCard}>
                    <Lock className={styles.quickStartIconGlacier} />
                    <h3 className={styles.quickStartTitle}>
                      Seguridad
                    </h3>
                    <p className={styles.quickStartText}>
                      Encriptación end-to-end y registros inmutables
                    </p>
                  </div>
                  <div className={styles.quickStartCard}>
                    <Globe className={styles.quickStartIconAccent} />
                    <h3 className={styles.quickStartTitle}>
                      Integraciones
                    </h3>
                    <p className={styles.quickStartText}>
                      APIs RESTful y webhooks para cualquier sistema
                    </p>
                  </div>
                </div>

                {/* Installation */}
                <FeatureSection
                  icon={Code}
                  title="Instalación"
                  description="Instala el SDK de MediWave en tu proyecto"
                >
                  <Tabs defaultValue="npm" className="mt-4">
                    <TabsList className={styles.tabsList}>
                      <TabsTrigger value="npm">npm</TabsTrigger>
                      <TabsTrigger value="yarn">yarn</TabsTrigger>
                      <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                    </TabsList>
                    <TabsContent value="npm">
                      <CodeBlock
                        language="bash"
                        code="npm install @MediWave/sdk @MediWave/blockchain"
                      />
                    </TabsContent>
                    <TabsContent value="yarn">
                      <CodeBlock
                        language="bash"
                        code="yarn add @MediWave/sdk @MediWave/blockchain"
                      />
                    </TabsContent>
                    <TabsContent value="pnpm">
                      <CodeBlock
                        language="bash"
                        code="pnpm add @MediWave/sdk @MediWave/blockchain"
                      />
                    </TabsContent>
                  </Tabs>
                </FeatureSection>
              </div>
            )}

            {/* Architecture Section */}
            {activeSection === "architecture" && (
              <div className={styles.sectionFadeIn}>
                <div className={styles.heroCard}>
                  <h2 className={styles.architectureTitle}>
                    Arquitectura del Sistema
                  </h2>
                  <p className={styles.architectureDescription}>
                    Una arquitectura distribuida diseñada para máxima
                    confiabilidad y escalabilidad.
                  </p>

                  {/* Architecture Diagram */}
                  <div className={styles.diagramContainer}>
                    <div className={styles.diagramGrid}>
                      {/* IoT Layer */}
                      <div className={styles.diagramNode}>
                        <div className={styles.diagramCard}>
                          <Thermometer className={styles.diagramIcon} />
                          <h4 className={styles.diagramTitle}>
                            Capa IoT
                          </h4>
                          <p className={styles.diagramSubtitle}>
                            Sensores y dispositivos
                          </p>
                        </div>
                        <div className={styles.diagramLinePrimary} />
                      </div>

                      {/* Processing Layer */}
                      <div className={styles.diagramNode}>
                        <div className={styles.diagramCardGlacier}>
                          <Database className={styles.diagramIconGlacier} />
                          <h4 className={styles.diagramTitle}>
                            Procesamiento
                          </h4>
                          <p className={styles.diagramSubtitle}>
                            Edge computing & APIs
                          </p>
                        </div>
                        <div className={styles.diagramLineGlacier} />
                      </div>

                      {/* Blockchain Layer */}
                      <div className={styles.diagramNode}>
                        <div className={styles.diagramCardAccent}>
                          <Shield className={styles.diagramIconAccent} />
                          <h4 className={styles.diagramTitle}>
                            Blockchain
                          </h4>
                          <p className={styles.diagramSubtitle}>
                            Registro inmutable
                          </p>
                        </div>
                        <div className={styles.diagramLineAccent} />
                      </div>
                    </div>

                    {/* Connection Lines Animation */}
                    <div className={styles.diagramShimmer}>
                      <div className={styles.diagramShimmerLine} />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FeatureSection
                    icon={Cpu}
                    title="Edge Computing"
                    description="Procesamiento local para latencia mínima y operación offline."
                  >
                    <ul className={styles.featureList}>
                      <li className={styles.featureListItem}>
                        <div className={styles.featureDotPrimary} />
                        Procesamiento en tiempo real {"<"}100ms
                      </li>
                      <li className={styles.featureListItem}>
                        <div className={styles.featureDotPrimary} />
                        Buffer local para operación sin conexión
                      </li>
                      <li className={styles.featureListItem}>
                        <div className={styles.featureDotPrimary} />
                        Sincronización automática
                      </li>
                    </ul>
                  </FeatureSection>

                  <FeatureSection
                    icon={Lock}
                    title="Seguridad"
                    description="Múltiples capas de protección para tus datos sensibles."
                  >
                    <ul className={styles.featureList}>
                      <li className={styles.featureListItem}>
                        <div className={styles.featureDotGlacier} />
                        Encriptación AES-256 en reposo
                      </li>
                      <li className={styles.featureListItem}>
                        <div className={styles.featureDotGlacier} />
                        TLS 1.3 en tránsito
                      </li>
                      <li className={styles.featureListItem}>
                        <div className={styles.featureDotGlacier} />
                        Firmas digitales blockchain
                      </li>
                    </ul>
                  </FeatureSection>
                </div>
              </div>
            )}

            {/* API Reference Section */}
            {activeSection === "api" && (
              <div className={styles.sectionFadeIn}>
                <div className={styles.heroCard}>
                  <h2 className={styles.architectureTitle}>
                    API Reference
                  </h2>
                  <p className={styles.featureDescription}>
                    Documentación completa de endpoints RESTful para integrar
                    MediWave en tu aplicación.
                  </p>
                </div>

                {/* Base URL */}
                <div className={styles.baseUrlCard}>
                  <h3 className={styles.baseUrlTitle}>
                    Base URL
                  </h3>
                  <CodeBlock
                    language="text"
                    code="https://api.MediWave.io/v1"
                  />
                </div>

                {/* Endpoints Table */}
                <div className={styles.endpointsContainer}>
                  <div className={styles.endpointsHeader}>
                    <h3 className={styles.endpointsTitle}>
                      Endpoints
                    </h3>
                  </div>
                  <div className={styles.endpointsList}>
                    {apiEndpoints.map((endpoint, index) => (
                      <div
                        key={index}
                        className={styles.endpointItem}
                      >
                        <div className={styles.endpointContent}>
                          <span
                            className={`${styles.methodBadge} ${
                              endpoint.method === "GET"
                                ? styles.methodGet
                                : endpoint.method === "POST"
                                ? styles.methodPost
                                : styles.methodOther
                            }`}
                          >
                            {endpoint.method}
                          </span>
                          <div className="flex-1">
                            <code className={styles.endpointUrl}>
                              {endpoint.endpoint}
                            </code>
                            <p className={styles.endpointDescription}>
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
                      code={`const response = await fetch('https://api.MediWave.io/v1/shipments', {
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
              <div className={styles.sectionFadeIn}>
                <div className={styles.heroCard}>
                  <h2 className={styles.architectureTitle}>
                    Verificación Blockchain
                  </h2>
                  <p className={styles.featureDescription}>
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

contract MediWaveRegistry {
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
                    <div className={styles.hybridArchContainer}>
                      <div className={styles.hybridArchCard}>
                        <div className={styles.hybridArchHeader}>
                          <div className={styles.hybridArchDotPrimary} />
                          <span className={styles.hybridArchTitle}>
                            Ethereum Mainnet
                          </span>
                        </div>
                        <p className={styles.hybridArchText}>
                          Registros públicos verificables por cualquier parte
                        </p>
                      </div>
                      <div className={styles.hybridArchCard}>
                        <div className={styles.hybridArchHeader}>
                          <div className={styles.hybridArchDotGlacier} />
                          <span className={styles.hybridArchTitle}>
                            Red Privada
                          </span>
                        </div>
                        <p className={styles.hybridArchText}>
                          Datos sensibles con acceso controlado
                        </p>
                      </div>
                    </div>
                  </FeatureSection>
                </div>

                {/* Verification Flow */}
                <div className={styles.verificationFlow}>
                  <h3 className={styles.verificationTitle}>
                    Flujo de Verificación
                  </h3>
                  <div className={styles.verificationSteps}>
                    {[
                      { step: 1, label: "Lectura Sensor", icon: Thermometer },
                      { step: 2, label: "Firma Digital", icon: Lock },
                      { step: 3, label: "Smart Contract", icon: Code },
                      { step: 4, label: "Confirmación", icon: Check },
                    ].map((item, index) => (
                      <div key={index} className={styles.verificationStep}>
                        <div className="text-center">
                          <div className={`${styles.verificationIconContainer} group`}>
                            <item.icon className={styles.verificationIcon} />
                          </div>
                          <span className={styles.verificationLabel}>
                            {item.label}
                          </span>
                        </div>
                        {index < 3 && (
                          <ChevronRight className={styles.verificationArrow} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Cold Chain Section */}
            {activeSection === "MediWave" && (
              <div className={styles.sectionFadeIn}>
                <div className={styles.heroCard}>
                  <h2 className={styles.architectureTitle}>
                    Monitoreo de Cadena de Frío
                  </h2>
                  <p className={styles.featureDescription}>
                    Sistema de monitoreo en tiempo real con alertas automáticas
                    y registro blockchain.
                  </p>
                </div>

                {/* Temperature Ranges */}
                <div className={styles.heroCard}>
                  <h3 className={styles.verificationTitle}>
                    Rangos de Temperatura Estándar
                  </h3>
                  <div className={styles.tempRangesGrid}>
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
                      <div key={index} className={styles.tempRangeCard}>
                        <div
                          className={`${styles.tempRangeDot} ${temp.color}`}
                        />
                        <span className={styles.tempRangeValue}>
                          {temp.range}
                        </span>
                        <p className={styles.tempRangeLabel}>
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
                <div className={styles.sensorGrid}>
                  <div className={`${styles.sensorCard} group`}>
                    <div className={styles.sensorIconContainer}>
                      <Thermometer className={styles.sensorIcon} />
                    </div>
                    <h4 className={styles.sensorTitle}>
                      Sensores IoT
                    </h4>
                    <p className={styles.sensorDescription}>
                      Precisión ±0.1°C certificada
                    </p>
                  </div>
                  <div className={`${styles.sensorCardGlacier} group`}>
                    <div className={styles.sensorIconContainerGlacier}>
                      <MapPin className={styles.sensorIconGlacier} />
                    </div>
                    <h4 className={styles.sensorTitle}>
                      GPS Integrado
                    </h4>
                    <p className={styles.sensorDescription}>
                      Ubicación en tiempo real
                    </p>
                  </div>
                  <div className={`${styles.sensorCardAccent} group`}>
                    <div className={styles.sensorIconContainerAccent}>
                      <Zap className={styles.sensorIconAccent} />
                    </div>
                    <h4 className={styles.sensorTitle}>
                      Batería 5 años
                    </h4>
                    <p className={styles.sensorDescription}>
                      Sin mantenimiento
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* FAQ Section */}
            {activeSection === "faq" && (
              <div className={styles.sectionFadeIn}>
                <div className={styles.heroCard}>
                  <h2 className={styles.architectureTitle}>
                    Preguntas Frecuentes
                  </h2>
                  <p className={styles.featureDescription}>
                    Respuestas a las dudas más comunes sobre el sistema
                    MediWave.
                  </p>
                </div>

                <div className={styles.faqAccordionContainer}>
                  <Accordion type="single" collapsible className="space-y-2">
                    {faqItems.map((item, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                      >
                        <AccordionTrigger className="text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] hover:no-underline py-6 cursor-pointer">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-[hsl(var(--muted-foreground))] pb-6">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* Contact CTA */}
                <div className={`glass-strong rounded-2xl p-8 text-center ${styles.contactCTA}`}>
                  <h3 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                    ¿Tienes más preguntas?
                  </h3>
                  <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    Nuestro equipo está disponible para ayudarte
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button className="bg-linear-to-r from-[hsl(var(--primary))] to-[hsl(var(--glacier))] hover:opacity-90 cursor-pointer">
                      Contactar Soporte
                    </Button>
                    <Button className="border order-border/50 bg-[hsl(var(--background))] text-[hsl(var(--foreground))] cursor-pointer">
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
            <p className="text-[hsl(var(--muted-foreground))] text-sm">
              © 2025 MediWave. Trazabilidad farmacéutica con tecnología
              blockchain.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
              >
                Términos
              </a>
              <a
                href="#"
                className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
              >
                Privacidad
              </a>
              <a
                href="#"
                className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
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
