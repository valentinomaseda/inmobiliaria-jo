# Actualización: Formato de Precio y Moneda

## Cambios implementados

### ✅ Base de datos
- Se agregó la columna `moneda` a la tabla `propiedad`
- Soporta tres monedas: USD (Dólar), ARS (Peso Argentino), EUR (Euro)
- Valor por defecto: USD

### ✅ Panel de administración
El formulario de propiedades ahora incluye:
- **Selector de moneda**: Elige entre USD, ARS o EUR
- **Formato automático del precio**: Al escribir `120000`, se muestra automáticamente como `120.000`
- **Separadores de miles**: Los precios se formatean con puntos como separadores

### ✅ Vistas del cliente
- Los precios se muestran con el símbolo de moneda: `USD $120.000`, `ARS $120.000`, `EUR €120.000`
- Formato consistente en todas las vistas: Home, Catálogo y Detalle de propiedad

## Cómo aplicar los cambios

### Paso 1: Actualizar la base de datos

Ejecuta el script SQL para agregar la columna de moneda:

```bash
mysql -u root -p inmobiliaria_juliana < backend/migrations/add_moneda_column.sql
```

O manualmente en tu cliente MySQL:

```sql
ALTER TABLE propiedad 
ADD COLUMN moneda ENUM('USD', 'ARS', 'EUR') DEFAULT 'USD' 
AFTER valor;

UPDATE propiedad SET moneda = 'USD' WHERE moneda IS NULL;
```

### Paso 2: Verificar
Una vez aplicada la migración, verifica que la columna se haya agregado correctamente:

```sql
DESCRIBE propiedad;
```

Deberías ver la columna `moneda` después de `valor`.

## Características

### En el formulario de administración:
1. **Selector de moneda** con 3 opciones:
   - USD $ (Dólar estadounidense)
   - ARS $ (Peso argentino)
   - EUR € (Euro)

2. **Formato automático del precio**:
   - Escribes: `120000`
   - Se muestra: `120.000`
   - Se guarda en la BD: `120000` (sin formato, como número)

3. **Validación**: El campo es obligatorio y solo acepta números

### En las vistas del cliente:
Los precios se muestran con el formato:
- `USD $120.000`
- `ARS $45.000`
- `EUR €100.000`

### Retrocompatibilidad:
- Las propiedades existentes sin moneda se tratarán como USD por defecto
- El sistema sigue funcionando si una propiedad no tiene moneda definida

## Ejemplo de uso

### Crear/editar una propiedad:
1. Selecciona la moneda (ej: ARS)
2. Ingresa el precio: `120000`
3. El sistema lo muestra como: `120.000`
4. Al guardar, se almacena `120000` en la base de datos con `moneda = 'ARS'`

### Vista del cliente:
El precio se mostrará como: **ARS $120.000**

## Archivos modificados

### Base de datos:
- [schema.sql](../schema.sql) - Agregada columna `moneda`
- [backend/migrations/add_moneda_column.sql](../backend/migrations/add_moneda_column.sql) - Script de migración

### Frontend:
- [AdminPropiedadForm.jsx](../frontend/src/admin/pages/AdminPropiedadForm.jsx) - Formulario con selector de moneda y formato
- [Home.jsx](../frontend/src/pages/Home.jsx) - Muestra precio con moneda
- [Catalogo.jsx](../frontend/src/pages/Catalogo.jsx) - Muestra precio con moneda
- [PropiedadDetalle.jsx](../frontend/src/pages/PropiedadDetalle.jsx) - Muestra precio con moneda
