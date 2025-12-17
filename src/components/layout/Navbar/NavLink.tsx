"use client";

// React and Next.js imports
import Link from "next/link";
import styles from "./NavLink.module.css";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  icon?: ReactNode;
  children: ReactNode;
  isActive?: boolean;
  className?: string; // Allow custom styles overrides
}

// Reusable navigation link component with active state support
const NavLink = ({
  href,
  icon,
  children,
  isActive,
  className = "",
}: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={`${styles.navLink} ${
        isActive ? styles.navLinkActive : ""
      } ${className}`}
    >
      {icon && <span className={styles.navLinkIcon}>{icon}</span>}
      <span>{children}</span>
    </Link>
  );
};

export default NavLink;
