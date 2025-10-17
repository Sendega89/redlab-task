import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { ShoppingBasket01Icon, Mail01Icon, Linkedin01Icon, CallIcon, TelegramIcon } from '@hugeicons/core-free-icons'
import SocialLink from './SocialLink'
import styles from './Footer.module.css'

export interface ContactInfo {
  phone?: string
  email?: string
  linkedin?: string
  telegram?: string
  freelancehunt?: string
}

interface FooterProps {
  contactInfo?: ContactInfo
  onLogoClick?: () => void
}

const Footer: React.FC<FooterProps> = ({
  contactInfo,
  onLogoClick
}) => {
  const currentYear = new Date().getFullYear()

  // Форматирование ссылки для телефона (убрать пробелы и скобки)
  const getPhoneLink = (phone: string): string => {
    return `tel:${phone.replace(/[\s()-]/g, '')}`
  }

  // Форматирование ссылки для Telegram
  const getTelegramLink = (telegram: string): string => {
    if (telegram.startsWith('@')) {
      return `https://t.me/${telegram.slice(1)}`
    }
    if (telegram.startsWith('https://') || telegram.startsWith('http://')) {
      return telegram
    }
    return `https://t.me/${telegram}`
  }

  // Получение отображаемого текста для Telegram
  const getTelegramLabel = (telegram: string): string => {
    if (telegram.startsWith('@')) {
      return telegram
    }
    if (telegram.startsWith('https://') || telegram.startsWith('http://')) {
      return 'Telegram'
    }
    return `@${telegram}`
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left Section - Logo */}
        <div className={styles.leftSection}>
          <button 
            className={styles.logo}
            onClick={onLogoClick}
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
          <p className={styles.copyright}>
            © {currentYear} ShopLab. Всі права захищено.
          </p>
        </div>

        {/* Right Section - Contact Info */}
        <div className={styles.rightSection}>
          <h3 className={styles.contactTitle}>Контакти</h3>
          <div className={styles.contactLinks}>
            {contactInfo?.phone && (
              <SocialLink
                href={getPhoneLink(contactInfo.phone)}
                icon={<HugeiconsIcon icon={CallIcon} />}
                label={contactInfo.phone}
                ariaLabel="Телефон"
              />
            )}
            {contactInfo?.email && (
              <SocialLink
                href={`mailto:${contactInfo.email}`}
                icon={<HugeiconsIcon icon={Mail01Icon} />}
                label={contactInfo.email}
                ariaLabel="Email"
              />
            )}
            
            {contactInfo?.telegram && (
              <SocialLink
                href={getTelegramLink(contactInfo.telegram)}
                icon={<HugeiconsIcon icon={TelegramIcon} />}
                label={getTelegramLabel(contactInfo.telegram)}
                ariaLabel="Telegram"
                external
              />
            )}
            
            {contactInfo?.linkedin && (
              <SocialLink
                href={contactInfo.linkedin}
                icon={<HugeiconsIcon icon={Linkedin01Icon} />}
                label="LinkedIn"
                ariaLabel="LinkedIn"
                external
              />
            )}
            
            {contactInfo?.freelancehunt && (
              <SocialLink
                href={contactInfo.freelancehunt}
                icon={
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.87-.92-7-5.31-7-9V8.3l7-3.5 7 3.5V11c0 3.69-3.13 8.08-7 9z"/>
                  </svg>
                }
                label="Freelancehunt"
                ariaLabel="Freelancehunt"
                external
              />
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

