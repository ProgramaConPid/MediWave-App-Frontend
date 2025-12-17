"use client";

// React and Next.js imports
import React from "react";
import Link from "next/link";
// Styles and Icons
import styles from "./login.module.css";
import { FiArrowLeft } from "react-icons/fi";
// Visual components
import ParticlesBackground from "@/components/ParticlesBackground";
import BlockchainNetwork from "@/components/BlockchainNetwork";
import FloatingHexagons from "@/components/FloatingHexagons";
import LoginForm from "@/components/ui/Login/LoginForm/LoginForm";

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      {/* Back Button */}
      <Link href="/" className={styles.backBtn}>
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

      {/* Login Container */}
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
