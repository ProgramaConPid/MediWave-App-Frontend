import styles from "./CardBlockchain.module.css";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { FaHashtag } from "react-icons/fa";
import { CardBlockchainProps } from "@/src/interfaces/main";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ShimmerButton } from "../shimmer-button";

const CardBlockchain = ({transactionId, blockId}:CardBlockchainProps) => {
  return (
    <div className={styles.card__blockchain}>
      <div className={styles.card__blockchainHeader}>
        <div className={styles.card__blockchainIconContainer}>
          <FaRegCircleCheck className={styles.card__blockchainIcon} />
        </div>
        <div className={styles.card__blockchainHeaderTexts}>
          <h3 className={styles.card__blockchainTextsTitle}>Verificación Blockchain</h3>
          <span className={styles.card__blockchainTextsInfo}>
            <FaCheck />
            Verificado en la cadena
          </span>
        </div>
      </div>

      <div className={styles.card__blockchainHash}>
        <FaHashtag className={styles.card__blockchainHashIcon} />
        <div className={styles.card__blockchainHashTexts}>
          <h4 className={styles.card__blockchainHashTitle}>Transaction Hash</h4>
          <span className={styles.card__blockchainHashId}>{transactionId}</span>
        </div>
      </div>

      <div className={styles.card__blockchainBlockId}>
        <span className={styles.card__blockchainBlockIdTitle}>Bloque</span>
        <h4 className={styles.card__blockchainBlockIdId}>#{blockId}</h4>
      </div>

      <ShimmerButton className={styles.card__blockchainButton}>
        <span className={styles.card__buttonText}>Ver en el explorador</span>
        <FaExternalLinkAlt className={styles.card__buttonIcon} />
      </ShimmerButton>

    </div>
  )
}

export default CardBlockchain