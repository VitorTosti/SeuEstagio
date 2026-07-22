import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import App from './App'

test('introduces SeuEstagio to university students', () => {
  render(<App />)
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: 'Seu estágio começa aqui.',
    }),
  ).toBeInTheDocument()
})
