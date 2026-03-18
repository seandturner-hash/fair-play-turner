# Fair Play

A beautiful household task management app based on Eve Rodsky's Fair Play system.
Built with React + Vite, backed by Supabase for real-time sync across devices.

---

## Quick Start

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free account.
2. Click **New project** and give it a name (e.g. `fair-play`).
3. Wait for the project to provision (~1 min).

### 2. Apply the database schema

In your Supabase project, go to **SQL Editor** and run the contents of:

```
supabase/migrations/001_initial.sql
```

This creates the `cards` and `settings` tables with Row Level Security enabled.

### 3. Seed the cards (optional — the app auto-seeds on first load)

The app will auto-seed all 102 cards the first time it loads into an empty
database. If you prefer to seed via SQL instead (e.g. for reproducibility),
run the contents of `supabase/seed.sql` in the SQL Editor **after** running
the migration.

### 4. Get your Supabase credentials

In your Supabase project, go to **Project Settings → API**. You need:

- **Project URL** — looks like `https://abcdefgh.supabase.co`
- **anon / public key** — the long JWT string under "Project API keys"

### 5. Configure environment variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 6. Install dependencies and run locally

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Deploying to Vercel

1. Push your code to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and create a new project from that repo.
3. In the Vercel project settings, add two **Environment Variables**:
   - `VITE_SUPABASE_URL` → your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` → your Supabase anon key
4. Deploy. The `vercel.json` in this repo handles client-side routing.

## Deploying to Netlify

1. Push your code to GitHub.
2. In Netlify, click **Add new site → Import an existing project**.
3. Set **Build command** to `npm run build` and **Publish directory** to `dist`.
4. Add the same two environment variables as above.
5. Deploy. Client-side routing is handled by Netlify's default `_redirects`
   fallback (Vite outputs a `200` redirect automatically).

---

## Supabase Real-time

Real-time sync is enabled via Supabase's `postgres_changes` subscription.
For it to work, make sure **Replication** is enabled for the `cards` and
`settings` tables in your Supabase project:

1. Go to **Database → Replication**.
2. Under **Source**, enable `cards` and `settings`.

---

## Project Structure

```
src/
  components/
    Header.jsx          — Sticky header: card counts, check-in date
    TabBar.jsx          — Four-tab navigation
    Card.jsx            — Flippable card with editable back fields
    PlayerTab.jsx       — Sean / Tarragon hand, grouped by category
    DiscardedTab.jsx    — Discarded pile with reinstate
    RulesTab.jsx        — Fair Play reference guide
    AddCardModal.jsx    — Create a custom card
    Illustrations.jsx   — 102 unique inline SVG illustrations
  lib/
    supabase.js         — Supabase client initialisation
  App.jsx               — Root: data loading, real-time, routing
  index.css             — All styles (CSS custom properties + layout)
  main.jsx              — React root

supabase/
  migrations/001_initial.sql  — Schema
  seed.sql                    — Full 102-card seed (optional; app auto-seeds)
```

---

## How to Use Fair Play

1. **Deal your hand** — At your first check-in, go through the Discarded pile
   together. For each card, decide: Sean, Tarragon, or leave it discarded.

2. **Fill in the back of each card** — Write the MSC and CPE for every card
   you deal. This is the core work of the system.

3. **Set a check-in date** — Tap the calendar icon in the header. When that
   date arrives, a warm banner appears reminding you it's time to review.

4. **Pass or discard cards as life changes** — The system is designed to flex.
   Use "Pass to…" to renegotiate at any check-in.

---

## Card Categories

| Category    | What it covers                              |
|-------------|---------------------------------------------|
| Home        | Household tasks, admin, maintenance         |
| Out         | Logistics, appointments, errands            |
| Caregiving  | Children, pets, aging parents               |
| Magic       | Special occasions, relationships, finances  |
| Wild        | Health, wellbeing, big-picture life tasks   |

---

Made with warmth. Based on the work of Eve Rodsky.
