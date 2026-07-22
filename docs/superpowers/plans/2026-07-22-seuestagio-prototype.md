# SeuEstagio Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved SeuEstagio landing-page prototype as a tested React application that is ready for GitHub and GitHub Pages.

**Architecture:** A single-page Vite application composes focused React sections around typed internship data. Pure search and persistence utilities hold behavior outside the UI, while component tests cover the student-facing workflow. Static assets are built with a relative base path for repository-independent GitHub Pages deployment.

**Tech Stack:** React 19.2.8, TypeScript 7.0.2, Vite 8.1.5, Vitest 4.1.10, Testing Library 16.3.2, jsdom 29.1.1, Lucide React 1.25.0, and one global CSS stylesheet organized by component.

## Global Constraints

- All visible product copy is Brazilian Portuguese.
- Preserve the approved Superdesign hierarchy and `.superdesign/design-system.md` tokens.
- Keep card radii at 8px or less and avoid decorative gradients, purple, and nested cards.
- The application must have no horizontal overflow at a 390px viewport.
- Search is case-insensitive and accent-insensitive.
- No backend, real authentication, real application submission, payments, or analytics.
- Prototype-only actions open an accessible explanatory dialog and transmit no data.
- Vite must use `base: './'` so the same build works under any GitHub Pages repository path.

---

### Task 1: Testable Vite Foundation

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/test/setup.ts`
- Create: `src/App.test.tsx`
- Create: `.gitignore`

**Interfaces:**
- Produces: a `React.StrictMode` entry point and default `App` component.
- Produces: `npm run dev`, `npm run test`, and `npm run build` commands.

- [ ] **Step 1: Create package and compiler configuration**

Use exact runtime dependencies and compatible test tooling:

```json
{
  "name": "seuestagio",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "lucide-react": "1.25.0",
    "react": "19.2.8",
    "react-dom": "19.2.8"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "7.0.0",
    "@testing-library/react": "16.3.2",
    "@testing-library/user-event": "14.6.1",
    "@types/react": "^19.2.0",
    "@types/react-dom": "^19.2.0",
    "@vitejs/plugin-react": "6.0.4",
    "jsdom": "29.1.1",
    "typescript": "7.0.2",
    "vite": "8.1.5",
    "vitest": "4.1.10"
  }
}
```

Configure `vite.config.ts` with `base: './'`, the React plugin, and Vitest `environment: 'jsdom'` plus `setupFiles: './src/test/setup.ts'`. Configure TypeScript with strict mode, `noEmit`, modern DOM libraries, and project references for app and Vite config.

- [ ] **Step 2: Install dependencies**

Run: `npm install`

Expected: exit code 0 and a generated `package-lock.json`.

- [ ] **Step 3: Write the failing application smoke test**

```tsx
import { render, screen } from '@testing-library/react'
import App from './App'

test('introduces SeuEstagio to university students', () => {
  render(<App />)
  expect(screen.getByRole('heading', { level: 1, name: 'Seu estágio começa aqui.' })).toBeInTheDocument()
})
```

- [ ] **Step 4: Run the smoke test and verify RED**

Run: `npm test -- src/App.test.tsx`

Expected: FAIL because `src/App.tsx` does not exist yet.

- [ ] **Step 5: Add the minimal application shell**

```tsx
export default function App() {
  return (
    <main>
      <h1>Seu estágio começa aqui.</h1>
    </main>
  )
}
```

Create `src/main.tsx` to mount `<App />` inside `React.StrictMode`, and create `index.html` with Portuguese metadata, viewport configuration, and `#root`.

- [ ] **Step 6: Verify GREEN and commit**

Run: `npm test -- src/App.test.tsx`

Expected: 1 passing test.

Run: `git add package.json package-lock.json index.html tsconfig*.json vite.config.ts src .gitignore && git commit -m "chore: scaffold SeuEstagio frontend"`

---

### Task 2: Internship Data And Search

**Files:**
- Create: `src/features/jobs/types.ts`
- Create: `src/features/jobs/jobs.ts`
- Create: `src/features/jobs/filterJobs.ts`
- Create: `src/features/jobs/filterJobs.test.ts`

**Interfaces:**
- Produces: `Internship` type.
- Produces: `internships: Internship[]` with at least six realistic records.
- Produces: `filterJobs(jobs, criteria): Internship[]`.
- Consumes: no React state or browser APIs.

- [ ] **Step 1: Define expected filtering behavior in failing tests**

```ts
import { describe, expect, test } from 'vitest'
import { filterJobs } from './filterJobs'
import type { Internship } from './types'

const jobs: Internship[] = [
  { id: 'design', role: 'Estágio em Design', company: 'Acme', city: 'São Paulo', modality: 'Híbrido', pay: 'R$ 2.000/mês', tags: ['UX'], benefits: [], featured: true },
  { id: 'dados', role: 'Analista de Dados Júnior', company: 'Beta', city: 'Belo Horizonte', modality: 'Remoto', pay: 'R$ 2.400/mês', tags: ['Tecnologia'], benefits: [], featured: true }
]

describe('filterJobs', () => {
  test('returns every job when criteria are empty', () => {
    expect(filterJobs(jobs, { query: '', city: '' })).toEqual(jobs)
  })

  test('matches text without accents or letter case', () => {
    expect(filterJobs(jobs, { query: 'ESTAGIO', city: 'sao paulo' })).toEqual([jobs[0]])
  })

  test('combines role or tag query with city', () => {
    expect(filterJobs(jobs, { query: 'tecnologia', city: 'belo' })).toEqual([jobs[1]])
  })
})
```

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test -- src/features/jobs/filterJobs.test.ts`

Expected: FAIL because the modules are missing.

- [ ] **Step 3: Implement the typed model and pure filter**

```ts
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
}
```

```ts
import type { Internship } from './types'

export type JobCriteria = { query: string; city: string }

const normalize = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim()

export function filterJobs(jobs: Internship[], criteria: JobCriteria) {
  const query = normalize(criteria.query)
  const city = normalize(criteria.city)

  return jobs.filter((job) => {
    const searchable = normalize([job.role, job.company, ...job.tags].join(' '))
    return (!query || searchable.includes(query)) && (!city || normalize(job.city).includes(city))
  })
}
```

Populate `jobs.ts` with Product Design, Engineering, Data, UX Research, Marketing, and Administration opportunities using the approved companies, Brazilian cities, pay ranges, modalities, tags, and benefits.

- [ ] **Step 4: Verify GREEN and commit**

Run: `npm test -- src/features/jobs/filterJobs.test.ts`

Expected: 3 passing tests.

Run: `git add src/features/jobs && git commit -m "feat: add internship search data"`

---

### Task 3: Saved Jobs And Prototype Actions

**Files:**
- Create: `src/features/saved/savedJobs.ts`
- Create: `src/features/saved/savedJobs.test.ts`
- Create: `src/features/saved/useSavedJobs.ts`
- Create: `src/components/PrototypeDialog.tsx`

**Interfaces:**
- Produces: `readSavedIds(storage): string[]` and `writeSavedIds(storage, ids): void`.
- Produces: `useSavedJobs()` returning `{ savedIds, toggleSaved }`.
- Produces: `PrototypeDialog` with `open`, `title`, `onClose`, and `children` props.

- [ ] **Step 1: Write failing persistence tests**

```ts
import { expect, test } from 'vitest'
import { readSavedIds, writeSavedIds } from './savedJobs'

test('reads only string ids from stored JSON', () => {
  const storage = { getItem: () => '["job-1",42,"job-2"]', setItem: () => undefined }
  expect(readSavedIds(storage)).toEqual(['job-1', 'job-2'])
})

test('falls back to an empty collection for invalid storage', () => {
  const storage = { getItem: () => '{broken', setItem: () => undefined }
  expect(readSavedIds(storage)).toEqual([])
})

test('writes unique saved ids', () => {
  let value = ''
  const storage = { getItem: () => value, setItem: (_key: string, next: string) => { value = next } }
  writeSavedIds(storage, ['job-1', 'job-1', 'job-2'])
  expect(value).toBe('["job-1","job-2"]')
})
```

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test -- src/features/saved/savedJobs.test.ts`

Expected: FAIL because `savedJobs.ts` is missing.

- [ ] **Step 3: Implement resilient persistence and hook behavior**

Use a minimal `StorageLike` interface with `getItem` and `setItem`. Catch read and write failures, filter parsed arrays to strings, deduplicate on write, and keep hook state usable when local storage is unavailable.

Implement `PrototypeDialog` with native `<dialog>`, a descriptive heading, close button, Escape support supplied by the native element, and focus moved into the dialog when opened.

- [ ] **Step 4: Verify GREEN and commit**

Run: `npm test -- src/features/saved/savedJobs.test.ts`

Expected: 3 passing tests.

Run: `git add src/features/saved src/components/PrototypeDialog.tsx && git commit -m "feat: add saved jobs and prototype actions"`

---

### Task 4: Complete Landing Page Workflow

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Create: `src/components/Header.tsx`
- Create: `src/components/HeroSearch.tsx`
- Create: `src/components/TrustStrip.tsx`
- Create: `src/components/JobCard.tsx`
- Create: `src/components/FeaturedJobs.tsx`
- Create: `src/components/HowItWorks.tsx`
- Create: `src/components/AudienceBenefits.tsx`
- Create: `src/components/SocialProof.tsx`
- Create: `src/components/Faq.tsx`
- Create: `src/components/ClosingCta.tsx`
- Create: `src/components/Footer.tsx`

**Interfaces:**
- `HeroSearch` consumes `onSearch(criteria)` and exposes labeled query and city fields.
- `FeaturedJobs` consumes `jobs`, `savedIds`, `onToggleSaved`, `onApply`, and `onReset`.
- `JobCard` consumes one `Internship`, `saved`, `onToggleSaved`, and `onApply`.
- `Faq` owns one-open-item disclosure state.

- [ ] **Step 1: Expand the application test with failing user workflows**

```tsx
test('filters vacancies from the hero search', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.type(screen.getByLabelText('Curso ou cargo'), 'dados')
  await user.type(screen.getByLabelText('Cidade'), 'São Paulo')
  await user.click(screen.getByRole('button', { name: 'Encontrar vagas' }))
  expect(screen.getByRole('heading', { name: 'Analista de Dados Júnior' })).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: 'Marketing Digital' })).not.toBeInTheDocument()
})

test('shows and resets an empty search result', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.type(screen.getByLabelText('Curso ou cargo'), 'astronauta')
  await user.click(screen.getByRole('button', { name: 'Encontrar vagas' }))
  expect(screen.getByText('Nenhuma vaga encontrada')).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Limpar busca' }))
  expect(screen.getByRole('heading', { name: 'Marketing Digital' })).toBeInTheDocument()
})

test('opens prototype guidance instead of submitting an application', async () => {
  const user = userEvent.setup()
  render(<App />)
  const vacancy = screen.getByRole('article', { name: 'Analista de Dados Júnior na Microsoft' })
  await user.click(within(vacancy).getByRole('button', { name: 'Candidatura rápida' }))
  expect(screen.getByRole('dialog', { name: 'Recurso em desenvolvimento' })).toBeInTheDocument()
})
```

Import `within` from Testing Library. Add focused tests for save-button accessible names and FAQ `aria-expanded` behavior, always scoping repeated controls to a named vacancy card or FAQ item.

- [ ] **Step 2: Run application tests and verify RED**

Run: `npm test -- src/App.test.tsx`

Expected: FAIL because the page sections and workflows are not implemented.

- [ ] **Step 3: Implement the component tree**

Compose the approved content in this order:

```tsx
<Header onPrototypeAction={openPrototypeDialog} />
<main>
  <HeroSearch suggestedJobs={internships.slice(0, 2)} onSearch={handleSearch} />
  <TrustStrip />
  <HowItWorks />
  <FeaturedJobs jobs={visibleJobs} savedIds={savedIds} onToggleSaved={toggleSaved} onApply={openPrototypeDialog} onReset={resetSearch} />
  <AudienceBenefits onPrototypeAction={openPrototypeDialog} />
  <SocialProof />
  <Faq />
  <ClosingCta onPrototypeAction={openPrototypeDialog} />
</main>
<Footer />
<PrototypeDialog open={dialogOpen} title="Recurso em desenvolvimento" onClose={closePrototypeDialog}>
  Esta ação fará parte da próxima fase do SeuEstagio. Nesta versão, você já pode explorar e salvar vagas.
</PrototypeDialog>
```

Use Lucide icons for search, location, bookmark, graduation cap, building, arrow, check, and close actions. Give every icon-only button an accessible label and title. Use semantic `header`, `nav`, `main`, `section`, `article`, and `footer` elements.

- [ ] **Step 4: Verify GREEN and commit**

Run: `npm test -- src/App.test.tsx`

Expected: all application workflow tests pass.

Run: `git add src && git commit -m "feat: build SeuEstagio landing experience"`

---

### Task 5: Visual System, Publishing, And Final Verification

**Files:**
- Create: `src/styles.css`
- Modify: `src/main.tsx`
- Create: `.github/workflows/deploy-pages.yml`
- Create: `README.md`
- Modify: `.gitignore`
- Add: `.superdesign/design-system.md`

**Interfaces:**
- Produces: responsive CSS custom properties and component classes.
- Produces: GitHub Pages artifact deployment from `npm run build`.
- Produces: setup, testing, build, and publishing instructions.

- [ ] **Step 1: Implement the approved visual system**

Define these root tokens and import the stylesheet from `src/main.tsx`:

```css
:root {
  color: #102a2a;
  background: #ffffff;
  font-family: Inter, Manrope, ui-sans-serif, system-ui, sans-serif;
  font-synthesis: none;
  --ink: #102a2a;
  --teal: #0d5c5a;
  --green: #1b8f5a;
  --green-bright: #42c47a;
  --mint: #eaf7f0;
  --cyan: #eaf6f7;
  --yellow: #f5c451;
  --border: #d8e5e2;
  --muted: #5e7371;
}
```

Implement a maximum 1220px content container, two-column desktop hero, search toolbar, realistic product preview, full-width section bands, scan-friendly job grid, restrained testimonial, FAQ disclosures, and footer. At `max-width: 760px`, stack the hero, keep the compact suggested-jobs preview visible, collapse navigation, make search controls full width, and ensure long popular-search labels remain on one line inside a horizontally scrollable row.

- [ ] **Step 2: Add deployment and repository documentation**

Create a GitHub Actions Pages workflow triggered on pushes to `master` and manual dispatch. It must checkout, set up Node 24 with npm caching, run `npm ci`, run `npm test`, run `npm run build`, upload `dist`, and deploy through the official Pages actions.

Document in `README.md`:

````md
## Desenvolvimento

```bash
npm install
npm run dev
```

## Verificação

```bash
npm test
npm run build
```

## Publicação

Envie a branch `master` ao GitHub e habilite **Settings > Pages > Source: GitHub Actions**. O workflow publica a pasta `dist` automaticamente.
````

- [ ] **Step 3: Run complete automated verification**

Run: `npm test`

Expected: every unit and component test passes with zero failures.

Run: `npm run build`

Expected: TypeScript and Vite complete with exit code 0 and create `dist/`.

- [ ] **Step 4: Run browser verification**

Start: `npm run dev -- --host 127.0.0.1`

Inspect desktop at 1280x800 and mobile at 390x844. Verify:

- Hero, search, and suggested vacancies are visible and correctly ordered.
- Search, reset, save, FAQ, and prototype dialog interactions work.
- `document.documentElement.scrollWidth === document.documentElement.clientWidth` at 390px.
- No clipped text, incoherent overlap, missing icons, blank sections, or console errors.

- [ ] **Step 5: Commit the verified deliverable**

Run: `git add .github .gitignore .superdesign README.md src && git commit -m "feat: finish responsive SeuEstagio prototype"`

Run: `git status --short`

Expected: empty output.
