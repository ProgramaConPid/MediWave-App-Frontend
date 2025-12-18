"use client";

import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import {
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiBriefcase,
} from "react-icons/fi";
import { registerUser } from "@/services/managementService";

interface RegisterFormProps {
  onCancel?: () => void;
}

const RegisterForm = ({ onCancel }: RegisterFormProps) => {
  // State for registration form data
  const [formData, setFormData] = useState({
    fullName: "",
    position: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);

    try {
      await registerUser(formData);
      alert("Usuario registrado correctamente");
      // Optional: Redirect or clear form
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error al registrar usuario");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="fullName" className={styles.label}>
            <FiUser className={styles.labelIcon} />
            Nombre Completo
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Juan Pérez"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="position" className={styles.label}>
            <FiBriefcase className={styles.labelIcon} />
            Cargo
          </label>
          <input
            id="position"
            type="text"
            placeholder="Gerente de Logística"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            <FiMail className={styles.labelIcon} />
            Correo Electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="tu@empresa.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            <FiLock className={styles.labelIcon} />
            Contraseña
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.eyeBtn}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            <FiLock className={styles.labelIcon} />
            Confirmar Contraseña
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={styles.eyeBtn}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => {
              if (onCancel) {
                onCancel();
              } else {
                setFormData({
                  fullName: "",
                  position: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                });
              }
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitBtn}
          >
            {isLoading ? (
              "Registrando..."
            ) : (
              <>
                <FiUser /> Crear Usuario
              </>
            )}
          </button>
        </div>
      </form>

      <div className={styles.footer}>
        <FiLock className={styles.footerIcon} /> MediWave - Acceso Seguro
        Blockchain
      </div>
    </>
  );
};

export default RegisterForm;
