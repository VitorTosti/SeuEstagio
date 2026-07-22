import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test } from 'vitest'
import App from './App'

beforeEach(() => {
  window.localStorage.clear()
})

test('introduces SeuEstagio to university students', () => {
  render(<App />)
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: 'Seu estágio começa aqui.',
    }),
  ).toBeInTheDocument()
})

test('filters vacancies from the hero search', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.type(screen.getByLabelText('Curso ou cargo'), 'dados')
  await user.type(screen.getByLabelText('Cidade'), 'São Paulo')
  await user.click(screen.getByRole('button', { name: 'Encontrar vagas' }))

  expect(
    screen.getByRole('heading', { name: 'Analista de Dados Júnior' }),
  ).toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: 'Marketing Digital' }),
  ).not.toBeInTheDocument()
})

test('shows and resets an empty search result', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.type(screen.getByLabelText('Curso ou cargo'), 'astronauta')
  await user.click(screen.getByRole('button', { name: 'Encontrar vagas' }))

  expect(screen.getByText('Nenhuma vaga encontrada')).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Limpar busca' }))
  expect(
    screen.getByRole('heading', { name: 'Marketing Digital' }),
  ).toBeInTheDocument()
})

test('saves a vacancy with a descriptive control', async () => {
  const user = userEvent.setup()
  render(<App />)
  const vacancy = screen.getByRole('article', {
    name: 'Analista de Dados Júnior na Microsoft',
  })

  await user.click(
    within(vacancy).getByRole('button', {
      name: 'Salvar Analista de Dados Júnior',
    }),
  )

  expect(
    within(vacancy).getByRole('button', {
      name: 'Remover Analista de Dados Júnior dos favoritos',
    }),
  ).toBeInTheDocument()
})

test('opens prototype guidance instead of submitting an application', async () => {
  const user = userEvent.setup()
  render(<App />)
  const vacancy = screen.getByRole('article', {
    name: 'Analista de Dados Júnior na Microsoft',
  })

  await user.click(
    within(vacancy).getByRole('button', { name: 'Candidatura rápida' }),
  )

  expect(
    screen.getByRole('dialog', { name: 'Recurso em desenvolvimento' }),
  ).toBeInTheDocument()
})

test('expands one frequently asked question', async () => {
  const user = userEvent.setup()
  render(<App />)
  const question = screen.getByRole('button', {
    name: 'Como funciona a validação do estágio?',
  })

  expect(question).toHaveAttribute('aria-expanded', 'false')
  await user.click(question)
  expect(question).toHaveAttribute('aria-expanded', 'true')
  expect(
    screen.getByText(/fornecemos todos os documentos necessários/i),
  ).toBeInTheDocument()
})
