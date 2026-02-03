import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Rutas publicas
import Landing from './pages/landing'
import Login from './pages/login'
import Register from './pages/register'
import NotFound from './pages/notFound'

// Rutas privadas
import PrivateLayout from './components/privateLayout'
import Dashboard from './layout/dashboard'
import Despensa from './layout/despensa'
import Compras from './layout/compras'
import UserProfile from './layout/userProfile'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* Rutas publicas */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/app" element={<PrivateLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="despensa" element={<Despensa />} />
            <Route path="compras" element={<Compras />} />
            <Route path="perfil" element={<UserProfile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
