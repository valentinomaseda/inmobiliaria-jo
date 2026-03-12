-- Migración: Permitir eliminación en cascada de relaciones propiedad-caracteristica
-- Fecha: 2026-03-12
-- Descripción: Cambia ON DELETE RESTRICT a ON DELETE CASCADE para permitir eliminar propiedades con características asignadas

-- Eliminar las constraints existentes
ALTER TABLE `propiedad_caracteristica` 
  DROP FOREIGN KEY `fk_propiedad_caracteristica_propiedad`;

ALTER TABLE `propiedad_caracteristica` 
  DROP FOREIGN KEY `fk_propiedad_caracteristica_caracteristica`;

-- Recrear las constraints con ON DELETE CASCADE
ALTER TABLE `propiedad_caracteristica`
  ADD CONSTRAINT `fk_propiedad_caracteristica_propiedad` 
    FOREIGN KEY (`idPropiedad`) 
    REFERENCES `propiedad` (`idPropiedad`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

ALTER TABLE `propiedad_caracteristica`
  ADD CONSTRAINT `fk_propiedad_caracteristica_caracteristica` 
    FOREIGN KEY (`idCaracteristica`) 
    REFERENCES `caracteristica` (`idCaracteristica`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;
