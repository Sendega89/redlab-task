import { motion } from 'framer-motion'
import styles from './FloatingParticles.module.css'

interface FloatingParticlesProps {
  count?: number
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({ count = 20 }) => {
  return (
    <div className={styles.particles}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className={styles.particle}
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            opacity: 0
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}

export default FloatingParticles

