# TinkraZA

**Discover something new in Cape Town.**

TinkraZA is a deployed South African marketplace MVP for discovering creative workshops and hands-on experiences. It brings example listings into a searchable, filterable catalogue and gives customers and local providers a way to register interest while the marketplace is being validated.

**Live demo:** [tinkra-za.vercel.app](https://tinkra-za.vercel.app/) · **Repository:** [JoshHagg/TinkraZA](https://github.com/JoshHagg/TinkraZA)

## MVP scope

The current MVP focuses on the discovery and interest-registration journey:

- Browse a curated catalogue of 15 illustrative Cape Town experiences, with detail pages for each listing.
- Search listings by title, category, description, tags and included items.
- Filter by category and subcategory, price range, occasion and area.
- Register an email to hear if an illustrative experience becomes available.
- Submit provider details and an experience description through a provider-interest form.
- Use the responsive interface on desktop and mobile.

The catalogue is illustrative: providers and availability have not been confirmed, and listings cannot currently be booked. Customer and provider forms save expressions of interest to Supabase. Booking, payment processing, customer accounts and provider management are outside the current MVP.

## Technical overview

- **Frontend:** React 19, TypeScript and Vite
- **Routing:** React Router
- **Styling and UI:** Tailwind CSS 4, Radix UI and Lucide icons
- **Backend:** Supabase (PostgreSQL) using `@supabase/supabase-js`
- **Deployment and analytics:** Vercel, with Vercel Web Analytics configured

Experience catalogue content is currently maintained in the frontend. Supabase stores customer waitlist signups and provider interest submissions. A database migration normalises provider email addresses and enforces uniqueness.

## Run locally

### Requirements

- Node.js 22.13 or newer
- npm
- A Supabase project with the tables used by the app: `waitlist_signups` and `provider_interests`

### Setup

Clone the repository and install its dependencies:

```bash
git clone https://github.com/JoshHagg/TinkraZA.git
cd TinkraZA
npm install
```

Create a `.env.local` file in the project root and add your Supabase project URL and publishable key:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Start the development server:

```bash
npm run dev
```

Vite serves the app at [http://localhost:5173](http://localhost:5173).

### Available scripts

- `npm run dev` — start the local development server
- `npm run build` — type-check and build the production bundle
- `npm run start` — preview the production build locally
- `npm run test:smoke` — run smoke checks for catalogue search and filters, and local storage helpers

## Project status

TinkraZA is deployed as an MVP for validating customer and provider interest in a Cape Town experiences marketplace. The public catalogue uses illustrative listings; submitting a form records interest and does not create a booking.

## License

Proprietary software. All rights reserved. This project is not licensed for redistribution or commercial reuse.
