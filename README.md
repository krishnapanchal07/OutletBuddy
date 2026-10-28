# OutletBuddy

**OutletBuddy** is a responsive sales outlet management application built with React and TypeScript. It provides a centralized workspace to organize outlet records, review network activity, and explore outlet locations on an interactive map.

## Features

- **Outlet management:** Create, view, edit, and delete outlets with field-level validation and delete confirmation.
- **Dashboard:** Review outlet totals, status distribution, recent visits, and location summaries.
- **Search and filters:** Find outlets by name, owner, phone, address, city, or ID; filter by status and sort results.
- **Interactive maps:** Explore outlet locations with OpenStreetMap tiles, status-based markers, and location details.
- **Analytics:** View charts and summaries generated from the current outlet records.
- **Data export:** Download outlet records as a CSV file.
- **Persistent data:** Save changes locally between browser sessions using `localStorage`.
- **Responsive interface:** Use the application on desktop, tablet, and mobile, with light and dark themes.
- **Application states:** Loading indicators, empty states, validation feedback, and error fallbacks.

## Tech stack

| Technology | Usage |
| --- | --- |
| React 18, TypeScript, Vite | Application UI, type safety, and development tooling |
| Tailwind CSS v4 | Utility-first styling with shared design tokens |
| React Router | Client-side navigation |
| React Context | Shared outlet, theme, and notification state |
| React Leaflet, Leaflet, OpenStreetMap | Interactive maps and location markers |
| Recharts | Dashboard charts and data visualization |
| Vitest | Unit tests for application helpers |
| Browser `localStorage` | Local persistence for outlet records |

## Getting started

### Requirements

- Node.js 22.12 or later
- npm
- Internet access to install dependencies and load OpenStreetMap tiles

### Installation

```bash
npm install
npm run dev
```

Open the local address displayed by Vite (typically [http://localhost:5173](http://localhost:5173)).

### Sign in

Use the prefilled credentials:

- **Email:** `demo@outletbuddy.app`
- **Password:** `Demo1234`

The application uses a local sign-in flow. Any correctly formatted email and password of at least six characters is accepted; no server-side account verification is performed.

### Available commands

```bash
npm run dev        # Start the development server
npm run typecheck  # Check TypeScript types
npm test           # Run unit tests
npm run build      # Create a production build
```

## Project structure

```text
src/
├── app/          # Routes and application providers
├── components/
│   ├── dashboard/ # Summary cards, charts, visits, and map preview
│   ├── layout/    # Application shell and navigation
│   ├── map/       # Map canvas, location list, and map workspace
│   ├── outlets/   # Outlet table, filters, forms, details, and pagination
│   └── ui/        # Shared dialogs, loading views, and error boundaries
├── context/      # Outlet, theme, and toast providers
├── data/         # Initial outlet records
├── hooks/        # Authentication, dashboard, and outlet state logic
├── lib/          # Storage, validation, filtering, and CSV utilities
├── pages/        # Route-level pages
├── styles/       # Design tokens and specialized styles
├── utils/        # Session helpers
├── App.tsx       # Application composition
└── styles.css    # Tailwind entry and stylesheet imports
```

Components handle presentation, while hooks and context manage shared state and application behavior. Pure utilities handle filtering, validation, persistence, and export. Tailwind utilities cover common styling; dedicated CSS handles specialized visuals and map-specific styling.

## Data and persistence

OutletBuddy starts with 16 sample outlet records using illustrative locations around Ahmedabad, Gujarat. All outlet names, contact details, and visit dates are fictional.

Outlet changes are stored in the browser's `localStorage`, so they remain available after a page refresh. Data is not synchronized between devices or browsers. Export CSV to save a portable copy of outlet records.

The dashboard and charts reflect the records currently stored in the application. Visit-related summaries use each outlet's latest recorded visit date, not a complete visit history.

## License

No license has been specified for this repository.