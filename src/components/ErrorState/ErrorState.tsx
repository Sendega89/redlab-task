import React from 'react'
import styles from './ErrorState.module.css'

export interface ErrorStateProps {
  /**
   * Заголовок помилки
   */
  title?: string
  
  /**
   * Опис помилки
   */
  message?: string
  
  /**
   * Іконка (emoji або компонент)
   */
  icon?: React.ReactNode
  
  /**
   * Дочірні елементи (наприклад, кнопки)
   */
  children?: React.ReactNode
  
  /**
   * Використовувати повноекранний режим
   */
  fullscreen?: boolean
  
  /**
   * Додаткові CSS класи
   */
  className?: string
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = '❌ Помилка',
  message,
  icon = '❌',
  children,
  fullscreen = false,
  className = ''
}) => {
  return (
    <div className={`${styles.errorContainer} ${fullscreen ? styles.fullscreen : ''} ${className}`}>
      <div className={styles.errorContent}>
        {icon && (
          <div className={styles.errorIcon}>
            {icon}
          </div>
        )}
        <h2 className={styles.errorTitle}>{title}</h2>
        {message && (
          <p className={styles.errorMessage}>{message}</p>
        )}
        {children && (
          <div className={styles.errorActions}>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export default ErrorState

