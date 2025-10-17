import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { FavouriteIcon, ShoppingCart02Icon, ArrowLeft01Icon } from '@hugeicons/core-free-icons'
import CardButton from '../../components/Buttons/CardButton/CardButton'
import type { ProductType } from '../../types/ProductsTypes'
import styles from './ProductPage.module.css'

interface ProductPageProps {
  product?: ProductType
  onBack?: () => void
  onAddToCart?: () => void
  onToggleFavorite?: () => void
}

const ProductPage: React.FC<ProductPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onToggleFavorite
}) => {
  // Mock data для демонстрации
  const mockProduct: ProductType = {
    id: 1,
    name: 'Ноутбук ASUS ROG',
    description: 'Потужний ігровий ноутбук з RTX 4060. Ідеально підходить для гравців та професіоналів. Висока продуктивність, чудовий дисплей та надійна система охолодження забезпечують комфортну роботу навіть у найскладніших задачах.',
    price: 45000,
    category: 'electronics',
    img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop',
    isFavorite: false,
  }

  const currentProduct = product || mockProduct

  return (
    <div className={styles.productPage}>
      <div className={styles.container}>
        {/* Back Button */}
        <button className={styles.backButton} onClick={onBack}>
          <HugeiconsIcon icon={ArrowLeft01Icon} />
          <span>Повернутися до каталогу</span>
        </button>

        {/* Product Content */}
        <div className={styles.content}>
          {/* Left Side - Image */}
          <div className={styles.imageSection}>
            <div className={styles.imageContainer}>
              <img 
                src={currentProduct.img} 
                alt={currentProduct.name}
                className={styles.image}
              />
            </div>
            
            {/* Image Thumbnails (можно добавить позже) */}
            <div className={styles.thumbnails}>
              <div className={styles.thumbnail}>
                <img src={currentProduct.img} alt="Thumbnail 1" />
              </div>
            </div>
          </div>

          {/* Right Side - Details */}
          <div className={styles.detailsSection}>
            {/* Category Badge */}
            <div className={styles.categoryBadge}>
              {currentProduct.category}
            </div>

            {/* Title */}
            <h1 className={styles.title}>{currentProduct.name}</h1>

            {/* Price */}
            <div className={styles.priceSection}>
              <span className={styles.price}>{currentProduct.price} ₴</span>
              <span className={styles.priceLabel}>Ціна</span>
            </div>

            {/* Description */}
            <div className={styles.descriptionSection}>
              <h2 className={styles.descriptionTitle}>Опис товару</h2>
              <p className={styles.description}>{currentProduct.description}</p>
            </div>

            {/* Product Info */}
            <div className={styles.infoSection}>
              <h2 className={styles.infoTitle}>Характеристики</h2>
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Категорія:</span>
                  <span className={styles.infoValue}>{currentProduct.category}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Наявність:</span>
                  <span className={styles.infoValue}>✓ В наявності</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Артикул:</span>
                  <span className={styles.infoValue}>#{currentProduct.id}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Гарантія:</span>
                  <span className={styles.infoValue}>12 місяців</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <CardButton
                text="Додати в кошик"
                variant="warning"
                size="large"
                fullWidth
                iconLeft={<HugeiconsIcon icon={ShoppingCart02Icon} />}
                onClick={onAddToCart}
              />
              
              <button 
                className={styles.favoriteButton}
                onClick={onToggleFavorite}
              >
                <HugeiconsIcon 
                  icon={FavouriteIcon} 
                  className={currentProduct.isFavorite ? styles.favoriteActive : ''}
                />
                <span>{currentProduct.isFavorite ? 'У обраному' : 'Додати в обране'}</span>
              </button>
            </div>

            {/* Additional Info */}
            <div className={styles.additionalInfo}>
              <div className={styles.infoCard}>
                <span className={styles.infoCardIcon}>🚚</span>
                <div>
                  <strong>Безкоштовна доставка</strong>
                  <p>При замовленні від 1000 ₴</p>
                </div>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoCardIcon}>↩️</span>
                <div>
                  <strong>Повернення 14 днів</strong>
                  <p>Гарантія повернення коштів</p>
                </div>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoCardIcon}>✓</span>
                <div>
                  <strong>Оригінальна продукція</strong>
                  <p>Гарантія якості від виробника</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage

