import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { fetchProducts } from './redux/slices/productsSlice'
import type { ProductType } from './types/ProductsTypes'
import ProductCard from './components/Cards/ProductCard/ProductCard'
import './App.css'

function App() {
  const dispatch = useAppDispatch()
  const { products, loading, error } = useAppSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])


  if (loading) {
    return <div className="app">Завантаження...</div>
  }

  if (error) {
    return <div className="app">Помилка: {error}</div>
  }

  return (
    <div className="app">
      <h1>Каталог товарів</h1>
      <div className="products-grid">
        {products.map((product: ProductType) => (
         <ProductCard card={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}

export default App
