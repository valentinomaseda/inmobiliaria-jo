import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import SearchBar from '../components/SearchBar'

// Mock de useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

describe('SearchBar', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  const renderSearchBar = () => {
    return render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    )
  }

  it('renderiza correctamente todos los elementos', () => {
    renderSearchBar()
    
    expect(screen.getByText('Operación')).toBeInTheDocument()
    expect(screen.getByText('Ubicación')).toBeInTheDocument()
    expect(screen.getByText('Tipo de propiedad')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument()
  })

  it('navega sin parámetros cuando no hay filtros', async () => {
    renderSearchBar()
    
    const buscarBtn = screen.getByRole('button', { name: /buscar/i })
    await userEvent.click(buscarBtn)
    
    expect(mockNavigate).toHaveBeenCalledWith('/catalogo')
  })

  it('navega con un solo filtro seleccionado', async () => {
    renderSearchBar()
    
    // Seleccionar operación
    const operacionButtons = screen.getAllByRole('button')
    const operacionBtn = operacionButtons[0]
    await userEvent.click(operacionBtn)
    
    // Buscar y hacer click en Venta
    const ventaOption = await screen.findByText('Venta')
    await userEvent.click(ventaOption)
    
    // Buscar
    const buscarBtn = screen.getByRole('button', { name: /buscar/i })
    await userEvent.click(buscarBtn)
    
    expect(mockNavigate).toHaveBeenCalledWith('/catalogo?operacion=venta')
  })

  it('navega con múltiples filtros seleccionados', async () => {
    renderSearchBar()
    
    // Seleccionar operación (Venta)
    const buttons = screen.getAllByRole('button')
    await userEvent.click(buttons[0])
    const ventaOption = await screen.findByText('Venta')
    await userEvent.click(ventaOption)
    
    // Seleccionar ubicación (Arrecifes)
    await waitFor(async () => {
      const updatedButtons = screen.getAllByRole('button')
      await userEvent.click(updatedButtons[1])
    })
    const arrecifesOption = await screen.findByText('Arrecifes')
    await userEvent.click(arrecifesOption)
    
    // Seleccionar tipo (Casa)
    await waitFor(async () => {
      const updatedButtons = screen.getAllByRole('button')
      await userEvent.click(updatedButtons[2])
    })
    const casaOption = await screen.findByText('Casa')
    await userEvent.click(casaOption)
    
    // Buscar
    const buscarBtn = screen.getByRole('button', { name: /buscar/i })
    await userEvent.click(buscarBtn)
    
    expect(mockNavigate).toHaveBeenCalledWith('/catalogo?operacion=venta&ubicacion=arrecifes&tipo=casa')
  })

  it('los selects tienen todas las opciones correctas', async () => {
    renderSearchBar()
    
    // Verificar opciones de operación
    const buttons = screen.getAllByRole('button')
    await userEvent.click(buttons[0])
    expect(await screen.findByText('Venta')).toBeInTheDocument()
    expect(screen.getByText('Alquiler')).toBeInTheDocument()
    
    // Presionar Escape para cerrar y limpiar el estado
    await userEvent.keyboard('{Escape}')
    await waitFor(() => {
      // Esperar un momento para que el dropdown se cierre
    }, { timeout: 500 })
    
    // Verificar opciones de ubicación - hacer click en el botón específico
    await waitFor(async () => {
      const allButtons = screen.getAllByRole('button')
      // El segundo botón es el de ubicación (ignorando el de búsqueda al final)
      const ubicacionBtn = allButtons[1]
      await userEvent.click(ubicacionBtn)
    })
    
    // Esperar más tiempo para que las opciones aparezcan
    const arrecifes = await screen.findByText('Arrecifes', {}, { timeout: 2000 })
    expect(arrecifes).toBeInTheDocument()
  })

  it('el botón de búsqueda muestra el ícono correctamente', () => {
    renderSearchBar()
    
    const buscarBtn = screen.getByRole('button', { name: /buscar/i })
    const svg = buscarBtn.querySelector('svg')
    
    expect(svg).toBeInTheDocument()
  })

  it('tiene el ancho máximo correcto (1400px)', () => {
    const { container } = renderSearchBar()
    
    const wrapper = container.querySelector('.max-w-\\[1400px\\]')
    expect(wrapper).toBeInTheDocument()
  })

  it('el select de tipo tiene ancho mínimo de 220px', () => {
    const { container } = renderSearchBar()
    
    const tipoSelect = container.querySelector('.min-w-\\[220px\\]')
    expect(tipoSelect).toBeInTheDocument()
  })
})
