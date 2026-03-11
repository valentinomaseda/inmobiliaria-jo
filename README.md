# Inmobiliaria Juliana Ortiz

Sistema completo de gestión inmobiliaria con frontend público y panel de administración.

## 🌟 Características

### Frontend Público
- ✅ Catálogo de propiedades con filtros
- ✅ Vista detallada de propiedades
- ✅ Diseño responsive y moderno
- ✅ Interfaz con la paleta de colores de la marca
- ✅ Integración con backend

### Panel de Administración
- ✅ Sistema de autenticación con JWT
- ✅ Dashboard con estadísticas
- ✅ Gestión completa de propiedades (CRUD)
- ✅ Carga múltiple de imágenes
- ✅ Gestión de características
- ✅ Filtros y búsqueda
- ✅ Interfaz intuitiva y moderna

### Backend API
- ✅ API REST con Node.js + Express
- ✅ Base de datos MySQL optimizada
- ✅ Autenticación JWT
- ✅ Validación de datos
- ✅ Manejo de errores centralizado
- ✅ Subida de imágenes con Multer
- ✅ Endpoints públicos y protegidos

## 📁 Estructura del Proyecto

```
inmobiliaria-juliana/
├── backend/           # API REST con Node.js + Express
│   ├── config/        # Configuración de BD
│   ├── controllers/   # Lógica de negocio
│   ├── middlewares/   # Autenticación, validación, upload
│   ├── routes/        # Definición de rutas
│   ├── uploads/       # Imágenes de propiedades
│   ├── .env           # Variables de entorno (crear desde .env.example)
│   └── server.js      # Servidor Express
│
├── frontend/          # Sitio público (React + Vite)
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/         # Páginas públicas
│   │   ├── admin/         # Panel de administración
│   │   └── services/      # APIs y servicios
│   ├── index.html
│   ├── .env           # Variables de entorno (crear desde .env.example)
│   └── vite.config.js
│
├── schema.sql         # Estructura de base de datos
├── README.md          # Este archivo
├── INICIO-RAPIDO.md   # Guía de inicio rápido
└── INSTALACION.md     # Guía de instalación detallada
```

## 🚀 Instalación y Configuración

### Backend

1. Instalar dependencias:
```bash
cd backend
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

3. Crear la base de datos:
```bash
mysql -u root -p < schema.sql
```

4. Crear primer administrador (ejecutar en MySQL):
```sql
INSERT INTO administrador (nombre, email, password) 
VALUES ('Admin', 'admin@inmobiliaria.com', '$2a$10$your_hashed_password');
```

5. Iniciar servidor:
```bash
npm run dev
```

### Frontend

1. Instalar dependencias:
```bash
cd frontend
npm install
```

2. Configurar API URL en `.env`:
```bash
VITE_API_URL=http://localhost:5000/api
```

3. Iniciar servidor de desarrollo:
```bash
npm run dev
```

## 🔐 Panel de Administración

Acceder en: `http://localhost:5173/admin`

**Funcionalidades:**
- Login con JWT
- Dashboard con estadísticas
- Gestión de propiedades (CRUD)
- Carga múltiple de imágenes
- Gestión de características
- Vista previa de propiedades

## 📡 API Endpoints

### Autenticación
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil del admin

### Propiedades
- `GET /api/propiedades` - Listar todas (público)
- `GET /api/propiedades/:id` - Ver detalle (público)
- `POST /api/propiedades` - Crear (requiere auth)
- `PUT /api/propiedades/:id` - Actualizar (requiere auth)
- `DELETE /api/propiedades/:id` - Eliminar (requiere auth)

### Imágenes
- `POST /api/imagenes/upload` - Subir imágenes (requiere auth)
- `GET /api/imagenes/propiedad/:id` - Obtener imágenes
- `DELETE /api/imagenes/:id` - Eliminar imagen (requiere auth)

### Características
- `GET /api/caracteristicas` - Listar todas
- `POST /api/caracteristicas` - Crear (requiere auth)
- `PUT /api/caracteristicas/:id` - Actualizar (requiere auth)
- `DELETE /api/caracteristicas/:id` - Eliminar (requiere auth)

## 🎨 Tecnologías

**Backend:**
- Node.js + Express
- MySQL2
- JWT + bcryptjs
- Multer (upload de imágenes)
- Express Validator

**Frontend:**
- React 18
- Vite
- React Router
- Tailwind CSS
- React Icons

## 📝 Notas

- Las imágenes se guardan en `backend/uploads/propiedades/`
- Tamaño máximo por imagen: 5MB
- Formatos permitidos: jpeg, jpg, png, gif, webp
- El token JWT expira en 7 días por defecto
