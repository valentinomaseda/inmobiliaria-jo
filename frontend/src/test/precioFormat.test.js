import { describe, it, expect } from 'vitest'

// Funciones extraídas del componente AdminPropiedadForm
const formatearPrecio = (valor) => {
  const numero = valor.toString().replace(/[^0-9]/g, '');
  if (!numero) return '';
  return numero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const limpiarPrecio = (valor) => {
  return valor.toString().replace(/[^0-9]/g, '');
};

describe('Funciones de formateo de precio', () => {
  describe('formatearPrecio', () => {
    it('formatea números grandes con separadores de miles', () => {
      expect(formatearPrecio('120000')).toBe('120.000')
      expect(formatearPrecio('1500000')).toBe('1.500.000')
      expect(formatearPrecio('50000000')).toBe('50.000.000')
    })

    it('formatea números pequeños sin separadores', () => {
      expect(formatearPrecio('500')).toBe('500')
      expect(formatearPrecio('99')).toBe('99')
    })

    it('maneja strings con puntos ya formateados', () => {
      expect(formatearPrecio('120.000')).toBe('120.000')
      expect(formatearPrecio('1.500.000')).toBe('1.500.000')
    })

    it('retorna string vacío para valores vacíos', () => {
      expect(formatearPrecio('')).toBe('')
      expect(formatearPrecio('0')).toBe('0')
    })

    it('elimina caracteres no numéricos antes de formatear', () => {
      expect(formatearPrecio('120abc000')).toBe('120.000')
      expect(formatearPrecio('$150000')).toBe('150.000')
      expect(formatearPrecio('1,500,000')).toBe('1.500.000')
    })

    it('maneja números como strings', () => {
      expect(formatearPrecio('1000000')).toBe('1.000.000')
    })

    it('maneja números de diferentes longitudes', () => {
      expect(formatearPrecio('1234')).toBe('1.234')
      expect(formatearPrecio('12345')).toBe('12.345')
      expect(formatearPrecio('123456')).toBe('123.456')
      expect(formatearPrecio('1234567')).toBe('1.234.567')
    })
  })

  describe('limpiarPrecio', () => {
    it('elimina todos los caracteres no numéricos', () => {
      expect(limpiarPrecio('120.000')).toBe('120000')
      expect(limpiarPrecio('1.500.000')).toBe('1500000')
    })

    it('elimina símbolos de moneda', () => {
      expect(limpiarPrecio('$120.000')).toBe('120000')
      expect(limpiarPrecio('€1.500.000')).toBe('1500000')
    })

    it('elimina letras', () => {
      expect(limpiarPrecio('120abc000')).toBe('120000')
      expect(limpiarPrecio('USD 150,000')).toBe('150000')
    })

    it('mantiene solo los dígitos', () => {
      expect(limpiarPrecio('1-2-3-4-5-6')).toBe('123456')
      expect(limpiarPrecio('(123) 456')).toBe('123456')
    })

    it('maneja strings vacíos', () => {
      expect(limpiarPrecio('')).toBe('')
    })

    it('maneja números puros', () => {
      expect(limpiarPrecio('123456')).toBe('123456')
    })

    it('elimina espacios', () => {
      expect(limpiarPrecio('120 000')).toBe('120000')
      expect(limpiarPrecio('1 500 000')).toBe('1500000')
    })
  })

  describe('Integración formatear y limpiar', () => {
    it('limpiar y luego formatear produce resultado consistente', () => {
      const entrada = '1.500.000'
      const limpio = limpiarPrecio(entrada)
      const formateado = formatearPrecio(limpio)
      
      expect(limpio).toBe('1500000')
      expect(formateado).toBe('1.500.000')
    })

    it('ciclo completo: input del usuario -> limpieza -> formato', () => {
      const inputUsuario = '$120,000.50'
      const limpio = limpiarPrecio(inputUsuario)
      const formateado = formatearPrecio(limpio)
      
      expect(limpio).toBe('12000050')
      expect(formateado).toBe('12.000.050')
    })

    it('mantiene consistencia al re-formatear valores ya formateados', () => {
      const valor1 = formatearPrecio('150000')
      const valor2 = formatearPrecio(limpiarPrecio(valor1))
      
      expect(valor1).toBe(valor2)
      expect(valor1).toBe('150.000')
    })
  })
})
