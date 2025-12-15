"use client";

import Navbar from "../Navbar/Navbar";
import NavLink from "../Navbar/NavLink";
import { SlGraph } from "react-icons/sl";
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdLocalShipping } from "react-icons/md";
import { FiHome } from "react-icons/fi";

const DashboardNav = () => {
  return (
    <Navbar>
      <div
        style={{
          display: "flex",
          gap: "0.6rem",
          alignItems: "center",
          color: "hsl(var(--temp-optimal))",
          fontWeight: 500,
          fontSize: "0.9rem",
          padding: "0.6rem 1.2rem",
          borderRadius: "0.75rem",
          backgroundColor: "hsl(var(--secondary) / 0.3)",
          border: "1px solid hsl(var(--border) / 0.2)",
        }}
      >
        <SlGraph style={{ fontSize: "1.1rem" }} />
        <span>Sistema Activo</span>
      </div>

      <NavLink href="/history" icon={<FaClockRotateLeft />}>
        Historial
      </NavLink>

      <NavLink href="/login" icon={<MdLocalShipping />}>
        Gestión
      </NavLink>

      <NavLink href="/" icon={<FiHome />}>
        Inicio
      </NavLink>
    </Navbar>
  );
};

export default DashboardNav;
