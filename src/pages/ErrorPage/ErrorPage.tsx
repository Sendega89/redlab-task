import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { CatalogueIcon, Home01Icon } from '@hugeicons/core-free-icons'
import CardButton from '@/components/Buttons/CardButton/CardButton'
import styles from './ErrorPage.module.css'
import { useNavigate } from 'react-router'


const ErrorPage: React.FC = () => {
  const navigate = useNavigate()

  const onGo = (link: string) => {
    navigate(link)
  }
  
  return (
    <div className={styles.errorPage}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* 404 Number */}
          <div className={styles.errorNumber}>404</div>
          
          {/* Icon */}
          <div className={styles.iconWrapper}>
            <span className={styles.icon}>🔍</span>
          </div>

          {/* Message */}
          <h1 className={styles.title}>Сторінку не знайдено</h1>
          <p className={styles.description}>
            На жаль, сторінка, яку ви шукаєте, не існує або була переміщена.
          </p>

          {/* Button */}
          <CardButton
            text="На головну"
            variant="warning"
            size="large"
            iconLeft={<HugeiconsIcon icon={Home01Icon} />}
            onClick={() => onGo('/')}
            className={styles.button}
          />
          <CardButton
            text="До каталогу"
            variant="warning"
            size="large"
            iconLeft={<HugeiconsIcon icon={CatalogueIcon} />}
            onClick={() => onGo('/catalog')}
            className={styles.button}
          />
        </div>
      </div>
    </div>
  )
}

export default ErrorPage

