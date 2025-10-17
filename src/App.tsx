import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { fetchUser } from './redux/slices/userSlice'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import AppRoutes from "./routes/AppRoutes.tsx";

function App() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return (
    <div className="app">
      <Header
        onUserClick={() => console.log('Профіль натиснуто')}
      />
     <AppRoutes />
      <Footer
        contactInfo={user ? {
          phone: user.phone,
          email: user.email,
          telegram: user.telegram,
          linkedin: user.linkedin,
          freelancehunt: user.freelancehunt
        } : undefined}
        onLogoClick={() => console.log('Логотип Footer натиснуто')}
      />
    </div>
  )
}

export default App
