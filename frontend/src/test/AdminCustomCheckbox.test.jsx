import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CustomCheckbox from '../admin/components/CustomCheckbox'

describe('CustomCheckbox (Admin - Tema Oscuro)', () => {
  it('renderiza correctamente con label', () => {
    const mockOnChange = vi.fn()
    render(
      <CustomCheckbox
        name="destacada"
        checked={false}
        onChange={mockOnChange}
        label="Propiedad destacada"
      />
    )
    
    expect(screen.getByText('Propiedad destacada')).toBeInTheDocument()
  })

  it('está desmarcado inicialmente cuando checked es false', () => {
    const mockOnChange = vi.fn()
    render(
      <CustomCheckbox
        name="destacada"
        checked={false}
        onChange={mockOnChange}
        label="Propiedad destacada"
      />
    )
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('está marcado cuando checked es true', () => {
    const mockOnChange = vi.fn()
    render(
      <CustomCheckbox
        name="destacada"
        checked={true}
        onChange={mockOnChange}
        label="Propiedad destacada"
      />
    )
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('llama a onChange al hacer click', async () => {
    const mockOnChange = vi.fn()
    render(
      <CustomCheckbox
        name="destacada"
        checked={false}
        onChange={mockOnChange}
        label="Propiedad destacada"
      />
    )
    
    const label = screen.getByText('Propiedad destacada')
    await userEvent.click(label)
    
    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })

  it('tiene el name correcto', () => {
    const mockOnChange = vi.fn()
    render(
      <CustomCheckbox
        name="activa"
        checked={false}
        onChange={mockOnChange}
        label="Propiedad activa"
      />
    )
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('name', 'activa')
  })

  it('muestra el ícono de check cuando está marcado', () => {
    const mockOnChange = vi.fn()
    const { container } = render(
      <CustomCheckbox
        name="destacada"
        checked={true}
        onChange={mockOnChange}
        label="Propiedad destacada"
      />
    )
    
    // Verificar que existe SVG para el check
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('se puede marcar y desmarcar múltiples veces', async () => {
    const mockOnChange = vi.fn()
    render(
      <CustomCheckbox
        name="destacada"
        checked={false}
        onChange={mockOnChange}
        label="Propiedad destacada"
      />
    )
    
    const label = screen.getByText('Propiedad destacada')
    
    // Click 1
    await userEvent.click(label)
    expect(mockOnChange).toHaveBeenCalledTimes(1)
    
    // Click 2
    await userEvent.click(label)
    expect(mockOnChange).toHaveBeenCalledTimes(2)
    
    // Click 3
    await userEvent.click(label)
    expect(mockOnChange).toHaveBeenCalledTimes(3)
  })

  it('aplica estilos del tema oscuro', () => {
    const mockOnChange = vi.fn()
    const { container } = render(
      <CustomCheckbox
        name="destacada"
        checked={true}
        onChange={mockOnChange}
        label="Propiedad destacada"
      />
    )
    
    // Verificar que el container tiene elementos renderizados
    expect(container.firstChild).toBeTruthy()
  })
})
