import React from 'react'
import styles from './Spinner.module.css'

export interface SpinnerProps {
  /**
   * Розмір спінера
   */
  size?: 'small' | 'medium' | 'large'
  
  /**
   * Колір спінера
   */
  color?: 'primary' | 'white' | 'warning'
  
  /**
   * Додаткові CSS класи
   */
  className?: string
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  color = 'primary',
  className = ''
}) => {
  return (
    <div 
      className={`${styles.spinner} ${styles[size]} ${styles[color]} ${className}`}
      role="status"
      aria-label="Завантаження..."
    >
      <span className={styles.visuallyHidden}>Завантаження...</span>
    </div>
  )
}

export default Spinner

