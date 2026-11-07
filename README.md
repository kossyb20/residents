# Residents

A mobile web app for life in Block A — the building map, home, money, work, play, civic life and more.
62 screens, implemented from the **Residents — Screen Design** canvas.

## Run it

```bash
npm install
npm run dev
```

`npm run build` makes a production bundle in `dist/`. On wide screens each screen sits in a
390×844 phone frame; on a phone it fills the viewport.

## How it's put together

- **Stack:** Vite + React 18 + React Router.
- `src/routes.js` — every screen, its URL and the design artboard it implements (`file`).
  The building map (`Main`) is `/`; the rest are kebab-case (`/trading-floor`, `/agenda-item`…).
- `src/screens/*.jsx` — one class component per screen. Each extends `Screen` and follows the same pattern:
  - `renderVals()` reads `this.props` / `this.state` and derives everything the markup needs
    (lists, labels, handlers, computed style strings);
  - `render()` lays the screen out from that snapshot (`vals`).
- `src/lib/screen.js` — the `Screen` base class and `css()`, which turns a computed CSS declaration
  string into a React style object (used where a style depends on state).
- `src/components/ScreenLink.jsx` — links between screens. Pass the design's screen file name
  (`href="Court.dc.html"`) and it routes in-app.
- `src/components/PhoneFrame.jsx` — the device frame around each screen.
- `src/styles/global.css` — design tokens (ink, paper, card, fonts), scroll-area and ticker styles.
- `src/lib/theme.js` — the accent colour (`#E8B53A`) and its alternates from the design.

Query-string parameters are passed to the screen as props, so the design's variants are reachable,
e.g. `/agenda-item?item=lift` or `/home?stage=done`.
