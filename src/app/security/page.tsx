"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar/Navbar";
import NavLink from "@/components/layout/Navbar/NavLink";
import {
  Home,
  ArrowLeft,
  Shield,
  CheckCircle2,
  Lock,
  Fingerprint,
  Server,
  Eye,
  Globe,
  Key,
  AlertTriangle,
} from "lucide-react";
import styles from "./security.module.css";
import ParticlesBackground from "@/components/ParticlesBackground";
import BlockchainNetwork from "@/components/BlockchainNetwork";
import FloatingHexagons from "@/components/FloatingHexagons";

const SecurityPage = () => {
  return (
    <>
      <Navbar>
        <NavLink href="/" icon={<Home size={18} />}>
          Inicio
        </NavLink>
      </Navbar>

      <ParticlesBackground />
      <BlockchainNetwork />
      <FloatingHexagons />

      <div className={styles.gradientOrbs}>
        <div className={styles.orb1} />
        <div className={styles.orb2} style={{ animationDelay: "2s" }} />
        <div className={styles.orb3} style={{ animationDelay: "4s" }} />
      </div>

      <div className={`container ${styles.mainContainer}`}>
        <Link href="/documentation" className={styles.backButton}>
          <ArrowLeft size={18} />
          Volver a Documentación
        </Link>

        {/* Security Header */}
        <div className={styles.securityCenterCard}>
          <div className={styles.securityHeader}>
            <div className={styles.headerIconContainer}>
              <Shield className={styles.headerIcon} />
            </div>
            <div className={styles.headerContent}>
              <h1 className={styles.headerTitle}>Centro de Seguridad</h1>
              <p className={styles.headerSubtitle}>
                Protegemos sus datos farmacéuticos con los más altos estándares
                de seguridad
              </p>
            </div>
          </div>

          {/* Status Card */}
          <div className={styles.statusCard}>
            <div className={styles.statusIconContainer}>
              <CheckCircle2 className={styles.statusIcon} />
            </div>
            <div className={styles.statusContent}>
              <h2 className={styles.statusTitle}>
                Todos los sistemas operando normalmente
              </h2>
              <p className={styles.statusSubtitle}>
                Última auditoría de seguridad: Diciembre 2024
              </p>
            </div>
          </div>
        </div>

        {/* Security Features Grid */}
        <div className={styles.featuresGrid}>
          {/* Data Encryption Card */}
          <div className={styles.featureCard}>
            <div className={styles.featureIconContainer}>
              <Lock className={styles.featureIcon} />
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Encriptación de Datos</h3>
              <p className={styles.featureDescription}>
                Toda la información se encripta utilizando estándares de nivel
                empresarial.
              </p>
              <ul className={styles.featureList}>
                <li>AES-256 para datos en reposo</li>
                <li>TLS 1.3 para datos en tránsito</li>
                <li>Claves rotadas automáticamente</li>
                <li>HSM para gestión de claves</li>
              </ul>
            </div>
          </div>

          {/* Secure Authentication Card */}
          <div className={styles.featureCard}>
            <div className={styles.featureIconContainer}>
              <Fingerprint className={styles.featureIcon} />
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Autenticación Segura</h3>
              <p className={styles.featureDescription}>
                Múltiples capas de verificación de identidad para proteger el
                acceso.
              </p>
              <ul className={styles.featureList}>
                <li>Autenticación multifactor (MFA)</li>
                <li>Single Sign-On (SSO) empresarial</li>
                <li>Tokens JWT con expiración corta</li>
                <li>Bloqueo automático por intentos fallidos</li>
              </ul>
            </div>
          </div>

          {/* Secure Infrastructure Card */}
          <div className={styles.featureCard}>
            <div className={styles.featureIconContainer}>
              <Server className={styles.featureIcon} />
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Infraestructura Segura</h3>
              <p className={styles.featureDescription}>
                Arquitectura diseñada con seguridad como prioridad desde el
                inicio.
              </p>
              <ul className={styles.featureList}>
                <li>Centros de datos certificados SOC 2</li>
                <li>Redundancia geográfica</li>
                <li>Firewalls de aplicación web (WAF)</li>
                <li>Protección contra DDoS</li>
              </ul>
            </div>
          </div>

          {/* Continuous Monitoring Card */}
          <div className={styles.featureCard}>
            <div className={styles.featureIconContainer}>
              <Eye className={styles.featureIcon} />
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Monitoreo Continuo</h3>
              <p className={styles.featureDescription}>
                Vigilancia 24/7 para detectar y responder a amenazas en tiempo
                real.
              </p>
              <ul className={styles.featureList}>
                <li>SIEM con análisis de comportamiento</li>
                <li>Detección de intrusiones (IDS/IPS)</li>
                <li>Respuesta automatizada a incidentes</li>
                <li>Equipo de seguridad dedicado</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Blockchain Security Section */}
        <div className={styles.blockchainSection}>
          <div className={styles.blockchainHeader}>
            <div className={styles.blockchainIconContainer}>
              <Globe className={styles.blockchainIcon} />
            </div>
            <div className={styles.blockchainHeaderContent}>
              <h2 className={styles.blockchainTitle}>Seguridad Blockchain</h2>
              <p className={styles.blockchainDescription}>
                Nuestra implementación blockchain proporciona una capa adicional
                de seguridad e inmutabilidad para todos los registros de
                trazabilidad farmacéutica.
              </p>
            </div>
          </div>

          <div className={styles.blockchainFeaturesGrid}>
            {/* Immutability Card */}
            <div className={styles.blockchainFeatureCard}>
              <h3 className={styles.blockchainFeatureTitle}>Inmutabilidad</h3>
              <p className={styles.blockchainFeatureText}>
                Una vez registrados, los datos no pueden ser alterados ni
                eliminados, garantizando la integridad histórica completa.
              </p>
            </div>

            {/* Transparency Card */}
            <div className={styles.blockchainFeatureCard}>
              <h3 className={styles.blockchainFeatureTitle}>Transparencia</h3>
              <p className={styles.blockchainFeatureText}>
                Todos los participantes autorizados pueden verificar la
                autenticidad de cualquier registro en la cadena.
              </p>
            </div>

            {/* Decentralization Card */}
            <div className={styles.blockchainFeatureCard}>
              <h3 className={styles.blockchainFeatureTitle}>
                Descentralización
              </h3>
              <p className={styles.blockchainFeatureText}>
                Sin punto único de fallo. Los datos se replican en múltiples
                nodos para máxima disponibilidad.
              </p>
            </div>
          </div>
        </div>

        {/* Certifications and Compliance Section */}
        <div className={styles.certificationsSection}>
          <div className={styles.certificationsHeader}>
            <div className={styles.certificationsIconContainer}>
              <Key className={styles.certificationsIcon} />
            </div>
            <div className={styles.certificationsHeaderContent}>
              <h2 className={styles.certificationsTitle}>
                Certificaciones y Cumplimiento
              </h2>
              <p className={styles.certificationsDescription}>
                Mantenemos las certificaciones más rigurosas de la industria
                para garantizar que sus datos estén protegidos según los más
                altos estándares.
              </p>
            </div>
          </div>

          <div className={styles.certificationsGrid}>
            {/* SOC 2 Type II */}
            <div className={styles.certificationBadge}>
              <span className={styles.certificationName}>SOC 2 Type II</span>
              <span
                className={`${styles.certificationStatus} ${styles.certified}`}
              >
                Certificado
              </span>
            </div>

            {/* ISO 27001 */}
            <div className={styles.certificationBadge}>
              <span className={styles.certificationName}>ISO 27001</span>
              <span
                className={`${styles.certificationStatus} ${styles.certified}`}
              >
                Certificado
              </span>
            </div>

            {/* GDPR */}
            <div className={styles.certificationBadge}>
              <span className={styles.certificationName}>GDPR</span>
              <span
                className={`${styles.certificationStatus} ${styles.compliant}`}
              >
                Cumplimiento
              </span>
            </div>

            {/* HIPAA */}
            <div className={styles.certificationBadge}>
              <span className={styles.certificationName}>HIPAA</span>
              <span
                className={`${styles.certificationStatus} ${styles.compliant}`}
              >
                Cumplimiento
              </span>
            </div>

            {/* FDA 21 CFR Part 11 */}
            <div className={styles.certificationBadge}>
              <span className={styles.certificationName}>
                FDA 21 CFR Part 11
              </span>
              <span
                className={`${styles.certificationStatus} ${styles.compliant}`}
              >
                Cumplimiento
              </span>
            </div>

            {/* GxP */}
            <div className={styles.certificationBadge}>
              <span className={styles.certificationName}>GxP</span>
              <span
                className={`${styles.certificationStatus} ${styles.compliant}`}
              >
                Cumplimiento
              </span>
            </div>
          </div>
        </div>

        {/* Incident Response Section */}
        <div className={styles.incidentSection}>
          <div className={styles.incidentHeader}>
            <div className={styles.incidentIconContainer}>
              <AlertTriangle className={styles.incidentIcon} />
            </div>
            <div className={styles.incidentHeaderContent}>
              <h2 className={styles.incidentTitle}>Respuesta a Incidentes</h2>
              <p className={styles.incidentDescription}>
                Nuestro equipo de seguridad está preparado para responder a
                cualquier incidente de seguridad de manera rápida y efectiva.
              </p>
            </div>
          </div>

          <div className={styles.incidentSteps}>
            {/* Step 1: Detection */}
            <div className={styles.incidentStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Detección</h3>
                <p className={styles.stepDescription}>
                  Monitoreo 24/7 con detección automatizada de anomalías
                </p>
              </div>
            </div>

            {/* Step 2: Containment */}
            <div className={styles.incidentStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Contención</h3>
                <p className={styles.stepDescription}>
                  Aislamiento inmediato para limitar el impacto del incidente
                </p>
              </div>
            </div>

            {/* Step 3: Recovery */}
            <div className={styles.incidentStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Recuperación</h3>
                <p className={styles.stepDescription}>
                  Restauración de servicios y comunicación transparente con
                  clientes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vulnerability Reporting CTA */}
        <div className={styles.vulnerabilityCTA}>
          <h2 className={styles.ctaTitle}>¿Encontraste una vulnerabilidad?</h2>
          <p className={styles.ctaDescription}>
            Valoramos la colaboración con la comunidad de seguridad. Si has
            identificado una vulnerabilidad, por favor repórtala de manera
            responsable.
          </p>
          <button className={styles.ctaButton}>
            <Shield size={20} />
            Reportar Vulnerabilidad
          </button>
          <p className={styles.ctaContact}>
            security@coldchain.io | Programa de Bug Bounty disponible
          </p>
        </div>

        {/* Footer Links */}
        <div className={styles.securityFooter}>
          <Link href="/terms" className={styles.footerLink}>
            Términos y Condiciones
          </Link>
          <Link href="/privacy" className={styles.footerLink}>
            Política de Privacidad
          </Link>
        </div>
      </div>
    </>
  );
};

export default SecurityPage;
