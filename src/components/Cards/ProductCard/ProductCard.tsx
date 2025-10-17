import React from 'react'
import type { ProductType } from '@/types/ProductsTypes'
import { useToggleFavoriteMutation } from '@/redux/rtkApi/productsApi'
import CardButton from '@/components/Buttons/CardButton/CardButton'
import Spinner from '@/components/Spinner'
import styles from './ProductCard.module.css'
import { HugeiconsIcon } from '@hugeicons/react'
import { FavouriteCircleIcon, FavouriteIcon, ShoppingCart02Icon } from '@hugeicons/core-free-icons'
import { useNavigate } from 'react-router'




type Props = {
  card: ProductType
}

const ProductCard: React.FC<Props> = ({ card }) => {
  const navigate = useNavigate()
  const [toggleFavorite, { isLoading: isFavoriteLoading }] = useToggleFavoriteMutation()
  const { id, name, price, category, isFavorite, img, description } = card

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(id)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // TODO: Додати логіку додавання в кошик
    // Можна додати toast notification або dispatch Redux action
  }
  
  const handleClickTitle = () => {
    navigate(`/product/${card.name}/${card.id}`)
  }
  return (
    <div className={styles.card}>
      <button
        className={styles.favoriteButton}
        onClick={handleToggleFavorite}
        aria-label={isFavorite ? 'Видалити з обраного' : 'Додати в обране'}
        disabled={isFavoriteLoading}
      >
        {isFavoriteLoading ? (
          <Spinner size="small" />
        ) : isFavorite ? (
          <HugeiconsIcon icon={FavouriteCircleIcon} />
        ) : (
          <HugeiconsIcon icon={FavouriteIcon} aria-hidden="true" />
        )}
      </button>
      <div className={styles.imageContainer} role="button" tabIndex={0} onClick={handleClickTitle}>
        <img src={img} alt={name} className={styles.image} />
      </div>

      <div className={styles.content}>
        <span className={styles.badge}>New</span>

        <div className={styles.info} role="button" tabIndex={0} onClick={handleClickTitle}>
          <h3 className={styles.title}>{name}</h3>
          <p className={styles.category}>Категорія: {category}</p>
          {description && (
            <p className={styles.description}>{description}</p>
          )}
          <p className={styles.price}>{price} ₴</p>
        </div>

        <div className={styles.buttonContainer}>
          <CardButton
            text="Додати в кошик"
            variant="primary"
            size="medium"
            fullWidth
            iconLeft={<HugeiconsIcon icon={ShoppingCart02Icon} />}
            onClick={handleAddToCart}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
