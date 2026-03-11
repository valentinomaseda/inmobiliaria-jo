# Componentes Personalizados - Select y Checkbox

Este proyecto incluye componentes personalizados de **Select** y **Checkbox** con la estética de la marca.

## 📦 Componentes

### CustomSelect

Select desplegable personalizado con animaciones y estilos coherentes con el diseño.

**Ubicación**: `frontend/src/admin/components/CustomSelect.jsx`

**Características**:
- ✅ Dropdown personalizado con animación suave
- ✅ Hover effects en opciones
- ✅ Indicador visual de selección (check)
- ✅ Scroll personalizado con los colores de la marca
- ✅ Cierre automático al hacer clic fuera
- ✅ Icono de chevron animado

**Uso**:
```jsx
import CustomSelect from '../components/CustomSelect';

<CustomSelect
  name="operacion"
  value={formData.operacion}
  onChange={handleChange}
  required
  placeholder="Seleccionar..." // Opcional
  options={[
    { value: 'venta', label: 'Venta' },
    { value: 'alquiler', label: 'Alquiler' },
  ]}
/>
```

**Props**:
- `name` (string): Nombre del campo
- `value` (string): Valor seleccionado
- `onChange` (function): Callback al cambiar (recibe objeto con target.name y target.value)
- `options` (array): Array de objetos con `value` y `label`
- `placeholder` (string): Texto cuando no hay selección (default: "Seleccionar...")
- `required` (boolean): Si el campo es obligatorio
- `className` (string): Clases adicionales

---

### CustomCheckbox

Checkbox personalizado con animación y estilos coherentes.

**Ubicación**: `frontend/src/admin/components/CustomCheckbox.jsx`

**Características**:
- ✅ Animación suave al marcar/desmarcar
- ✅ Icono de check con transición
- ✅ Hover effect en el borde
- ✅ Accesible (usa input nativo interno)
- ✅ Colores de la marca (jo-pink)

**Uso**:
```jsx
import CustomCheckbox from '../components/CustomCheckbox';

<CustomCheckbox
  name="destacada"
  checked={formData.destacada}
  onChange={handleChange}
  label="Marcar como propiedad destacada"
/>
```

**Props**:
- `name` (string): Nombre del campo
- `checked` (boolean): Estado del checkbox
- `onChange` (function): Callback al cambiar
- `label` (string): Texto del label
- `className` (string): Clases adicionales

---

## 🎨 Estilos

Los componentes utilizan los colores definidos en `tailwind.config.js`:

```javascript
colors: {
  jo: {
    pink: '#ed3b87',        // Color principal
    pinkHover: '#d32e73',   // Hover state
    darkCard: '#1f2937',    // Fondo de inputs
    darkBorder: '#2d3748',  // Bordes
    darkText: '#f7fafc',    // Texto principal
    darkTextMuted: '#a0aec0' // Texto secundario
  }
}
```

### Scrollbar personalizado

El scrollbar del CustomSelect usa estilos definidos en `index.css`:

```css
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #1f2937;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #ed3b87;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d32e73;
}
```

---

## 📁 Archivos modificados

### Componentes creados:
1. `frontend/src/admin/components/CustomSelect.jsx`
2. `frontend/src/admin/components/CustomCheckbox.jsx`

### Archivos actualizados:
1. `frontend/src/admin/pages/AdminPropiedadForm.jsx` - Formulario de propiedades
2. `frontend/src/admin/pages/AdminPropiedades.jsx` - Filtros de propiedades
3. `frontend/src/index.css` - Estilos del scrollbar

---

## 🚀 Beneficios

### Antes (Select nativo):
- ❌ Apariencia diferente en cada navegador
- ❌ Difícil de personalizar
- ❌ No sigue la estética de la página

### Después (CustomSelect):
- ✅ Apariencia consistente en todos los navegadores
- ✅ Totalmente personalizable
- ✅ Animaciones suaves
- ✅ Sigue la paleta de colores de la marca
- ✅ Mejor UX con hover effects e indicadores visuales

### Antes (Checkbox nativo):
- ❌ Estilo genérico
- ❌ Tamaño fijo

### Después (CustomCheckbox):
- ✅ Diseño personalizado con check animado
- ✅ Colores de la marca
- ✅ Hover effects
- ✅ Mejor visibilidad

---

## 💡 Ejemplo completo

```jsx
import React, { useState } from 'react';
import CustomSelect from '../components/CustomSelect';
import CustomCheckbox from '../components/CustomCheckbox';

function MiFormulario() {
  const [formData, setFormData] = useState({
    categoria: 'tecnologia',
    activo: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <form>
      <CustomSelect
        name="categoria"
        value={formData.categoria}
        onChange={handleChange}
        options={[
          { value: 'tecnologia', label: 'Tecnología' },
          { value: 'deportes', label: 'Deportes' },
          { value: 'musica', label: 'Música' }
        ]}
      />

      <CustomCheckbox
        name="activo"
        checked={formData.activo}
        onChange={handleChange}
        label="Está activo"
      />

      <button type="submit">Guardar</button>
    </form>
  );
}
```

---

## 🔧 Personalización adicional

Si necesitas ajustar los estilos, puedes:

1. **Modificar colores**: Edita `tailwind.config.js` para cambiar la paleta
2. **Ajustar tamaños**: Usa la prop `className` para agregar tus propias clases
3. **Cambiar animaciones**: Edita los archivos de componentes directamente

---

## ✨ Recomendaciones

- Usa estos componentes en lugar de `<select>` y `<input type="checkbox">` nativos para mantener consistencia
- Los componentes son reutilizables en cualquier parte del admin
- Si necesitas un select con búsqueda, considera agregar un input de filtro dentro del CustomSelect
