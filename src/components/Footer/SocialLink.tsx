import React from 'react'
import styles from './SocialLink.module.css'

export interface SocialLinkProps {
  /**
   * URL ссылки
   */
  href: string
  
  /**
   * Иконка компонента
   */
  icon: React.ReactNode
  
  /**
   * Текст label
   */
  label: string
  
  /**
   * ARIA label для доступности
   */
  ariaLabel: string
  
  /**
   * Открывать в новой вкладке
   */
  external?: boolean
  
  /**
   * Дополнительный CSS класс
   */
  className?: string
}

const SocialLink: React.FC<SocialLinkProps> = ({
  href,
  icon,
  label,
  ariaLabel,
  external = false,
  className = ''
}) => {
  return (
    <a
      href={href}
      className={`${styles.socialLink} ${className}`}
      aria-label={ariaLabel}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </a>
  )
}

export default SocialLink

