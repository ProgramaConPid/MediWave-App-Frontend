"use client";

import React from "react";
import styles from "./register.module.css";
import ParticlesBackground from "@/components/ParticlesBackground";
import BlockchainNetwork from "@/components/BlockchainNetwork";
import FloatingHexagons from "@/components/FloatingHexagons";
import RegisterForm from "@/components/ui/Login/RegisterForm/RegisterForm";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";

export default function RegisterPage() {
  return (
    <div className={styles.registerPage}>
      {/* Back Button */}
      <Link href="/login" className={styles.backBtn}>
        <FiArrowLeft /> Volver al inicio
      </Link>

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

      {/* Register Container */}
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <div className={styles.iconContainer}>
              <div className={styles.icon}>
                <FaShieldAlt className={styles.iconSvg} />
              </div>
            </div>
            <h1 className={styles.title}>Crear Cuenta</h1>
            <p className={styles.subtitle}>
              Completa el formulario para registrarte
            </p>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
