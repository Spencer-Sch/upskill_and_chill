import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '@/app/page'
 
describe('Homepage renders completely', () => {
  it('renders a heading', () => {
    render(<Page />)
    
    const main = screen.getByRole('main')
    
    expect(main).toBeInTheDocument()
  })
  it('renders two links', () => {
    render(<Page />)

    const links = screen.getAllByRole('link')

    for (const link of links) expect(link).toBeInTheDocument()
  })
})