# Recurring Date Picker

A modern, responsive component for generating recurring event dates. Built with Next.js, React, Zustand, Tailwind CSS, and date-fns. 

---

## Features
- **Flexible Recurrence:** Supports daily, weekly, monthly, and yearly patterns.
- **Custom Patterns:** Choose specific weekdays, intervals, and monthly/yearly patterns (e.g., "second Monday").
- **Date Range:** Select a start and (optional) end date.
- **Live Preview:** Instantly see all matching dates for your settings.
- **Responsive UI:** Clean, mobile-friendly, and accessible design.
- **Accessible:** Properly labeled controls and keyboard navigation.
- **Tested:** Includes a Vitest/React Testing Library test for core recurrence logic.

---

## Getting Started

### Installation
```bash
# Clone the repository
https://github.com/Nikhilsingh478/PT_DatePicker
cd recurring-picker

# Install dependencies
npm install
```

### Running the App
```bash
npm run dev
```
### Running Tests (unit & integration test)
```bash
npm test
# or
npx vitest
```

---

## Project Structure

```
recurring-picker/
├── src/
│   ├── app/                # Next.js app directory
│   │   ├── layout.js       # Global layout, font, and theme setup
│   │   ├── page.js         # Main app page and UI composition
│   │   └── globals.css     # Global styles and Tailwind config
│   ├── components/         # UI components
│   │   ├── RecurrenceSelector.js
│   │   ├── DateRangePicker.js
│   │   ├── CustomRecurrenceOptions.js
│   │   ├── WeekdaySelector.js
│   │   ├── MonthlyPatternSelector.jsx
│   │   ├── CalendarPreview.js
│   │   └── MonthlyPatternSelector.test.jsx
│   ├── store/              # Zustand state management
│   │   └── useRecurrenceStore.js
│   └── utils/              # Utility functions
│       └── recurrence.js   # Recurrence calculation logic
├── public/                 # Static assets
├── package.json            # Project metadata and scripts
├── vitest.config.js        # Vitest test config (with @ alias)
└── ...
```

---

## Key Components & Logic

### State Management
- **Zustand** (`src/store/useRecurrenceStore.js`):
  - Holds all recurrence settings (type, interval, weekdays, custom patterns, date range, preview dates).
  - Provides setters and toggles for all user actions.

### Recurrence Logic
- **`getRecurringDates`** (`src/utils/recurrence.js`):
  - Calculates all dates matching the current recurrence settings.
  - Handles daily, weekly, monthly (nth weekday), and yearly patterns.
  - Uses local time for date formatting to avoid timezone bugs.

### Main UI (`src/app/page.js`)
- **RecurrenceSelector:** Choose between daily, weekly, monthly, yearly.
- **DateRangePicker:** Select start and end dates.
- **CustomRecurrenceOptions:** Set interval (e.g., every 2 weeks).
- **WeekdaySelector:** Pick weekdays (for weekly recurrence).
- **MonthlyPatternSelector:** Pick nth weekday (for monthly/yearly).
- **CalendarPreview:** See all generated dates live.

### Testing
- **Test Example:** `src/components/MonthlyPatternSelector.test.jsx`
  - Renders for monthly/yearly, updates store on change, checks accessibility.
- **Config:** `vitest.config.js` sets up the `@` alias and jsdom environment.

---

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Lint code
- `npm test` — Run tests with Vitest

---



