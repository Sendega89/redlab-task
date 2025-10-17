import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Catalog from '@/pages/Catalog'
import ProductPage from '@/pages/ProductPage'
import ErrorPage from '@/pages/ErrorPage'
import Home from '@/pages/Home'


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/product/:name/:id" element={<ProductPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default AppRoutes
