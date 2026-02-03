# 🥗 FoodHome

**FoodHome** es una aplicación web moderna e inteligente diseñada para revolucionar la gestión de tu cocina. Su objetivo es ayudarte a mantener un inventario claro de tu despensa, planificar tus compras de manera eficiente y evitar el desperdicio de alimentos, todo desde una interfaz limpia y amigable.

## 🚀 Tecnologías Utilizadas

Este proyecto está construido con un stack de última generación para asegurar rendimiento y escalabilidad:

- **Frontend**: [React v19](https://react.dev/) - Biblioteca para interfaces de usuario dinámicas.
- **Build System**: [Vite v7](https://vitejs.dev/) - Entorno de desarrollo ultrarrápido.
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) - Framework de utilidad para diseño responsivo y moderno.
- **Backend & Auth**: [Firebase v12](https://firebase.google.com/)
    - **Firestore**: Base de datos NoSQL en tiempo real.
    - **Authentication**: Gestión segura de usuarios.
- **Navegación**: [React Router v7](https://reactrouter.com/) - Enrutamiento declarativo.
- **Feedback**: [React Toastify](https://fkhadra.github.io/react-toastify/) - Notificaciones elegantes.

---

## 🔄 Flujo del Usuario

El diseño de la experiencia de usuario (UX) guía al usuario de forma intuitiva:

1.  **Descubrimiento (Landing Page)**
    - El usuario llega a una página de inicio impactante.
    - Se le presentan los beneficios clave: ahorro, organización y control.
    - Un botón "Comenzar" (CTA) claro lo invita a unirse.

2.  **Onboarding (Registro/Login)**
    - Si es nuevo, crea una cuenta con Nombre, Correo y Contraseña.
    - Si ya existe, inicia sesión.
    - *Seguridad*: Si intenta entrar a la app sin sesión, es redirigido automáticamente al Login.

3.  **Gestión Diaria (App Principal)**
    - Al entrar, aterriza en **"Mi Despensa"**. Aquí ve de un vistazo qué tiene en casa.
    - **Acción Rápida**: Puede sumar/restar cantidades de productos con un solo clic.

4.  **Planificación (Compras)**
    - Navega a la sección **"Lista de Compras"** a través de la barra lateral.
    - Agrega lo que falta.
    - En el supermercado, marca los items con el "checkbox" interactivo para tacharlos.

5.  **Personalización (Perfil)**
    - Accede a su perfil para ver su rol (Usuario/Admin) o cambiar su contraseña.

---

## ✨ Funcionalidades Detalladas

### 1. Gestión Inteligente de Despensa
- **CRUD Completo**: Crear, Leer, Actualizar y Eliminar productos.
- **Actualización en Tiempo Real**: Gracias a los listeners de Firestore, si agregas un producto desde tu móvil, aparecerá instantáneamente en tu laptop sin recargar la página.
- **Categorización**: Los productos se organizan por categorías (Lácteos, Frutas, Carnes, etc.) traídas dinámicamente de la base de datos.
- **Control de Stock**: Botones `+` / `-` para ajustes rápidos de cantidad. Validación para evitar stock negativo.

### 2. Lista de Compras Interactiva
- **Check-off System**: Casillas de verificación (checkboxes) que permiten tachar visualmente los productos comprados.
- **Feedback Visual**: Los items comprados cambian de estilo (opacidad reducida, texto tachado, color de tema) para diferenciar claramente lo pendiente de lo listo.

### 3. Sistema de Autenticación y Seguridad
- **Rutas Protegidas (`PrivateLayout`)**: Impide el acceso a `/app/*` si no hay un usuario autenticado.
- **Persistencia de Sesión**: La sesión se mantiene activa aunque recargues la página (observer de Firebase Auth).
- **Validaciones de Formulario**: Mensajes de error claros si las contraseñas no coinciden o son muy cortas.

### 4. Panel de Administrador (Role-Based Access)
- **Rutas Exclusivas (`AdminRoute`)**: Solo usuarios con `rol: 'admin'` en Firestore pueden acceder a `/app/admin`.
- **Gestión Global**: El administrador puede agregar nuevas categorías de productos que estarán disponibles para **todos** los usuarios de la plataforma inmediatamente.

### 5. Interfaz de Usuario (UI/UX)
- **Responsive Design**: Se adapta perfectamente a móviles, tablets y escritorio.
- **Feedback al Usuario**: Uso de `Toastify` para confirmar acciones ("Producto eliminado", "Guardado exitosamente") o alertar errores.
- **Estética Coherente**: Paleta de colores unificada (`#1FAF97`) para una identidad de marca profesional.

---

## 📂 Estructura del Proyecto

```bash
src/
├── assets/             # Recursos estáticos
│   ├── Iconos/         # Iconos PNG modernos (reemplazando emojis)
│   └── img/            # Fondos y banners
├── components/         # Bloques de construcción UI
│   ├── headerlading.jsx  # Barra de navegación pública
│   ├── sliderbar.jsx     # Menú lateral de la aplicación (Sidebar)
│   ├── privateLayout.jsx # Wrapper de seguridad para rutas privadas
│   └── adminroute.jsx    # Guardián de seguridad para rutas admin
├── layout/             # Vistas Lógicas Principales
│   ├── despensa.jsx      # Lógica de la despensa
│   ├── compras.jsx       # Lógica de la lista de compras
│   ├── AdminConfig.jsx   # Lógica del panel administrativo
│   └── userProfile.jsx   # Lógica del perfil
├── pages/              # Páginas Públicas
│   ├── landing.jsx       # Página de aterrizaje (Hero + Features)
│   ├── login.jsx         # Autenticación
│   └── register.jsx      # Registro
├── services/           # Capa de Servicios
│   ├── authServices.js   # Funciones de Login/Registro/Logout
│   └── dbServices.js     # Interactores con Firestore (CRUD)
└── App.jsx             # Definición de rutas y estructura global
```

## 🛠️ Instalación Local

1.  **Clonar**: `git clone <repositorio>`
2.  **Instalar**: `npm install`
3.  **Variables de entorno**: Configura tu `firebase.js` con las keys de tu proyecto Firebase.
4.  **Correr**: `npm run dev`

---
© 2026 FoodHome
