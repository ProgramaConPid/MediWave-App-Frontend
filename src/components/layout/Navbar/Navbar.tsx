"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import styles from "./navbar.module.css";

interface NavbarProps {
  children?: ReactNode;
  logoText?: string;
  logoSubtitle?: string;
}

const Navbar = ({
  children,
  logoText = "MediWave",
  logoSubtitle = "Trazabilidad Farmacéutica",
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`${styles.navbar} ${styles.fadeInScale}`}>
      <div className={`container ${styles.navbarContainer}`}>
        {/* Logo Section */}
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <div className={styles.logoContainer}>
            <Image
              src="/icon.png"
              alt={`${logoText} Logo`}
              width={40}
              height={40}
              className={styles.logoIcon}
            />
          </div>
          <div className={styles.logoTexts}>
            <h1 className={styles.logoTitle}>{logoText}</h1>
            {logoSubtitle && (
              <span className={styles.logoSubtitle}>{logoSubtitle}</span>
            )}
          </div>
        </Link>

        {/* Mobile Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Overlay */}
        {isMenuOpen && <div className={styles.overlay} onClick={closeMenu} />}

        {/* Navigation Links */}
        <div
          className={`${styles.navLinks} ${
            isMenuOpen ? styles.navLinksOpen : ""
          }`}
          onClick={(e) => {
            // Close menu if a link inside is clicked
            if (
              (e.target as HTMLElement).tagName === "A" ||
              (e.target as HTMLElement).closest("a") ||
              (e.target as HTMLElement).closest("button")
            ) {
              closeMenu();
            }
          }}
        >
          {children}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
