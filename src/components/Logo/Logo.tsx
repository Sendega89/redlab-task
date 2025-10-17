import React from 'react'
import { useNavigate } from 'react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import { ShoppingBasket01Icon } from '@hugeicons/core-free-icons'
import styles from './Logo.module.css'

export interface LogoProps {
  /**
   * Варіант відображення (для Header або Footer)
   */
  variant?: 'header' | 'footer'
  
  /**
   * Додаткові CSS класи
   */
  className?: string
  
  /**
   * Власний обробник кліку (якщо не потрібна навігація)
   */
  onClick?: () => void
}

const Logo: React.FC<LogoProps> = ({
  variant = 'header',
  className = '',
  onClick
}) => {
  const navigate = useNavigate()
  
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate('/')
    }
  }

  return (
    <button
      className={`${styles.logo} ${styles[variant]} ${className}`}
      onClick={handleClick}
      aria-label="На головну"
    >
      <div className={styles.logoIcon}>
        <HugeiconsIcon icon={ShoppingBasket01Icon} />
      </div>
      <span className={styles.logoText}>
        <span className={styles.logoMain}>Shop</span>
        <span className={styles.logoAccent}>Lab</span>
      </span>
    </button>
  )
}

export default Logo

