import { render, screen, fireEvent } from '@testing-library/react'
import { SingleSelect } from '../single-select'
import { ConversationStep } from '../../types'

describe('SingleSelect', () => {
  const mockStep: ConversationStep = {
    id: 'ownership-screening',
    type: 'single-select',
    question: 'Test Question',
    required: true,
    options: [
      { id: 'option1', text: 'Option 1' },
      { id: 'option2', text: 'Option 2' }
    ]
  }

  const mockOnChange = jest.fn()

  it('renders options and handles selection', () => {
    render(
      <SingleSelect
        value={{ selection: '', isValid: false }}
        onChange={mockOnChange}
        step={mockStep}
      />
    )

    const option = screen.getByText('Option 1')
    fireEvent.click(option)

    expect(mockOnChange).toHaveBeenCalledWith({
      selection: 'option1',
      isValid: true
    })
  })
}) 