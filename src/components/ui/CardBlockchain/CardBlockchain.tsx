"use client";

import { motion } from "framer-motion";
import styles from "./CardBlockchain.module.css";
import { FaRegCheckCircle, FaCheck, FaHashtag, FaExternalLinkAlt, FaSearch } from "react-icons/fa";
import { ShimmerButton } from "../shimmer-button";
import { useState } from "react";
import { CardBlockchainProps } from "@/interfaces/main";

const CardBlockchain = ({ onVerify, loading }: CardBlockchainProps) => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    if (!value.trim() || loading) return;
    onVerify(value.trim());
  };

  return (
    <motion.div
      className={styles.card__blockchain}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className={styles.card__blockchainHeader}>
        <div className={styles.card__blockchainIconContainer}>
          <FaRegCheckCircle className={styles.card__blockchainIcon} />
        </div>
        <div className={styles.card__blockchainHeaderTexts}>
          <h3 className={styles.card__blockchainTextsTitle}>
            Verificación Blockchain
          </h3>
          <span className={styles.card__blockchainTextsInfo}>
            <FaCheck />
            Verificado en la cadena
          </span>
        </div>
      </div>

      {/* Input */}
      <div className={styles.card__blockchainHash}>
        <FaHashtag className={styles.card__blockchainHashIcon} />
        <div className={styles.card__blockchainHashTexts}>
          <h4 className={styles.card__blockchainHashTitle}>
            Batch / Blockchain Transaction ID
          </h4>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            className={styles.card__blockchainHashId}
            placeholder="Ej: LTX-001 o 0xBATCH001"
          />
        </div>
      </div>

      {/* Block */}
      <div className={styles.card__blockchainBlockId}>
        <span className={styles.card__blockchainBlockIdTitle}>Bloque</span>
        <h4 className={styles.card__blockchainBlockIdId}>#0000000</h4>
      </div>

      {/* Verify button */}
      <ShimmerButton
        className={styles.transaction__button}
        onClick={handleClick}
        disabled={loading}
      >
        <span className={styles.transaction__buttonText}>
          {loading ? "Verificando..." : "Verificar Transacción"}
        </span>
        <FaSearch className={styles.transaction__buttonIcon} />
      </ShimmerButton>

      {/* Explorer */}
      <ShimmerButton className={styles.card__blockchainButton}>
        <span className={styles.card__buttonText}>Ver en el explorador</span>
        <FaExternalLinkAlt className={styles.card__buttonIcon} />
      </ShimmerButton>
    </motion.div>
  );
};

export default CardBlockchain;
