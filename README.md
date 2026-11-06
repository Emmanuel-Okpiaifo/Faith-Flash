# Faith Flash — The Envoys Media Hub

Faith Flash is the media and testimony department of **RCCG The Envoys**. The site is a home for the team, testimonies, media, and the magazine reading room.

## Key features

- **Branded preloader**: A short "Sent Ones" loading screen.
- **Media**: Two pages, Podcasts and Audio, with a switch directly under the navbar. Podcasts is `/online-tv`. Audio is `/online-tv/audio`. `/podcasts` opens Audio.
- **Fire Wall (Testimonies)**: Member stories, with a link out to the testimony form.
- **Magazines**: Flipbook reading room powered by DearFlip, including the Mercy Convention 2026 issue.
- **Design system**: Off-white pages, ink type, and a gold accent, matching RCCG The Envoys. **Anton** for titles and **DM Sans** for body, navigation, and buttons.

## Technology stack

- **Core**: React 19 + TypeScript
- **Build tool**: Vite
- **Styling**: Vanilla CSS
- **Routing**: React Router 7

## Getting started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the dev server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Project structure

- `src/assets/img/`: Ministry photography and branding assets.
- `src/components/`: Reusable UI (header, footer, broadcast cards, magazine viewer).
- `src/content/site.ts`: Brand copy, testimonies, podcasts, and magazine metadata.
- `src/pages/`: Home, Media, Testimonies, Magazines, and the magazine flipbook.
- `public/magazines/`: Magazine PDFs and covers.
- `public/dflip/`: DearFlip viewer assets.

---
**WE ARE THE SENT ONES — RAISING A SUPERNATURAL ARMY DEPLOYED INTO EVERY SPHERE.**
