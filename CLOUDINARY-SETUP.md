# Configuración de Cloudinary

Este proyecto utiliza **Cloudinary** para almacenar y gestionar todas las imágenes de las propiedades.

## ¿Qué es Cloudinary?

Cloudinary es un servicio en la nube que permite almacenar, optimizar y transformar imágenes automáticamente. Ofrece:
- ✅ Almacenamiento ilimitado en la nube (plan gratuito incluye suficiente espacio)
- ✅ Optimización automática de imágenes
- ✅ CDN global para carga rápida
- ✅ Transformaciones de imágenes en tiempo real
- ✅ No requiere gestión del servidor

## Cómo configurar Cloudinary

### 1. Crear una cuenta gratuita

1. Ve a [cloudinary.com](https://cloudinary.com/)
2. Haz clic en "Sign Up" (Registrarse)
3. Completa el formulario de registro
4. Verifica tu correo electrónico

### 2. Obtener las credenciales

1. Inicia sesión en tu cuenta de Cloudinary
2. Serás redirigido al **Dashboard**
3. En la página principal verás:
   - **Cloud Name**: Tu nombre de cloud único
   - **API Key**: Tu clave de API
   - **API Secret**: Tu clave secreta (haz clic en "Show" para verla)

### 3. Configurar las variables de entorno

1. En el directorio `backend`, copia el archivo `.env.example` y renómbralo a `.env`:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Abre el archivo `.env` y completa las credenciales de Cloudinary:
   ```env
   CLOUDINARY_CLOUD_NAME=tu_cloud_name_aqui
   CLOUDINARY_API_KEY=tu_api_key_aqui
   CLOUDINARY_API_SECRET=tu_api_secret_aqui
   ```

3. Asegúrate de completar también las demás variables (base de datos, JWT, etc.)

### 4. Reiniciar el servidor

Después de configurar las variables de entorno, reinicia el servidor del backend:

```bash
cd backend
npm run dev
```

## Características implementadas

### En el Backend

- **Upload automático**: Las imágenes se suben automáticamente a Cloudinary
- **Optimización**: Cloudinary optimiza las imágenes automáticamente
- **Límite de tamaño**: Máximo 2000x1500px y 10MB por imagen
- **Organización**: Las imágenes se guardan en carpetas: `inmobiliaria-juliana/propiedades/`
- **Eliminación**: Al borrar una imagen de la base de datos, también se elimina de Cloudinary

### En el Frontend

- **URLs directas**: El frontend usa las URLs públicas de Cloudinary
- **CDN global**: Las imágenes se cargan desde el CDN de Cloudinary
- **Retrocompatibilidad**: Sigue funcionando con imágenes locales antiguas

## Límites del plan gratuito

El plan gratuito de Cloudinary incluye:
- ✅ 25 créditos mensuales (suficiente para ~25,000 imágenes)
- ✅ 25GB de almacenamiento
- ✅ 25GB de ancho de banda mensual
- ✅ Todas las transformaciones básicas

Para un sitio de inmobiliaria, esto es más que suficiente.

## Ventajas sobre almacenamiento local

| Característica | Local | Cloudinary |
|----------------|-------|------------|
| Escalabilidad | Limitada por servidor | Ilimitada |
| CDN global | ❌ No | ✅ Sí |
| Optimización automática | ❌ No | ✅ Sí |
| Backup automático | ❌ No | ✅ Sí |
| Costo de servidor | 💰 Alto | 💰 Gratis/Bajo |
| Mantenimiento | 🔧 Manual | ✅ Automático |

## Solución de problemas

### Error: "Invalid credentials"
- Verifica que las credenciales en `.env` sean correctas
- Asegúrate de que no haya espacios en blanco
- Reinicia el servidor después de cambiar `.env`

### Error: "Cloud name not found"
- Verifica el `CLOUDINARY_CLOUD_NAME` en `.env`
- El cloud name debe coincidir exactamente con el del dashboard

### Las imágenes no se suben
- Verifica que el archivo `.env` exista en el directorio `backend`
- Verifica que las variables estén configuradas
- Revisa los logs del servidor para más detalles

## Documentación adicional

- [Documentación oficial de Cloudinary](https://cloudinary.com/documentation)
- [Node.js SDK](https://cloudinary.com/documentation/node_integration)
- [Upload API](https://cloudinary.com/documentation/image_upload_api_reference)
