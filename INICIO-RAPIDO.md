# 🎯 Inicio Rápido - 5 Minutos

## 1️⃣ Instalar Dependencias

**Opción A - Instalar todo de una vez (desde la raíz):**
```bash
npm run install:all
```

**Opción B - Instalar manualmente:**
```bash
# Backend
cd backend
npm install
cd ..

# Frontend
cd frontend
npm install
cd ..
```

## 2️⃣ Configurar Base de Datos

```bash
# Crear la base de datos en MySQL
mysql -u root -p < schema.sql
```

## 3️⃣ Configurar Variables de Entorno

**Backend (.env):**
```bash
cd backend
cp .env.example .env
# Editar backend/.env con tus credenciales de MySQL
```

**Frontend (.env):**
```bash
cd ../frontend
cp .env.example .env
# El archivo ya tiene la configuración por defecto
cd ..
```

## 4️⃣ Crear Administrador

**Opción A - Desde la raíz:**
```bash
npm run create-admin
```

**Opción B - Desde el backend:**
```bash
cd backend
npm run create-admin
# Seguir las instrucciones en pantalla
```

## 5️⃣ Iniciar Aplicación

**Opción A - Desde la raíz (recomendado):**

Terminal 1 - Backend:
```bash
npm run dev:backend
```

Terminal 2 - Frontend:
```bash
npm run dev:frontend
```

**Opción B - Manual:**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

## 🎉 ¡Listo!

- **Sitio público**: http://localhost:5173
- **Panel admin**: http://localhost:5173/admin/login
- **API Backend**: http://localhost:5000/api

---

## 🔑 Acceso por Defecto

Usa las credenciales que creaste con el script `create-admin`.

## 📚 Más Información

- Ver [INSTALACION.md](INSTALACION.md) para guía detallada
- Ver [README.md](README.md) para documentación completa
