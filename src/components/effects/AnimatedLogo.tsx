import { motion } from 'framer-motion'
import { HugeiconsIcon } from '@hugeicons/react'
import { ShoppingBasket01Icon } from '@hugeicons/core-free-icons'
import styles from './AnimatedLogo.module.css'

const AnimatedLogo = () => {
  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }

  const shimmerAnimation = {
    backgroundPosition: ['200% 0'],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear" as const,
      repeatType: "loop" as const
    }
  }

  return (
    <div className={styles.logoSection}>
      <motion.div 
        className={styles.logoWrapper}
        animate={floatingAnimation}
      >
        <div className={styles.logoIcon}>
          <HugeiconsIcon icon={ShoppingBasket01Icon} />
        </div>
        <motion.div 
          className={styles.logoGlow}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      <motion.div 
        className={styles.logoText}
        style={{ backgroundPosition: '-200% 0' }}
        animate={shimmerAnimation}
      >
        <span className={styles.logoMain}>Shop</span>
        <span className={styles.logoAccent}>Lab</span>
      </motion.div>
    </div>
  )
}

export default AnimatedLogo

