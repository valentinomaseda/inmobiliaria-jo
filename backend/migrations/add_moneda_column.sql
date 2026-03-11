-- Agregar columna de moneda a la tabla propiedad
ALTER TABLE propiedad 
ADD COLUMN moneda ENUM('USD', 'ARS', 'EUR') DEFAULT 'USD' 
AFTER valor;

-- Actualizar propiedades existentes (opcional: puedes cambiar el valor por defecto)
UPDATE propiedad SET moneda = 'USD' WHERE moneda IS NULL;
