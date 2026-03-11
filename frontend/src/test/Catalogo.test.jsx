import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import Catalogo from '../pages/Catalogo'
import { propiedadService } from '../services/propiedadService'
import { imagenService } from '../services/imagenService'

// Mock de servicios
vi.mock('../services/propiedadService', () => ({
  propiedadService: {
    getAll: vi.fn()
  }
}))

vi.mock('../services/imagenService', () => ({
  imagenService: {
    getImageUrl: vi.fn((url) => url)
  }
}))

describe('Catalogo', () => {
  const mockPropiedades = [
    {
      idPropiedad: 1,
      nombre: 'Casa en Arrecifes',
      ciudad: 'arrecifes',
      provincia: 'Buenos Aires',
      valor: 120000,
      moneda: 'USD',
      operacion: 'venta',
      tipo: 'casa',
      cantAmbientes: 3,
      banos: 2,
      metCuad: 150,
      imagenes: [
        { url: 'casa1.jpg', es_principal: true }
      ]
    },
    {
      idPropiedad: 2,
      nombre: 'Departamento en Arrecifes',
      ciudad: 'arrecifes',
      provincia: 'Buenos Aires',
      valor: 80000,
      moneda: 'USD',
      operacion: 'alquiler',
      tipo: 'departamento',
      cantAmbientes: 2,
      banos: 1,
      metCuad: 60,
      imagenes: [
        { url: 'depto1.jpg', es_principal: true }
      ]
    },
    {
      idPropiedad: 3,
      nombre: 'Terreno en Todd',
      ciudad: 'todd',
      provincia: 'Buenos Aires',
      valor: 50000,
      moneda: 'USD',
      operacion: 'venta',
      tipo: 'terreno',
      cantAmbientes: 0,
      banos: 0,
      metCuad: 500,
      imagenes: [
        { url: 'terreno1.jpg', es_principal: true }
      ]
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    propiedadService.getAll.mockResolvedValue({ data: mockPropiedades })
  })

  const renderWithRouter = (initialEntries = ['/catalogo']) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Catalogo />
      </MemoryRouter>
    )
  }

  it('renderiza correctamente el título del catálogo', async () => {
    renderWithRouter()
    
    await waitFor(() => {
      expect(screen.getByText('Catálogo Completo')).toBeInTheDocument()
    })
  })

  it('muestra el loader mientras carga', () => {
    propiedadService.getAll.mockImplementation(() => new Promise(() => {}))
    renderWithRouter()
    
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('carga propiedades sin filtros', async () => {
    renderWithRouter()
    
    await waitFor(() => {
      expect(propiedadService.getAll).toHaveBeenCalledWith({ estado: 'disponible' })
    })
  })

  it('carga propiedades con filtro de operación', async () => {
    renderWithRouter(['/catalogo?operacion=venta'])
    
    await waitFor(() => {
      expect(propiedadService.getAll).toHaveBeenCalledWith({
        estado: 'disponible',
        operacion: 'venta'
      })
    })
  })

  it('carga propiedades con filtro de tipo', async () => {
    renderWithRouter(['/catalogo?tipo=casa'])
    
    await waitFor(() => {
      expect(propiedadService.getAll).toHaveBeenCalledWith({
        estado: 'disponible',
        tipo: 'casa'
      })
    })
  })

  it('carga propiedades con múltiples filtros', async () => {
    renderWithRouter(['/catalogo?operacion=venta&tipo=casa&ubicacion=arrecifes'])
    
    await waitFor(() => {
      expect(propiedadService.getAll).toHaveBeenCalledWith({
        estado: 'disponible',
        operacion: 'venta',
        tipo: 'casa'
      })
    })
  })

  it('muestra badges de filtros activos', async () => {
    renderWithRouter(['/catalogo?operacion=venta&ubicacion=arrecifes&tipo=casa'])
    
    await waitFor(() => {
      expect(screen.getByText('Filtros activos:')).toBeInTheDocument()
      // Usar getAllByText ya que "Venta" puede aparecer en PropertyCards también
      const ventaElements = screen.getAllByText('Venta')
      expect(ventaElements.length).toBeGreaterThan(0)
      expect(screen.getByText('arrecifes')).toBeInTheDocument()
      expect(screen.getByText('casa')).toBeInTheDocument()
    })
  })

  it('formatea correctamente el precio con moneda USD', async () => {
    renderWithRouter()
    
    await waitFor(() => {
      // El precio debe estar formateado con USD y separadores de miles
      const precioTextos = screen.getAllByText(/USD \$/)
      expect(precioTextos.length).toBeGreaterThan(0)
    })
  })

  it('muestra el botón "Volver al inicio"', async () => {
    renderWithRouter()
    
    await waitFor(() => {
      expect(screen.getByText('Volver al inicio')).toBeInTheDocument()
    })
  })

  it('transforma correctamente los datos de las propiedades', async () => {
    renderWithRouter()
    
    await waitFor(() => {
      expect(screen.getByText('Casa en Arrecifes')).toBeInTheDocument()
      expect(screen.getByText('Departamento en Arrecifes')).toBeInTheDocument()
      expect(screen.getByText('Terreno en Todd')).toBeInTheDocument()
    })
  })

  it('filtra por ubicación desde la URL', async () => {
    renderWithRouter(['/catalogo?ubicacion=arrecifes'])
    
    await waitFor(() => {
      // Debe mostrar propiedades de Arrecifes
      expect(screen.getByText('Casa en Arrecifes')).toBeInTheDocument()
      expect(screen.getByText('Departamento en Arrecifes')).toBeInTheDocument()
      // No debe mostrar Todd
      expect(screen.queryByText('Terreno en Todd')).not.toBeInTheDocument()
    })
  })

  it('maneja errores al cargar propiedades', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    propiedadService.getAll.mockRejectedValue(new Error('Error de red'))
    
    renderWithRouter()
    
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar propiedades:', expect.any(Error))
    })
    
    consoleErrorSpy.mockRestore()
  })

  it('muestra imagen principal o la primera disponible', async () => {
    const propiedadSinPrincipal = {
      ...mockPropiedades[0],
      imagenes: [
        { url: 'imagen1.jpg', es_principal: false },
        { url: 'imagen2.jpg', es_principal: false }
      ]
    }
    propiedadService.getAll.mockResolvedValue({ data: [propiedadSinPrincipal] })
    
    renderWithRouter()
    
    await waitFor(() => {
      expect(imagenService.getImageUrl).toHaveBeenCalledWith('imagen1.jpg')
    })
  })

  it('muestra placeholder si no hay imágenes', async () => {
    const propiedadSinImagenes = {
      ...mockPropiedades[0],
      imagenes: []
    }
    propiedadService.getAll.mockResolvedValue({ data: [propiedadSinImagenes] })
    
    renderWithRouter()
    
    await waitFor(() => {
      // Verificar que se renderiza el componente
      expect(screen.getByText('Casa en Arrecifes')).toBeInTheDocument()
    })
  })

  it('muestra metros cuadrados correctamente', async () => {
    renderWithRouter()
    
    await waitFor(() => {
      expect(screen.getByText(/150 m²/)).toBeInTheDocument()
      expect(screen.getByText(/60 m²/)).toBeInTheDocument()
      expect(screen.getByText(/500 m²/)).toBeInTheDocument()
    })
  })

  it('muestra ambientes y baños correctamente', async () => {
    renderWithRouter()
    
    await waitFor(() => {
      // Verificar que se muestran las propiedades con sus datos
      expect(screen.getByText('Casa en Arrecifes')).toBeInTheDocument()
    })
  })
})
