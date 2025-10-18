import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchUser } from '@/redux/slices/userSlice'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ScrollToTop } from '@/common'
import '@/App.css'
import AppRoutes from '@/routes/AppRoutes'

function App() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)
  const location = useLocation()
  
  // Приховуємо Header і Footer на домашній сторінці
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return (
    <div className="app">
      <ScrollToTop />
      {!isHomePage && <Header />}
      <AppRoutes />
      {!isHomePage && (
        <Footer
          contactInfo={user ? {
            phone: user.phone,
            email: user.email,
            telegram: user.telegram,
            linkedin: user.linkedin,
            freelancehunt: user.freelancehunt
          } : undefined}
        />
      )}
    </div>
  )
}

export default App
