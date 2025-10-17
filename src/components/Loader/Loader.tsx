import React from 'react'
import styles from './Loader.module.css'

export interface LoaderProps {
  /**
   * Размер лоадера
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
  
  /**
   * Текст под лоадером
   */
  text?: string
  
  /**
   * Полноэкранный режим
   * @default false
   */
  fullscreen?: boolean
  
  /**
   * Дополнительные CSS классы
   */
  className?: string
}

const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  text,
  fullscreen = false,
  className = ''
}) => {
  const containerClasses = [
    styles.container,
    fullscreen && styles.fullscreen,
    className
  ]
    .filter(Boolean)
    .join(' ')

  const spinnerClasses = [
    styles.spinner,
    styles[size]
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClasses}>
      <div className={styles.loaderWrapper}>
        <div className={spinnerClasses}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </div>
        {text && <p className={styles.text}>{text}</p>}
      </div>
    </div>
  )
}

export default Loader

