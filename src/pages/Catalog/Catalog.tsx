import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useProductsListQuery } from '../../redux/rtkApi/productsApi'
import { clearSearch } from '../../redux/slices/searchSlice'
import type { ProductType } from '../../types/ProductsTypes'
import ProductCard from '../../components/Cards/ProductCard/ProductCard'
import Loader from '../../components/Loader'
import ErrorState from '../../components/ErrorState'
import CardButton from '../../components/Buttons/CardButton/CardButton'
import styles from './Catalog.module.css'

const Catalog = () => {
  const dispatch = useAppDispatch()
  
  // RTK Query - автоматически загружает данные
  const { data: products = [], isLoading, error, refetch } = useProductsListQuery()
  
  const searchQuery = useAppSelector((state) => state.search.query)
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)

  // Получаем уникальные категории
  const categories = ['all', ...new Set(products.map(product => product.category))]

  // Фильтрация продуктов
  const filteredProducts = products.filter((product: ProductType) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesFavorites = !showOnlyFavorites || product.isFavorite

    return matchesSearch && matchesCategory && matchesFavorites
  })

  if (isLoading) {
    return <Loader fullscreen text="Завантаження каталогу..." />
  }

  if (error) {
    return (
      <ErrorState fullscreen>
        <CardButton
          text="Спробувати ще раз"
          variant="warning"
          size="medium"
          onClick={() => refetch()}
        />
      </ErrorState>
    )
  }

  return (
    <div className={styles.catalog}>
      {/* Header */}
      <section className={styles.header}>
        <h1 className={styles.title}>Каталог товарів</h1>
        <p className={styles.subtitle}>
          Знайдено: <span className={styles.count}>{filteredProducts.length}</span> товарів
        </p>
      </section>

      {/* Filters */}
      <div className={styles.filters}>
        {/* Category Filter */}
        <div className={styles.categoryFilter}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                selectedCategory === category ? styles.categoryButtonActive : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'Всі категорії' : category}
            </button>
          ))}
        </div>

        {/* Favorites Toggle */}
        <label className={styles.favoritesToggle}>
          <input
            type="checkbox"
            checked={showOnlyFavorites}
            onChange={(e) => setShowOnlyFavorites(e.target.checked)}
            className={styles.checkbox}
          />
          <span className={styles.toggleLabel}>Тільки обране ⭐</span>
        </label>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className={styles.productsGrid}>
          {filteredProducts.map((product: ProductType) => (
            <ProductCard card={product} key={product.id} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyContent}>
            <p className={styles.emptyIcon}>📦</p>
            <h3 className={styles.emptyTitle}>Товарів не знайдено</h3>
            <p className={styles.emptyText}>
              Спробуйте змінити параметри пошуку або фільтрації
            </p>
            <button
              className={styles.resetButton}
              onClick={() => {
                dispatch(clearSearch())
                setSelectedCategory('all')
                setShowOnlyFavorites(false)
              }}
            >
              Скинути фільтри
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Catalog

