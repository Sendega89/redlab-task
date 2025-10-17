import React, { useState, useEffect } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { UserCircleIcon, ShoppingBasket01Icon, Search01Icon } from '@hugeicons/core-free-icons'
import SearchInput from '../SearchInput'
import styles from './Header.module.css'
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router";

interface HeaderProps {
  onUserClick?: () => void
}

const Header: React.FC<HeaderProps> = ({
  onUserClick
}) => {
    const navigate = useNavigate()
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
    const onLogoClick = () => {
        navigate(`/`)
    }
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

          <nav className={styles.nav}>
            <NavLink to={'/catalog'}
              className={(isActive) =>
                 `${styles.navLink} ${isActive ? styles.active : ""}`
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
            onClick={onUserClick}
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

