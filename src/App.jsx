import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Rutas publicas
import Landing from './pages/landing'
import Login from './pages/login'
import Register from './pages/register'

// Rutas privadas
import PrivateLayout from './components/privateLayout'
import Despensa from './layout/despensa'
import Compras from './layout/compras'
import UserProfile from './layout/userProfile'
import AdminRoute from './components/adminRoute'
import AdminConfig from './layout/AdminConfig'


//Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Routes>

          {/* Rutas publicas */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/app" element={<PrivateLayout />}>
            <Route index element={<Despensa />} />
            <Route path="compras" element={<Compras />} />
            <Route path="perfil" element={<UserProfile />} />
            <Route path="admin" element={
              <AdminRoute>
                <AdminConfig />
              </AdminRoute>
            } />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
