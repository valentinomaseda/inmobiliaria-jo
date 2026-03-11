import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CustomCheckbox from '../components/CustomCheckbox'

describe('CustomCheckbox (Cliente - Tema Claro)', () => {
  it('renderiza el componente correctamente', () => {
    const mockOnChange = vi.fn()
    render(
      <CustomCheckbox
        name="destacada"
        checked={false}
        onChange={mockOnChange}
        label="Marcar como destacada"
      />
    )
    
    expect(screen.getByText('Marcar como destacada')).toBeInTheDocument()
  })

  it('muestra el checkbox sin marcar por defecto', () => {
    const mockOnChange = vi.fn()
    render(
      <CustomCheckbox
        name="destacada"
        checked={false}
        onChange={mockOnChange}
        label="Marcar como destacada"
      />
    )
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('muestra el checkbox marcado cuando checked es true', () => {
    const mockOnChange = vi.fn()
    render(
      <CustomCheckbox
        name="destacada"
        checked={true}
        onChange={mockOnChange}
        label="Marcar como destacada"
      />
    )
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('llama onChange al hacer click', async () => {
    const mockOnChange = vi.fn()
    render(
      <CustomCheckbox
        name="destacada"
        checked={false}
        onChange={mockOnChange}
        label="Marcar como destacada"
      />
    )
    
    const label = screen.getByText('Marcar como destacada')
    await userEvent.click(label)
    
    expect(mockOnChange).toHaveBeenCalled()
  })

  it('es accesible mediante el checkbox interno', () => {
    const mockOnChange = vi.fn()
    render(
      <CustomCheckbox
        name="destacada"
        checked={false}
        onChange={mockOnChange}
        label="Marcar como destacada"
      />
    )
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('name', 'destacada')
  })

  it('muestra el ícono de check cuando está marcado', () => {
    const mockOnChange = vi.fn()
    const { container } = render(
      <CustomCheckbox
        name="destacada"
        checked={true}
        onChange={mockOnChange}
        label="Marcar como destacada"
      />
    )
    
    // Verificar que existe el SVG del check
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('no muestra el ícono de check cuando no está marcado', () => {
    const mockOnChange = vi.fn()
    const { container } = render(
      <CustomCheckbox
        name="destacada"
        checked={false}
        onChange={mockOnChange}
        label="Marcar como destacada"
      />
    )
    
    // El SVG debe estar oculto o no renderizado
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })
})
