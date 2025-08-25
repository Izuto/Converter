# Converter (Currency Converter App)

This repository contains a small Angular-based currency converter application.

## Live FX provider used

- Provider: open.er-api.com (public, free)
  - Base URL: `https://open.er-api.com/v6`
  - Endpoint used: `/latest/{BASE}` (the app requests `latest/EUR` by default)
  - Notes: provider does not require an API key and returns daily-updated exchange rates.

## Additional data sources

- Currency full-names and canonical list: Umpirsky currency list
  - (runtime fetch) https://raw.githubusercontent.com/umpirsky/currency-list/master/data/en/currency.json
- Country metadata (for flag emoji derivation): mledoze/countries dataset
  - (runtime fetch) https://raw.githubusercontent.com/mledoze/countries/master/countries.json

## Main dependencies (from `package.json`)

- Angular (v16) core packages
- PrimeNG (v16) and PrimeIcons — UI components used for dropdowns, inputs, buttons
- RxJS — reactive programming
- zone.js — Angular runtime

Dev / build

Install dependencies and run the dev server:

```powershell
cd converter
npm install
npx ng serve -o
```

The dev server listens on http://localhost:4200 by default.

Notes about metadata additions

- The app augments its built-in `meta` currency map at runtime with live rates. Several non-standard or region-specific codes were added to `src/app/currency.service.ts` to improve first-render UX (examples: XCG, XDR, VES, TVD, STN, SLE, MRU, JEP, IMP, KID, ZWL, FOK, GGP). These entries include friendly full-names and emoji fallbacks for flags.
- Flags are emoji fallbacks; if you prefer SVG assets for consistent rendering, add them to `src/assets/flags` and update `getFlag()` logic.

Contributing

- Open a PR against `main`. For data-source changes, prefer adding entries to `src/app/currency.service.ts` and include a short source note in the commit message.

License

This project contains third-party data fetched at runtime (Umpirsky, mledoze) and uses the free open.er-api.com rates. Check those projects' licenses if you redistribute their datasets.
