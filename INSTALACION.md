# 🚀 Guía de Instalación - Inmobiliaria Juliana Ortiz

## 📋 Prerequisitos

Asegúrate de tener instalado:
- Node.js v16 o superior
- MySQL 8.0
- Git (opcional)

## 🗄️ Paso 1: Configurar la Base de Datos

1. Abrir MySQL Workbench o terminal MySQL:
```bash
mysql -u root -p
```

2. Ejecutar el script del schema:
```bash
mysql -u root -p < schema.sql
```

O copiar el contenido de `schema.sql` y ejecutarlo en MySQL Workbench.

3. Crear un usuario administrador inicial:
```sql
USE inmobiliaria_juliana;

-- Generar hash de contraseña en JavaScript (ver más abajo)
INSERT INTO administrador (nombre, email, password) 
VALUES ('Admin', 'admin@inmobiliaria.com', 'HASH_AQUI');
```

Para generar el hash de la contraseña, puedes usar Node.js:
```javascript
const bcrypt = require('bcryptjs');
const password = 'admin123';
const hash = bcrypt.hashSync(password, 10);
console.log(hash);
```

O simplemente ejecuta esto en el directorio del backend después de instalar:
```bash
cd backend
npm install
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('admin123', 10))"
```

Luego usa el hash generado en el INSERT.

## ⚙️ Paso 2: Configurar el Backend

1. Navegar a la carpeta backend:
```bash
cd backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo de configuración:
```bash
cp .env.example .env
```

4. Editar el archivo `.env` con tus credenciales:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password_mysql
DB_NAME=inmobiliaria_juliana
DB_PORT=3306

JWT_SECRET=cambia_esto_por_una_clave_secreta_muy_larga_y_segura
JWT_EXPIRES_IN=7d

PORT=5000
NODE_ENV=development

FRONTEND_URL=http://localhost:5173
```

5. Verificar que la carpeta `uploads/propiedades` existe (se crea automáticamente).

6. Iniciar el servidor:
```bash
npm run dev
```

El backend debería estar corriendo en `http://localhost:5000`

## 🎨 Paso 3: Configurar el Frontend

1. Abrir una nueva terminal y navegar a la carpeta frontend:
```bash
cd frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo de configuración:
```bash
cp .env.example .env
```

4. Editar el archivo `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

El frontend debería estar corriendo en `http://localhost:5173`

## 🔐 Paso 4: Acceder al Panel de Administración

1. Abrir el navegador en: `http://localhost:5173/admin/login`

2. Usar las credenciales creadas en el Paso 1:
   - Email: `admin@inmobiliaria.com`
   - Contraseña: `admin123` (o la que hayas configurado)

3. Después de iniciar sesión, serás redirigido al Dashboard.

## 📝 Paso 5: Agregar la Primera Propiedad

1. En el panel de administración, ir a "Propiedades"
2. Hacer clic en "Nueva Propiedad"
3. Completar el formulario:
   - Información básica (nombre, tipo, operación, precio)
   - Ubicación (opcional pero recomendado)
   - Subir imágenes
4. Hacer clic en "Crear Propiedad"

## ✅ Verificar que Todo Funciona

1. **Backend**: Ir a `http://localhost:5000/api/health`
   - Deberías ver: `{"status":"OK","message":"Servidor funcionando correctamente"}`

2. **Frontend público**: Ir a `http://localhost:5173`
   - Deberías ver la página principal

3. **Panel admin**: Ir a `http://localhost:5173/admin/dashboard`
   - Deberías ver el dashboard con estadísticas

## 🐛 Solución de Problemas

### Error de conexión a la base de datos
- Verificar que MySQL está corriendo
- Verificar credenciales en `.env`
- Verificar que la base de datos existe

### Error "Token inválido"
- Limpiar localStorage del navegador
- Volver a hacer login
- Verificar que JWT_SECRET es el mismo en el servidor

### Imágenes no se ven
- Verificar que las imágenes se subieron correctamente
- Verificar que `backend/uploads/propiedades` existe
- Verificar URL en el navegador

### Puerto ya en uso
- Cambiar el puerto en `.env` del backend o frontend
- Matar el proceso que está usando el puerto:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

## 📦 Producción

Para compilar para producción:

**Frontend:**
```bash
cd frontend
npm run build
# Los archivos estarán en frontend/dist/
```

**Backend:**
```bash
cd backend
# Cambiar NODE_ENV a production en .env
NODE_ENV=production
npm start
```

## 🔒 Seguridad

Antes de subir a producción:
1. Cambiar `JWT_SECRET` por una clave fuerte
2. Cambiar contraseñas de la base de datos
3. Configurar CORS apropiadamente
4. Usar HTTPS
5. Configurar firewall y límites de rate

## 📞 Soporte

Si tienes problemas, revisa:
- Los logs del backend en la terminal
- La consola del navegador (F12)
- Los errores de la base de datos

---

¡Listo! Tu sistema inmobiliario está funcionando. 🎉
