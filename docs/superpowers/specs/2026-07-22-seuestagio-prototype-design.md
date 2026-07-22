# SeuEstagio React Prototype Design

## Objective

Transform the approved Superdesign landing page into a polished React application that can be versioned on GitHub and published through GitHub Pages. The first release is a frontend prototype for university students looking for internship opportunities.

## Product Scope

The prototype presents SeuEstagio as a Brazilian internship discovery platform. It must preserve the approved green and deep-teal visual identity, Portuguese copy, responsive layout, and realistic internship data.

This release includes:

- Responsive landing page matching the approved Superdesign draft.
- Search by course or role and city using local mock data.
- Featured internship cards with company, modality, location, pay, benefits, and application state.
- Save and unsave interactions stored in browser local storage.
- Student and company benefit sections.
- Social proof, platform metrics, FAQ accordion, closing CTA, and footer.
- Accessible keyboard navigation, visible focus states, semantic landmarks, and useful labels.
- GitHub Pages deployment workflow and project documentation.

This release does not include:

- Real authentication or account creation.
- Backend, database, or employer dashboard.
- Real job applications, WhatsApp alerts, or AI screening.
- Payments, subscriptions, or production analytics.

## Architecture

Use React 19, TypeScript, and Vite. The page is a single route composed of focused components. Static copy and internship records live in typed data modules. Search and saved-job behavior are isolated in small hooks and pure utility functions so they can be tested without a browser.

The application remains frontend-only and deploys as static assets. Vite uses a relative base path so the same build works on GitHub Pages regardless of repository name.

## Component Boundaries

- `App`: assembles sections and owns search state.
- `Header`: responsive navigation and primary account action.
- `HeroSearch`: headline, search fields, popular searches, and suggested jobs preview.
- `JobCard`: reusable, scan-friendly internship summary with save and apply actions.
- `HowItWorks`: three-step student journey.
- `FeaturedJobs`: filtered opportunity collection and empty state.
- `AudienceBenefits`: separate student and employer value propositions.
- `SocialProof`: testimonial and platform metrics.
- `Faq`: keyboard-accessible disclosure controls.
- `ClosingCta` and `Footer`: conversion and supporting navigation.

## Data And Interactions

Internship records use a typed `Internship` model containing id, role, company, city, modality, pay, benefits, logo treatment, and featured status. Search is case-insensitive and accent-insensitive across role, company, city, and tags.

Submitting the hero search scrolls to the featured-jobs section and displays matching records. When no record matches, the section shows a concise empty state and a reset action. Popular-search links populate the role field and run the same filtering behavior.

Saving a vacancy toggles its id in local storage. Application and account CTAs remain prototype actions: they open an accessible dialog explaining that the feature will be available in the next product phase. No user data is transmitted.

FAQ items use native buttons with `aria-expanded` and associated content regions. One item may be open at a time.

## Visual System

Follow `.superdesign/design-system.md` and the approved refined draft. Use a white base, ink and deep-teal typography, primary green actions, pale mint and cyan supporting surfaces, and a restrained warm-yellow accent. Cards use a maximum 8px radius, subtle borders, and limited shadows.

The desktop hero uses copy and search on the left with a product preview on the right. Mobile stacks the search and a compact two-card vacancies preview before the trust strip. The layout must have no horizontal overflow at 390px and must remain readable through large desktop widths.

Use Lucide React icons. The product wordmark is rendered as accessible text with a simple graduation-cap icon so no custom logo asset is required for the prototype.

## Error And Empty States

- Invalid or empty searches show all vacancies rather than blocking the user.
- Search with no matches shows a resettable empty state.
- Local-storage access failures fall back to in-memory saved state without breaking rendering.
- Missing optional job metadata is omitted rather than displayed as an empty label.

## Testing

- Unit tests cover accent-insensitive search, combined role/city filtering, empty criteria, and saved-id persistence helpers.
- Component tests cover search submission, result updates, empty-state reset, save toggling, FAQ behavior, and the prototype dialog.
- Production build must complete without TypeScript errors.
- Browser verification covers desktop and 390px mobile layouts, horizontal overflow, visible hero content, interactions, and console errors.

## Delivery

The repository includes source code, tests, `.gitignore`, README instructions, and a GitHub Actions workflow that publishes the `dist` output to GitHub Pages. The final handoff includes local development commands and the steps required to connect and push a GitHub repository.
