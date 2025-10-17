import React, { useState, useEffect } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { UserCircleIcon, Search01Icon } from '@hugeicons/core-free-icons'
import SearchInput from '@/components/SearchInput'
import Logo from '@/components/Logo'
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'



const Header: React.FC = () => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileSearchOpen(false)
      }
    }
    if (isMobileSearchOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMobileSearchOpen])


  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Left Section - Logo & Catalog Link */}
        <div className={styles.leftSection}>
          <Logo variant="header" />

          <nav className={styles.nav}>
            <NavLink
              to="/catalog"
              className={(isActive) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              Каталог
            </NavLink>
          </nav>
        </div>

        {/* Center Section - Search */}
        <div className={styles.centerSection}>
          <SearchInput placeholder="Пошук товарів..." />
        </div>

        {/* Right Section - Search Icon (Mobile) & User Icon */}
        <div className={styles.rightSection}>
          <button
            className={styles.searchButtonMobile}
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            aria-label="Пошук"
          >
            <HugeiconsIcon icon={Search01Icon} />
          </button>

          <button
            className={styles.userButton}
            aria-label="Профіль користувача"
          >
            <HugeiconsIcon icon={UserCircleIcon} />
          </button>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {isMobileSearchOpen && (
        <div className={styles.mobileSearchDropdown}>
          <SearchInput placeholder="Пошук товарів..." />
        </div>
      )}
    </header>
  )
}

export default Header

