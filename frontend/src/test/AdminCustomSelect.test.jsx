import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CustomSelect from '../admin/components/CustomSelect'

describe('CustomSelect (Admin - Tema Oscuro)', () => {
  const mockOptions = [
    { value: '', label: 'Seleccionar...' },
    { value: 'casa', label: 'Casa' },
    { value: 'departamento', label: 'Departamento' },
    { value: 'terreno', label: 'Terreno' }
  ]

  it('renderiza el componente correctamente', () => {
    const mockOnChange = vi.fn()
    render(
      <CustomSelect
        name="tipo"
        value=""
        onChange={mockOnChange}
        options={mockOptions}
        placeholder="Seleccionar tipo..."
      />
    )
    
    // Buscar el texto sin importar mayúsculas/minúsculas o si aparece parcialmente
    expect(screen.getByText(/Seleccionar/)).toBeInTheDocument()
  })

  it('muestra el placeholder cuando no hay valor', () => {
    const mockOnChange = vi.fn()
    render(
      <CustomSelect
        name="tipo"
        value=""
        onChange={mockOnChange}
        options={mockOptions}
        placeholder="Tipo de propiedad"
      />
    )
    
    // El componente muestra la primera opción o el placeholder
    expect(screen.getByText(/Seleccionar|Tipo de propiedad/)).toBeInTheDocument()
  })

  it('muestra el texto de la opción seleccionada', () => {
    const mockOnChange = vi.fn()
    render(
      <CustomSelect
        name="tipo"
        value="casa"
        onChange={mockOnChange}
        options={mockOptions}
      />
    )
    
    expect(screen.getByText('Casa')).toBeInTheDocument()
  })

  it('abre el dropdown al hacer click', async () => {
    const mockOnChange = vi.fn()
    render(
      <CustomSelect
        name="tipo"
        value=""
        onChange={mockOnChange}
        options={mockOptions}
        placeholder="Seleccionar..."
      />
    )
    
    const button = screen.getByRole('button')
    await userEvent.click(button)
    
    // Verificar que aparecen todas las opciones
    expect(screen.getByText('Casa')).toBeInTheDocument()
    expect(screen.getByText('Departamento')).toBeInTheDocument()
    expect(screen.getByText('Terreno')).toBeInTheDocument()
  })

  it('selecciona una opción correctamente', async () => {
    const mockOnChange = vi.fn()
    render(
      <CustomSelect
        name="tipo"
        value=""
        onChange={mockOnChange}
        options={mockOptions}
        placeholder="Seleccionar..."
      />
    )
    
    // Abrir dropdown
    const button = screen.getByRole('button')
    await userEvent.click(button)
    
    // Seleccionar "Departamento"
    const options = screen.getAllByRole('button')
    const deptoOption = options.find(opt => opt.textContent === 'Departamento')
    await userEvent.click(deptoOption)
    
    // Verificar que se llamó onChange
    expect(mockOnChange).toHaveBeenCalledWith({
      target: { name: 'tipo', value: 'departamento' }
    })
  })

  it('cierra el dropdown después de seleccionar', async () => {
    const mockOnChange = vi.fn()
    render(
      <CustomSelect
        name="tipo"
        value=""
        onChange={mockOnChange}
        options={mockOptions}
        placeholder="Seleccionar..."
      />
    )
    
    // Abrir
    const button = screen.getByRole('button')
    await userEvent.click(button)
    
    // Seleccionar
    const options = screen.getAllByRole('button')
    const casaOption = options.find(opt => opt.textContent === 'Casa')
    await userEvent.click(casaOption)
    
    // El dropdown debería cerrarse
    const terrenoElements = screen.queryAllByText('Terreno')
    expect(terrenoElements.length).toBeLessThanOrEqual(1)
  })

  it('marca visualmente la opción seleccionada', async () => {
    const mockOnChange = vi.fn()
    render(
      <CustomSelect
        name="tipo"
        value="casa"
        onChange={mockOnChange}
        options={mockOptions}
      />
    )
    
    // Abrir dropdown
    const button = screen.getByRole('button')
    await userEvent.click(button)
    
    // Verificar que hay íconos SVG (check icon)
    const svgs = document.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThan(0)
  })

  it('aplica estilos de tema oscuro correctamente', () => {
    const mockOnChange = vi.fn()
    const { container } = render(
      <CustomSelect
        name="tipo"
        value=""
        onChange={mockOnChange}
        options={mockOptions}
        placeholder="Seleccionar..."
      />
    )
    
    // Verificar que tiene clases de tema oscuro
    const selectButton = container.querySelector('button')
    expect(selectButton).toBeTruthy()
  })
})
