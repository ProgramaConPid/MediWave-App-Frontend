"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Thermometer,
  Package,
  Lock,
  Activity,
  ChevronRight,
  Eye,
  TrendingUp,
  BarChart3,
  LayoutDashboard,
  BookOpen,
  Truck,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar/Navbar";
import NavLink from "@/components/layout/Navbar/NavLink";
import BlockchainNetwork from "@/components/BlockchainNetwork";
import FloatingHexagons from "@/components/FloatingHexagons";
import FeatureCard from "@/components/FeatureCard";
import ParticlesBackground from "@/components/ParticlesBackground";
import styles from "./page.module.css";

const Index = () => {
  const features = [
    {
      icon: Thermometer,
      title: "Cadena de Frío",
      description:
        "Monitoreo en tiempo real de temperaturas durante todo el proceso de transporte y almacenamiento.",
      gradient: "gradient-ice",
    },
    {
      icon: Shield,
      title: "Blockchain",
      description:
        "Verificación inmutable de cada etapa del proceso mediante registros en blockchain descentralizado.",
      gradient: "gradient-cold",
    },
    {
      icon: Package,
      title: "Trazabilidad Total",
      description:
        "Seguimiento completo desde el origen hasta el destino final con datos precisos y verificables.",
      gradient: "gradient-ice",
    },
    {
      icon: Lock,
      title: "Seguridad",
      description:
        "Protección de datos mediante encriptación avanzada y autenticación multifactor.",
      gradient: "gradient-cold",
    },
    {
      icon: Activity,
      title: "Alertas Inteligentes",
      description:
        "Notificaciones automáticas ante cualquier desviación de los parámetros establecidos.",
      gradient: "gradient-ice",
    },
    {
      icon: Eye,
      title: "Transparencia",
      description:
        "Acceso completo a la información para todos los actores autorizados de la cadena.",
      gradient: "gradient-cold",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Animated Background Elements */}
      <ParticlesBackground />
      <BlockchainNetwork />
      <FloatingHexagons />

      {/* Gradient Orbs */}
      <div className={styles.gradientOrbs}>
        <div className={styles.orb1} />
        <div className={styles.orb2} style={{ animationDelay: "2s" }} />
        <div className={styles.orb3} style={{ animationDelay: "4s" }} />
      </div>

      <Navbar>
        <NavLink href="/login" icon={<Truck size={18} />}>
          Gestión
        </NavLink>
        <NavLink href="/dashboard" icon={<LayoutDashboard size={18} />}>
          Dashboard
        </NavLink>
        <NavLink href="/documentation" icon={<BookOpen size={18} />}>
          Documentación
        </NavLink>
      </Navbar>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          {/* Badge */}
          <div className={styles.badge}>
            <div className={styles.badgeDot} />
            <span className={styles.badgeText}>
              Sistema Activo • Blockchain Verificado
            </span>
          </div>

          {/* Main Heading */}
          <h1 className={styles.heroHeading}>
            Trazabilidad Farmacéutica del Futuro
          </h1>

          <p className={styles.heroDescription}>
            Garantizamos la integridad de medicamentos mediante tecnología
            blockchain, monitoreo IoT en tiempo real y verificación
            descentralizada de la cadena de frío.
          </p>

          {/* CTA Buttons */}
          <div className={styles.ctaContainer}>
            <Link href="/dashboard">
              <Button size="lg" className={`${styles.ctaDashboard} group`}>
                Ver Dashboard
                <ChevronRight className={styles.ctaDashboardIcon} />
              </Button>
            </Link>
            <Link href="/documentation">
              <Button
                size="lg"
                variant="outline"
                className={`${styles.ctaDocs} group`}
              >
                Documentación
                <TrendingUp className={styles.ctaDocsIcon} />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <p className={styles.statValuePrimary}>99.9%</p>
              <p className={styles.statLabel}>Precisión</p>
            </div>
            <div className={styles.statCard} style={{ animationDelay: "0.1s" }}>
              <p className={styles.statValueGlacier}>24/7</p>
              <p className={styles.statLabel}>Monitoreo</p>
            </div>
            <div className={styles.statCard} style={{ animationDelay: "0.2s" }}>
              <p className={styles.statValueAccent}>100%</p>
              <p className={styles.statLabel}>Trazable</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresHeader}>
          <h2 className={styles.featuresTitle}>Tecnología de Vanguardia</h2>
          <p className={styles.featuresDescription}>
            Combinamos blockchain, IoT y IA para crear el sistema más avanzado
            de trazabilidad farmacéutica del mercado.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={styles.featureCardWrapper}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorksSection}>
        <div className={styles.howItWorksContainer}>
          <h2 className={styles.howItWorksTitle}>Cómo Funciona</h2>

          <div className={styles.howItWorksSteps}>
            {[
              {
                step: "01",
                title: "Registro Inicial",
                description:
                  "El medicamento se registra en blockchain al momento de manufacturación con todos sus datos críticos.",
              },
              {
                step: "02",
                title: "Monitoreo IoT",
                description:
                  "Sensores inteligentes registran temperatura, ubicación y condiciones ambientales en tiempo real.",
              },
              {
                step: "03",
                title: "Verificación Blockchain",
                description:
                  "Cada evento se registra de forma inmutable en la blockchain para garantizar transparencia total.",
              },
              {
                step: "04",
                title: "Alertas Automáticas",
                description:
                  "El sistema notifica instantáneamente cualquier desviación de los parámetros establecidos.",
              },
            ].map((item, index) => (
              <div key={index} className={`${styles.stepCard} group`}>
                <div className={styles.stepNumberContainer}>
                  <div className={styles.stepNumber}>{item.step}</div>
                </div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{item.title}</h3>
                  <p className={styles.stepDescription}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <div className={styles.ctaGradient} />

          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Comienza a Monitorear Ahora</h2>
            <p className={styles.ctaText}>
              Únete a las empresas farmacéuticas que ya confían en MedChain para
              garantizar la integridad de sus productos.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className={styles.ctaButton}>
                Acceder al Dashboard
                <ChevronRight className={styles.ctaButtonIcon} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div className={styles.footerCopyright}>
              <Image
                src="/icon.png"
                alt="MediWave Logo"
                width={20}
                height={20}
                className={styles.footerIcon}
              />
              <span className={styles.footerText}>
                © 2025 MedChain. Blockchain Pharmaceutical Traceability.
              </span>
            </div>
            <div className={styles.footerStatus}>
              <Activity className={styles.footerStatusIcon} />
              <span>Sistema Operativo</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
