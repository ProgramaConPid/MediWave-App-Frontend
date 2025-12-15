'use client';

import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { MdFingerprint } from 'react-icons/md';
import { BiLockOpen } from 'react-icons/bi';
import { BsShieldCheck } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login successful:', { email });
      router.push('/management');
    }, 1500);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <div className={styles.icon}>
            <MdFingerprint className={styles.iconSvg} />
          </div>
        </div>
        <h2 className={styles.title}>Bienvenido de nuevo</h2>
        <p className={styles.subtitle}>Accede a tu panel de control MediWave</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            <FiMail className={styles.labelIcon} />
            Correo Electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="tu@empresa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <div className={styles.labelRow}>
            <label htmlFor="password" className={styles.label}>
              <FiLock className={styles.labelIcon} />
              Contraseña
            </label>
            <Link href="#" className={styles.forgotLink}>
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className={styles.inputWrapper}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <div className={styles.rememberMe}>
          <input
            id="remember"
            type="checkbox"
            className={styles.checkbox}
          />
          <label htmlFor="remember" className={styles.checkboxLabel}>
            Mantener sesión iniciada
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitBtn}
        >
          {isLoading ? 'Iniciando sesión...' : '→ Iniciar Sesión'}
        </button>
      </form>

      <div className={styles.noAccount}>
        ¿No tienes cuenta?{' '}
        <Link href="/register" className={styles.registerLink}>
          Regístrate aquí
        </Link>
      </div>

      <div className={styles.features}>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <BiLockOpen />
          </div>
          <div className={styles.featureText}>
            <div className={styles.featureTitle}>Encriptación</div>
            <div className={styles.featureDesc}>256-bit</div>
          </div>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <BsShieldCheck />
          </div>
          <div className={styles.featureText}>
            <div className={styles.featureTitle}>Verificación</div>
            <div className={styles.featureDesc}>Blockchain</div>
          </div>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <MdFingerprint />
          </div>
          <div className={styles.featureText}>
            <div className={styles.featureTitle}>Autenticación</div>
            <div className={styles.featureDesc}>Segura</div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <FiLock className={styles.footerIcon} /> MediWave - Acceso Seguro Blockchain
      </div>
    </>
  );
};

export default LoginForm;
