Converter — Currency converter (Angular + PrimeNG)
===============================================

Project overview
----------------
This repository contains a small Angular-based currency converter single-page application (SPA) with a Node helper server. The UI uses PrimeNG components and a custom theme. Key features implemented in the codebase:

- Responsive converter card with amount input (Enter triggers conversion)
- PrimeNG UI components (p-dropdown, p-inputNumber, PrimeIcons)
- I18n language selector (via `I18nService`)
- Runtime AdSense injection (Ad placeholders locally; real ads injected only on configured domains using `AdsService`)
- Services for currency rates and conversion (`RateService`, `CurrencyService`, `ConverterController`)

Repository layout
-----------------
Top-level

- `converter/` — Angular app (source code, package.json, styles and tsconfigs)
  - `src/` — Angular application source
    - `app/` — components and services
      - `ads.service.ts` — runtime AdSense injection logic (only enabled on production domains)
      - `converter.component.ts` — main converter UI component and template bindings
      - `converter.controller.ts` — controller that orchestrates conversion logic and interactions with services
      - `currency.service.ts` — currency list, formatting helpers
      - `rate.service.ts` — fetches exchange rates (stub or remote API)
      - `i18n.service.ts` — lightweight language/locale selector used by the topbar
    - `styles.css` — app styling, PrimeNG theme imports and custom rules (big-input class, layout rules)
  - `package.json` — app dependencies and npm scripts

- `server/` — minimal Node helper (optional, e.g., proxy or API mock)
  - `index.js` — simple Node app
  - `package.json` — server dependencies and scripts

What each function/file does (quick reference)
-------------------------------------------
- `ads.service.ts`
  - Purpose: Injects Google AdSense script & ad slots at runtime only when running on an allowed/real domain. Locally the app displays placeholders so UI layout is preserved.
  - Key runtime check: production host matching; publisher id is set in the service (pub-4530638601114994).

- `converter.component.ts`
  - Purpose: UI for selecting the from/to currencies, entering amount, and showing results. Uses PrimeNG `p-inputNumber` with `inputStyleClass="big-input"` and listens for `(keydown.enter)` to trigger `controller.convert()`.

- `converter.controller.ts`
  - Purpose: Encapsulates conversion logic, orchestrates rate fetching, caching behavior, and error handling.

- `currency.service.ts`
  - Purpose: Provides currency lists, icons, formatting rules and helpers used by the UI drop-downs and result formatter.

- `rate.service.ts`
  - Purpose: Fetches exchange rates from a remote API or a local stub; used by `ConverterController` to compute conversions.

- `i18n.service.ts`
  - Purpose: Exposes the current language and provides a method to change it. The topbar UI reads available locales from here.

Development setup
-----------------
Requirements

- Node.js (LTS recommended; v18+ tested)
- npm (bundled with Node) or yarn

Install dependencies (run from project root)

```powershell
Set-Location .\converter
npm install
Set-Location ..\server
npm install
```

Run the Angular dev server

```powershell
Set-Location .\converter
npm run start
# Open http://localhost:4200
```

Run the helper server (optional)

```powershell
Set-Location .\server
npm start
```

Testing & linting
-----------------
- Unit tests: `npm run test` (in `converter` folder) — runs Angular tests.
- Linting: add `eslint` or `ng lint` depending on your toolchain.

PrimeNG and styling notes
-------------------------
- The app imports the `saga-blue` PrimeNG theme and PrimeNG core CSS in `src/styles.css`:
  - `primeng/resources/themes/saga-blue/theme.css`
  - `primeng/resources/primeng.min.css`
  - `primeicons/primeicons.css`
- If icons or dropdown visuals look broken, ensure you ran `npm install` and that `primeng`/`primeicons` are present in `node_modules`.

Git / repository hygiene notes
-----------------------------
- `node_modules/` and `dist/` are ignored in `.gitignore`. I removed tracked `converter/node_modules` and `converter/dist` from the index and pushed the cleaned repo to your GitHub: https://github.com/Izuto/Converter
- If you previously committed large files or build artifacts, and you want them removed from history, use BFG or `git filter-repo` to rewrite history. Ask me and I can propose a safe plan.

AdSense and privacy
-------------------
- `AdsService` only injects AdSense on approved/real domains. Locally you will see placeholders. Ensure your use complies with Google AdSense policies before enabling production traffic.

Cheat-sheet — Common console commands (PowerShell)
-------------------------------------------------

- Work with branches and remotes
```powershell
# show current branch and last commit
git branch --show-current
git log --oneline -n 5

# add remote and push
git remote add origin https://github.com/Izuto/Converter.git
git push -u origin main

# push new branch
git push -u origin feature/my-feature
```

- Staging / committing
```powershell
# stage changes and commit
git add -A
git commit -m "Short, meaningful message"

# amend last commit (if not yet pushed)
git commit --amend --no-edit
```

- Undo / cleanup
```powershell
# unstage everything (but keep working tree)
git reset

# remove tracked node_modules from index while keeping files locally
git rm -r --cached "converter/node_modules"
git add .gitignore
git commit -m "Apply .gitignore: untrack node_modules"
```

- Inspect tracked files with "node_modules"
```powershell
git ls-files | Select-String 'node_modules' -SimpleMatch
```

- Rewriting history to remove large files (use with care)
```powershell
# using BFG (external tool)
# bfg --delete-files YOUR-LARGE-FILE
# then
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

- Getting remote status and syncing
```powershell
git fetch origin
git status --porcelain --branch
git pull --rebase origin main
```

Quick troubleshooting tips
--------------------------
- Git index.lock error:
  - Close any git-running process. If no process is active, remove `.git/index.lock`:
```powershell
Remove-Item -Force .git/index.lock
```
- PowerShell pipe differences: use `;` to chain or `2>$null` to silence stderr redirection; avoid POSIX `||`.

If you want me to add a short CONTRIBUTING.md, CI config, or example environment variables, tell me which CI provider you prefer (GitHub Actions, Azure Pipelines, etc.) and I'll add a starter workflow.

That's it — tell me if you want the README tweaked (shorter, more visuals, badges, or screenshot embedding).
