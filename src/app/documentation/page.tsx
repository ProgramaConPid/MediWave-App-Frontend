"use client";

// Next.js and React imports
import { useState } from "react";
import Link from "next/link";
// Icon imports from Lucide
import {
  Home,
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
  LayoutDashboard
} from "lucide-react";
import { FaClockRotateLeft } from "react-icons/fa6";
// UI Components
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar/Navbar";
import NavLink from "@/components/layout/Navbar/NavLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Visual Effects
import FloatingHexagons from "@/components/FloatingHexagons";
import BlockchainNetwork from "@/components/BlockchainNetwork";
import ParticlesBackground from "@/components/ParticlesBackground";
import styles from "./documentation.module.css";

// Helper component to display code snippets with copy functionality
const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`${styles.codeBlockContainer} group`}>
      <div className={styles.languageLabel}>{language}</div>
      <button onClick={handleCopy} className={styles.copyButton}>
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

// Helper component for documentation sections
export const FeatureSection = ({
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

// Sidebar navigation item component
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
      active ? styles.navItemActive : styles.navItemInactive
    }`}
  >
    <Icon className={styles.navIcon} />
    <span className={styles.navLabel}>{label}</span>
    {active && <ChevronRight className={styles.navChevron} />}
  </button>
);

// Main Documentation Page Component
const Documentation = () => {
  // State to track currently active documentation section
  const [activeSection, setActiveSection] = useState("overview");

  // Navigation items config
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
      endpoint: "/shipments",
      description: "Obtener todos los envíos",
    },
    {
      method: "GET",
      endpoint: "/shipments/{id}",
      description: "Obtener un envío por ID",
    },
    {
      method: "POST",
      endpoint: "/shipments",
      description: "Crear un nuevo envío",
    },
    {
      method: "PATCH",
      endpoint: "/shipments/{id}",
      description: "Actualizar un envío",
    },
    {
      method: "DELETE",
      endpoint: "/shipments/{id}",
      description: "Eliminar un envío",
    },
    {
      method: "GET",
      endpoint: "/batchs",
      description: "Obtener todos los lotes",
    },
    {
      method: "GET",
      endpoint: "/batchs/{id}",
      description: "Obtener un lote por ID",
    },
    {
      method: "POST",
      endpoint: "/batchs",
      description: "Crear un nuevo lote",
    },
    {
      method: "PATCH",
      endpoint: "/batchs/{id}",
      description: "Actualizar un lote",
    },
    {
      method: "DELETE",
      endpoint: "/batchs/{id}",
      description: "Eliminar un lote",
    },
    {
      method: "GET",
      endpoint: "/state-history",
      description: "Obtener todos los registros de historial de estado",
    },
    {
      method: "GET",
      endpoint: "/state-history/{id}",
      description: "Obtener un registro de historial de estado por ID",
    },
    {
      method: "POST",
      endpoint: "/state-history",
      description: "Crear un nuevo registro de historial de estado",
    },
    {
      method: "PATCH",
      endpoint: "/state-history/{id}",
      description: "Actualizar un registro de historial de estado",
    },
    {
      method: "DELETE",
      endpoint: "/state-history/{id}",
      description: "Eliminar un registro de historial de estado",
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
        "Utilizamos Ethereum para registros públicos verificables y una red publica, garantizando transparencia.",
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
      <Navbar logoText="MediWave" logoSubtitle="Docs">
        <NavLink href="/" icon={<Home size={18} />}>
          Inicio
        </NavLink>
        <NavLink href="/dashboard" icon={<LayoutDashboard size={18} />}>
          Dashboard
        </NavLink>
        <NavLink href="/history" icon={<FaClockRotateLeft size={18} />}>
          Historial
        </NavLink>
      </Navbar>

      <div className={styles.mainContainer}>
        <div className={styles.contentGrid}>
          {/* Sidebar Navigation */}
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Documentación</h2>
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
              <h3 className={styles.sidebarTitle}>Enlaces Rápidos</h3>
              <div className={styles.sidebarNav}>
                <a
                  href="https://github.com/ProgramaConPid/MediWave-App-Frontend"
                  className={styles.quickLink}
                >
                  <ExternalLink className={styles.navLinkIcon} />
                  GitHub Repository
                </a>
                <a
                  href="https://mediwave-backend-production.up.railway.app/api-doc"
                  className={styles.quickLink}
                >
                  <ExternalLink className={styles.navLinkIcon} />
                  API Playground
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
                    <span className={styles.versionText}>v2.0.0</span>
                  </div>
                  <h1 className={styles.heroTitle}>Documentación MediWave</h1>
                  <p className={styles.heroDescription}>
                    Sistema de trazabilidad farmacéutica con verificación
                    blockchain y monitoreo de cadena de frío en tiempo real.
                  </p>
                </div>

                {/* Quick Start Cards */}
                <div className={styles.quickStartGrid}>
                  <div className={`${styles.quickStartCard} group`}>
                    <Cpu className={styles.quickStartIcon} />
                    <h3 className={styles.quickStartTitle}>Inicio Rápido</h3>
                    <p className={styles.quickStartText}>
                      Configura tu primer envío en menos de 5 minutos
                    </p>
                  </div>
                  <div className={styles.quickStartCard}>
                    <Lock className={styles.quickStartIconGlacier} />
                    <h3 className={styles.quickStartTitle}>Seguridad</h3>
                    <p className={styles.quickStartText}>
                      Encriptación end-to-end y registros inmutables
                    </p>
                  </div>
                  <div className={styles.quickStartCard}>
                    <Globe className={styles.quickStartIconAccent} />
                    <h3 className={styles.quickStartTitle}>Integraciones</h3>
                    <p className={styles.quickStartText}>
                      APIs RESTful y webhooks para cualquier sistema
                    </p>
                  </div>
                </div>
                <FeatureSection
                  icon={Code}
                  title="Acerca de ColdChain"
                  description="Plataforma integral de trazabilidad farmacéutica"
                >
                  <div className={styles.aboutContentContainer}>
                    <p className={styles.aboutDescription}>
                      MediWave es una solución empresarial de vanguardia
                      diseñada para garantizar la integridad y trazabilidad
                      completa de productos farmacéuticos sensibles a la
                      temperatura durante toda la cadena de suministro. Nuestra
                      plataforma combina tecnología blockchain para registro
                      inmutable de eventos, sensores IoT de alta precisión para
                      monitoreo continuo de temperatura, y análisis predictivo
                      basado en inteligencia artificial para prevención de
                      incidentes.
                    </p>
                    <div className={styles.infoCardsContainer}>
                      <div className={styles.infoCard}>
                        <h4 className={styles.infoCardTitle}>Industrias</h4>
                        <ul className={styles.infoCardList}>
                          <li>Farmacéutica</li>
                          <li>Biotecnología</li>
                          <li>Distribución médica</li>
                          <li>Hospitales y clínicas</li>
                        </ul>
                      </div>
                      <div className={styles.infoCard}>
                        <h4 className={styles.infoCardTitle}>Cumplimiento</h4>
                        <ul className={styles.infoCardList}>
                          <li>GDP/GMP</li>
                          <li>FDA 21 CFR Part 11</li>
                          <li>ISO 9001:2015</li>
                          <li>DSCSA Ready</li>
                        </ul>
                      </div>
                    </div>
                  </div>
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
                          <h4 className={styles.diagramTitle}>Capa IoT</h4>
                          <p className={styles.diagramSubtitle}>
                            Sensores y dispositivos
                          </p>
                        </div>
                        <div className={styles.diagramLinePrimary} />
                      </div>

                      {/* Processing Layer */}
                      <div className={styles.diagramNode}>
                        <div className={styles.diagramCardGlacier}>
                          <Bell className={styles.diagramIconGlacier} />
                          <h4 className={styles.diagramTitle}>Alertas</h4>
                          <p className={styles.diagramSubtitle}>
                            Notificaciones Inteligentes
                          </p>
                        </div>
                        <div className={styles.diagramLineGlacier} />
                      </div>

                      {/* Blockchain Layer */}
                      <div className={styles.diagramNode}>
                        <div className={styles.diagramCardAccent}>
                          <Shield className={styles.diagramIconAccent} />
                          <h4 className={styles.diagramTitle}>Blockchain</h4>
                          <p className={styles.diagramSubtitle}>
                            Registro inmutable
                          </p>
                        </div>
                        <div className={styles.diagramLineAccent} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FeatureSection
                    icon={Bell}
                    title="Sistema de Alertas"
                    description="Notificaciones inteligentes y respuesta automática ante incidentes."
                  >
                    <ul className={styles.featureList}>
                      <li className={styles.featureListItem}>
                        <div className={styles.featureDotPrimary} />
                        Alertas multicanal (SMS, Email, Push) {"<"}100ms
                      </li>
                      <li className={styles.featureListItem}>
                        <div className={styles.featureDotPrimary} />
                        Escalamiento automático configurable
                      </li>
                      <li className={styles.featureListItem}>
                        <div className={styles.featureDotPrimary} />
                        Protocolos de contingencia predefinidos
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
                  <h2 className={styles.architectureTitle}>API Reference</h2>
                  <p className={styles.featureDescription}>
                    Documentación completa de endpoints RESTful para integrar
                    MediWave en tu aplicación.
                  </p>
                </div>

                {/* Base URL */}
                <div className={styles.baseUrlCard}>
                  <h3 className={styles.baseUrlTitle}>Base URL</h3>
                  <CodeBlock
                    language="text"
                    code="https://mediwave-backend-production.up.railway.app/api-doc"
                  />
                </div>

                {/* Endpoints Table */}
                <div className={styles.endpointsContainer}>
                  <div className={styles.endpointsHeader}>
                    <h3 className={styles.endpointsTitle}>Endpoints</h3>
                  </div>
                  <div className={styles.endpointsList}>
                    {apiEndpoints.map((endpoint, index) => (
                      <div key={index} className={styles.endpointItem}>
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
                            Celo Sepolia Testnet
                          </span>
                        </div>
                        <p className={styles.hybridArchText}>
                          Registros públicos verificables por cualquier parte
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
                        <div className="text-center flex flex-col items-center">
                          <div
                            className={`${styles.verificationIconContainer} group`}
                          >
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
                        <p className={styles.tempRangeLabel}>{temp.label}</p>
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
                    <h4 className={styles.sensorTitle}>Sensores IoT</h4>
                    <p className={styles.sensorDescription}>
                      Precisión ±0.1°C certificada
                    </p>
                  </div>
                  <div className={`${styles.sensorCardGlacier} group`}>
                    <div className={styles.sensorIconContainerGlacier}>
                      <MapPin className={styles.sensorIconGlacier} />
                    </div>
                    <h4 className={styles.sensorTitle}>Rutas Dinamicas</h4>
                    <p className={styles.sensorDescription}>
                      Ubicación en tiempo real
                    </p>
                  </div>
                  <div className={`${styles.sensorCardAccent} group`}>
                    <div className={styles.sensorIconContainerAccent}>
                      <Zap className={styles.sensorIconAccent} />
                    </div>
                    <h4 className={styles.sensorTitle}>
                      Monitoreo en Tiempo Real
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
                      <AccordionItem key={index} value={`item-${index}`}>
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
                <div
                  className={`glass-strong rounded-2xl p-8 text-center ${styles.contactCTA}`}
                >
                  <h3 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                    ¿Tienes más preguntas?
                  </h3>
                  <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    Nuestro equipo está disponible para ayudarte
                  </p>
                  <div className="flex justify-center flex-wrap gap-4">
                    <Button asChild className="bg-linear-to-r from-[hsl(var(--primary))] to-[hsl(var(--glacier))] hover:opacity-90 cursor-pointer">
                      <Link href={"https://wa.me/3174859328"} target="_blank">
                        Contactar Soporte
                      </Link>
                    </Button>
                    <Button asChild className="border order-border/50 bg-[hsl(var(--background))] text-[hsl(var(--foreground))] cursor-pointer">
                      <Link href={"https://discord.gg/rNsrgSq"} target="_blank">
                        Unete a Discord
                      </Link>
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
                href="/security"
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
