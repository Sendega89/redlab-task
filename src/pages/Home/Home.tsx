import { motion } from 'framer-motion'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRight01Icon, Target03Icon, Rocket01Icon, Stairs01Icon } from '@hugeicons/core-free-icons'
import CardButton from '@/components/Buttons/CardButton/CardButton'
import { BackgroundOrbs, FloatingParticles, AnimatedLogo } from '@/components/effects'
import { useAnimationVariants } from '@/common/hooks/useAnimationVariants'
import styles from './Home.module.css'
import { useNavigate } from 'react-router'


const Home = () => {
  const navigate = useNavigate()

  const onNavigateToCatalog = () => {
    navigate('/catalog')
  }
  
  // Animation variants
  const { containerVariants, itemVariants } = useAnimationVariants({
    delayChildren: 0.3,
    staggerChildren: 0.2,
    itemY: 50,
    damping: 12
  })

  return (
    <div className={styles.home}>
      {/* Effects */}
      <BackgroundOrbs />
      <FloatingParticles count={20} />

      {/* Main Content */}
      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo Animation */}
        <motion.div variants={itemVariants}>
          <AnimatedLogo />
        </motion.div>

                {/* Welcome Text */}
                <motion.div
                    className={styles.welcomeSection}
                    variants={itemVariants}
                >
                    <motion.div
                        className={styles.sparkle}
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        ✨
                    </motion.div>

                    <h1 className={styles.greeting}>
                        Вітаємо, <span className={styles.userName}> Користувач</span> !
                    </h1>
                    <p className={styles.subtitle}>
                        Відкрийте для себе світ якісних товарів та найкращих пропозицій
                    </p>
                </motion.div>

                {/* Features */}
                <motion.div
                    className={styles.features}
                    variants={itemVariants}
                >
                    {[
                        {icon: Target03Icon, text: 'Ексклюзивні пропозиції'},
                        {icon: Rocket01Icon, text: 'Швидка доставка'},
                        {icon: Stairs01Icon, text: 'Високі оцінки'},
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            className={styles.feature}
                            whileHover={{
                                scale: 1.1,
                                y: -5,
                                transition: {type: "spring", stiffness: 300}
                            }}
                            whileTap={{scale: 0.95}}
                        >
              <span className={styles.featureIcon}>
                <HugeiconsIcon icon={feature.icon}/>
              </span>
                            <span className={styles.featureText}>{feature.text}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    className={styles.ctaSection}
                    variants={itemVariants}
                >
                    <motion.div
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                    >
                        <CardButton
                            text="Перейти до каталогу"
                            variant="warning"
                            size="large"
                            iconRight={<HugeiconsIcon icon={ArrowRight01Icon}/>}
                            onClick={onNavigateToCatalog}
                            className={styles.ctaButton}
                        />
                    </motion.div>

                    <motion.p
                        className={styles.ctaHint}
                        animate={{
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        Почніть свій шопінг прямо зараз
                    </motion.p>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Home

