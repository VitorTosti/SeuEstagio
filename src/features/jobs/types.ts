export type Internship = {
  id: string
  role: string
  company: string
  city: string
  modality: 'Presencial' | 'Híbrido' | 'Remoto'
  pay: string
  tags: string[]
  benefits: string[]
  featured: boolean
  logo: string
  logoTone: 'blue' | 'green' | 'yellow' | 'red' | 'teal' | 'ink'
}
