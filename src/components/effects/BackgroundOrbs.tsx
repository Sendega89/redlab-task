import { motion } from 'framer-motion'
import styles from './BackgroundOrbs.module.css'

const BackgroundOrbs = () => {
  return (
    <div className={styles.backgroundAnimation}>
      <motion.div 
        className={styles.gradientOrb1}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className={styles.gradientOrb2}
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}

export default BackgroundOrbs

