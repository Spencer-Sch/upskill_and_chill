import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event"
import { render, screen } from '@testing-library/react'
import Todo from '@/app/todo/page'

describe('Todo component UI and functionality', () => {
  it('should set text inside textName correctly', async () => {
    // setup user
    const user = userEvent.setup()
    // render component
    render(<Todo />)
    // target the input (taskName)
    const taskNameInput = screen.getByLabelText('Task')
    // enter text
    await user.type(taskNameInput, 'Pickup groceries')
    // check that text is set correctly
    expect(taskNameInput).toHaveValue('Pickup groceries')
  })
})