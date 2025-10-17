import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HugeiconsIcon } from '@hugeicons/react'
import { FavouriteIcon, ShoppingCart02Icon, ArrowLeft01Icon } from '@hugeicons/core-free-icons'
import { useProductByIdQuery, useToggleFavoriteMutation } from '@/redux/rtkApi/productsApi'
import { useAnimationVariants } from '@/common/hooks/useAnimationVariants'
import CardButton from '@/components/Buttons/CardButton/CardButton'
import Loader from '@/components/Loader'
import ErrorState from '@/components/ErrorState'
import Spinner from '@/components/Spinner'
import styles from './ProductPage.module.css'

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  // RTK Query - автоматически загружает данные
  const { data: product, isLoading, error } = useProductByIdQuery(Number(id) || 0, {
    skip: !id, // Пропустить запрос если нет ID
  })
  
  const [toggleFavorite, { isLoading: isFavoriteLoading }] = useToggleFavoriteMutation()
  
  // Animation variants
  const { containerVariants, itemVariants, scaleInVariants } = useAnimationVariants({
    delayChildren: 0.2,
    staggerChildren: 0.15,
    itemY: 30,
    damping: 15
  })

  const handleBack = () => {
    navigate('/catalog')
  }

  const handleAddToCart = () => {
    // TODO: Додати логіку додавання в кошик
    // Можна додати toast notification або dispatch Redux action
  }

  const handleToggleFavorite = () => {
    if (product && !isFavoriteLoading) {
      toggleFavorite(product.id)
    }
  }

  if (isLoading) {
    return <Loader fullscreen text="Завантаження товару..." />
  }

  if (error || !product) {
    return (
      <ErrorState>
        <CardButton
          text="Повернутися до каталогу"
          variant="warning"
          size="medium"
          onClick={handleBack}
        />
      </ErrorState>
    )
  }

  const currentProduct = product

  return (
    <motion.div 
      className={styles.productPage}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className={styles.container}>
        {/* Back Button */}
        <motion.button 
          className={styles.backButton} 
          onClick={handleBack}
          variants={itemVariants}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} />
          <span>Повернутися до каталогу</span>
        </motion.button>

        {/* Product Content */}
        <div className={styles.content}>
          {/* Left Side - Image */}
          <motion.div 
            className={styles.imageSection}
            variants={scaleInVariants}
          >
            <motion.div 
              className={styles.imageContainer}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src={currentProduct.img} 
                alt={currentProduct.name}
                className={styles.image}
              />
            </motion.div>
            
            {/* Image Thumbnails (можно добавить позже) */}
            <motion.div 
              className={styles.thumbnails}
              variants={itemVariants}
            >
              <motion.div 
                className={styles.thumbnail}
                whileHover={{ scale: 1.1, borderColor: '#facc15' }}
              >
                <img src={currentProduct.img} alt="Thumbnail 1" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Details */}
          <motion.div 
            className={styles.detailsSection}
            variants={containerVariants}
          >
            {/* Category Badge */}
            <motion.div 
              className={styles.categoryBadge}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              {currentProduct.category}
            </motion.div>

            {/* Title */}
            <motion.h1 
              className={styles.title}
              variants={itemVariants}
            >
              {currentProduct.name}
            </motion.h1>

            {/* Price */}
            <motion.div 
              className={styles.priceSection}
              variants={itemVariants}
            >
              <span className={styles.price}>{currentProduct.price} ₴</span>
              <span className={styles.priceLabel}>Ціна</span>
            </motion.div>

            {/* Description */}
            <motion.div 
              className={styles.descriptionSection}
              variants={itemVariants}
            >
              <h2 className={styles.descriptionTitle}>Опис товару</h2>
              <p className={styles.description}>{currentProduct.description}</p>
            </motion.div>

            {/* Product Info */}
            <motion.div 
              className={styles.infoSection}
              variants={itemVariants}
            >
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
            </motion.div>

            {/* Actions */}
            <motion.div 
              className={styles.actions}
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CardButton
                  text="Додати в кошик"
                  variant="warning"
                  size="large"
                  fullWidth
                  iconLeft={<HugeiconsIcon icon={ShoppingCart02Icon} />}
                  onClick={handleAddToCart}
                />
              </motion.div>
              
              <motion.button 
                className={styles.favoriteButton}
                onClick={handleToggleFavorite}
                disabled={isFavoriteLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isFavoriteLoading ? (
                  <Spinner size="small" />
                ) : (
                  <HugeiconsIcon 
                    icon={FavouriteIcon} 
                    className={currentProduct.isFavorite ? styles.favoriteActive : ''}
                  />
                )}
                <span>
                  {isFavoriteLoading 
                    ? 'Оновлення...' 
                    : currentProduct.isFavorite 
                      ? 'У обраному' 
                      : 'Додати в обране'
                  }
                </span>
              </motion.button>
            </motion.div>

            {/* Additional Info */}
            <motion.div 
              className={styles.additionalInfo}
              variants={itemVariants}
            >
              {[
                { icon: '🚚', title: 'Безкоштовна доставка', text: 'При замовленні від 1000 ₴' },
                { icon: '↩️', title: 'Повернення 14 днів', text: 'Гарантія повернення коштів' },
                { icon: '✓', title: 'Оригінальна продукція', text: 'Гарантія якості від виробника' }
              ].map((info, index) => (
                <motion.div 
                  key={index}
                  className={styles.infoCard}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: '0 4px 12px rgba(250, 204, 21, 0.2)'
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className={styles.infoCardIcon}>{info.icon}</span>
                  <div>
                    <strong>{info.title}</strong>
                    <p>{info.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductPage

