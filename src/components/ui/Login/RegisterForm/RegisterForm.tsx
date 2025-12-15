'use client';

import React, { useState } from 'react';
import styles from './RegisterForm.module.css';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiPhone, FiBriefcase } from 'react-icons/fi';
import Link from 'next/link';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    position: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      console.log('Register attempt:', formData);
    }, 1500);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.label}>
              <FiUser className={styles.labelIcon} />
              Nombre
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Juan"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName" className={styles.label}>
              <FiUser className={styles.labelIcon} />
              Apellido
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Pérez"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="company" className={styles.label}>
            <FiBriefcase className={styles.labelIcon} />
            Empresa / Organización
          </label>
          <input
            id="company"
            type="text"
            placeholder="Farmacéutica ABC S.A."
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formRow}>
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
            <label htmlFor="phone" className={styles.label}>
              <FiPhone className={styles.labelIcon} />
              Teléfono
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+52 55 1234 5678"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
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
              type={showPassword ? 'text' : 'password'}
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
              type={showConfirmPassword ? 'text' : 'password'}
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

        <div className={styles.terms}>
          <input
            id="terms"
            type="checkbox"
            className={styles.checkbox}
            required
          />
          <label htmlFor="terms" className={styles.checkboxLabel}>
            Acepto los términos y condiciones
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitBtn}
        >
          {isLoading ? 'Registrando...' : <><FiUser /> Crear Cuenta</>}
        </button>
      </form>

      <div className={styles.hasAccount}>
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className={styles.loginLink}>
          Inicia sesión
        </Link>
      </div>

      <div className={styles.footer}>
        <FiLock className={styles.footerIcon} /> MediWave - Acceso Seguro Blockchain
      </div>
    </>
  );
};

export default RegisterForm;
