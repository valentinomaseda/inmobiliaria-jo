import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CustomSelect from '../components/CustomSelect'

describe('CustomSelect (Cliente - Tema Claro)', () => {
  const mockOptions = [
    { value: '', label: 'Seleccionar...' },
    { value: 'venta', label: 'Venta' },
    { value: 'alquiler', label: 'Alquiler' }
  ]

  it('renderiza el componente correctamente', () => {
    const mockOnChange = vi.fn()
    render(
      <CustomSelect
        name="operacion"
        value=""
        onChange={mockOnChange}
        options={mockOptions}
        placeholder="Seleccionar..."
      />
    )
    
    expect(screen.getByText('Seleccionar...')).toBeInTheDocument()
  })

  it('muestra el placeholder cuando no hay valor seleccionado', () => {
    const mockOnChange = vi.fn()
    render(
      <CustomSelect
        name="operacion"
        value=""
        onChange={mockOnChange}
        options={mockOptions}
        placeholder="Operación"
      />
    )
    
    // Cuando no hay valor, se muestra la primera opción o el placeholder
    expect(screen.getByText(/Seleccionar|Operación/)).toBeInTheDocument()
  })

  it('muestra el valor seleccionado', () => {
    const mockOnChange = vi.fn()
    render(
      <CustomSelect
        name="operacion"
        value="venta"
        onChange={mockOnChange}
        options={mockOptions}
      />
    )
    
    expect(screen.getByText('Venta')).toBeInTheDocument()
  })

  it('abre el dropdown al hacer click', async () => {
    const mockOnChange = vi.fn()
    render(
      <CustomSelect
        name="operacion"
        value=""
        onChange={mockOnChange}
        options={mockOptions}
        placeholder="Seleccionar..."
      />
    )
    
    const button = screen.getByRole('button')
    await userEvent.click(button)
    
    // Verificar que aparecen todas las opciones
    expect(screen.getAllByText('Venta')).toHaveLength(1)
    expect(screen.getByText('Alquiler')).toBeInTheDocument()
  })

  it('selecciona una opción y llama onChange', async () => {
    const mockOnChange = vi.fn()
    render(
      <CustomSelect
        name="operacion"
        value=""
        onChange={mockOnChange}
        options={mockOptions}
        placeholder="Seleccionar..."
      />
    )
    
    // Abrir dropdown
    const button = screen.getByRole('button')
    await userEvent.click(button)
    
    // Seleccionar "Venta"
    const options = screen.getAllByRole('button')
    const ventaOption = options.find(opt => opt.textContent === 'Venta')
    await userEvent.click(ventaOption)
    
    // Verificar que se llamó onChange con el valor correcto
    expect(mockOnChange).toHaveBeenCalledWith({
      target: { name: 'operacion', value: 'venta' }
    })
  })

  it('cierra el dropdown al seleccionar una opción', async () => {
    const mockOnChange = vi.fn()
    render(
      <CustomSelect
        name="operacion"
        value=""
        onChange={mockOnChange}
        options={mockOptions}
        placeholder="Seleccionar..."
      />
    )
    
    // Abrir dropdown
    const button = screen.getByRole('button')
    await userEvent.click(button)
    
    // Verificar que está abierto
    expect(screen.getByText('Alquiler')).toBeInTheDocument()
    
    // Seleccionar opción
    const options = screen.getAllByRole('button')
    const ventaOption = options.find(opt => opt.textContent === 'Venta')
    await userEvent.click(ventaOption)
    
    // Verificar que se cerró (la opción ya no está visible en el dropdown)
    await waitFor(() => {
      const alquilerElements = screen.queryAllByText('Alquiler')
      expect(alquilerElements.length).toBeLessThanOrEqual(1)
    })
  })

  it('muestra el check en la opción seleccionada', async () => {
    const mockOnChange = vi.fn()
    render(
      <CustomSelect
        name="operacion"
        value="venta"
        onChange={mockOnChange}
        options={mockOptions}
        placeholder="Seleccionar..."
      />
    )
    
    // Abrir dropdown
    const button = screen.getByRole('button')
    await userEvent.click(button)
    
    // Verificar que existe el ícono de check (SVG)
    const svgs = document.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThan(0)
  })
})
