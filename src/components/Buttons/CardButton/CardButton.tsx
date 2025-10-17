import React from 'react'
import styles from './CardButton.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'success' | 'danger' | 'warning'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface CardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Текст кнопки
   */
  text?: string
  
  /**
   * Дочерний контент (альтернатива text)
   */
  children?: React.ReactNode
  
  /**
   * Варіант оформлення кнопки
   * @default 'primary'
   */
  variant?: ButtonVariant
  
  /**
   * Розмір кнопки
   * @default 'medium'
   */
  size?: ButtonSize
  
  /**
   * Іконка зліва від тексту
   */
  iconLeft?: React.ReactNode
  
  /**
   * Іконка справа від тексту
   */
  iconRight?: React.ReactNode
  
  /**
   * Розтягнути кнопку на всю ширину
   * @default false
   */
  fullWidth?: boolean
  
  /**
   * Додаткові CSS класи
   */
  className?: string
  
  /**
   * Тип кнопки
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset'
}

const CardButton: React.FC<CardButtonProps> = ({
  text,
  children,
  variant = 'primary',
  size = 'medium',
  iconLeft,
  iconRight,
  fullWidth = false,
  className = '',
  type = 'button',
  disabled = false,
  ...rest
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = children || text

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      {...rest}
    >
      {iconLeft && (
        <span className={`${styles.iconLeft} ${styles.icon}`}>
          {iconLeft}
        </span>
      )}
      {content && <span>{content}</span>}
      {iconRight && (
        <span className={`${styles.iconRight} ${styles.icon}`}>
          {iconRight}
        </span>
      )}
    </button>
  )
}

export default CardButton

