# Berkano marketing website

The public marketing site for **Berkano**, a proposed non-clinical mobile app for recovery self-management, developed for the IIT Agile Team Project (Coursework 1, 2026/27, B8).

Built with React 18, TypeScript, Tailwind CSS 4 and Vite 6. There is no backend or database.

## Run it locally

You need Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build for production

1. Open `.env.production` and set `VITE_SITE_URL` to your real domain, with no trailing slash.
2. Run:

```bash
npm run build      # type-checks, then writes the site to dist/
npm run preview    # serves dist/ locally to check it
```

The build also writes `dist/resources/index.html`, `dist/privacy/index.html`, `404.html`, `robots.txt` and `sitemap.xml`, so each page has its own title and no server rewrite rules are needed.

## Deploy to your own domain

The coursework requires your team's own `.com` or `.lk` domain over HTTPS. A Claude Artifact link does not meet that requirement.

These steps use Cloudflare Pages. Netlify and Vercel work almost the same way.

1. Buy the domain and push this project to your team's GitHub repository.
2. In Cloudflare Pages, choose **Create a project**, then connect the repository.
3. Set the build command to `npm run build` and the output directory to `dist`.
4. Add your domain under **Custom domains** and follow the DNS instructions. HTTPS is issued automatically.
5. Open the live site over `https://` and work through the checklist below.

## Common edits

| To change | Edit |
| --- | --- |
| Team photographs | Add square images to `public/team/`, then set `photo` in `src/data/team.ts` |
| Social media links | Add real accounts to `SOCIAL_LINKS` in `src/data/site.ts`. The footer shows them only when the list has entries |
| Support resources and statistics | `src/data/resources.ts` |
| Feature wording | `src/data/features.ts` |
| Colours | The token blocks at the top of `src/styles/index.css` and `src/styles/app.css` |
| Demo screens and sample data | `src/demo/` |

## Project structure

```text
src/
  components/  brand elements, header, footer, theme toggle
  data/        site, team, feature and resource content
  demo/        the interactive app demonstration
  lib/         router and theme logic
  pages/       Home, Resources, Privacy and Not found
  styles/      design tokens, fonts and demo styles
public/        favicons, social image and logo assets
scripts/       post-build, Artifact build and logo preparation
```

## Logo

`public/brand/berkano-logo-original.png` is the supplied artwork. The transparent versions were derived from its pixels by `scripts/prepare-logo.py`, with no shapes redrawn. In dark mode the logo sits on a cream plate, so its colours do not change. The source is only 500 x 500 px, so replace the derived files with an export from your original design file when you can.

## Analytics

None are installed, and the privacy notice says so. For evidence of reach, consider a cookie-free option such as Cloudflare Web Analytics, Plausible or Umami. If you add one, update `src/pages/Privacy.tsx` first. Report only the numbers the tool really records.

## The interest list

The call to action opens the visitor's email app with a prepared message to `berkano5atp@gmail.com`. Your team must keep the list by hand, for example in a Gmail label, and reply to the people who sign up. A hosted form would need an outside service and an updated privacy notice.

## Before the viva

- [ ] Add real team photographs.
- [ ] Set `VITE_SITE_URL`, deploy, and confirm HTTPS on your own domain.
- [ ] Send a real test email through each email button, and confirm it arrives.
- [ ] Re-check every link and number in `src/data/resources.ts`.
- [ ] Have the team confirm the privacy notice describes what you actually do with emails.
- [ ] Test on real Android and iOS phones, a tablet and desktop browsers.
- [ ] Test with a screen reader, and run Lighthouse on the live site.
- [ ] Compare the demo with your final high-fidelity prototype.
- [ ] Add social links if your team creates accounts.

## Rebuild the Artifact version

```bash
npm run build:artifact    # writes dist-artifact/berkano.html
```

It uses hash links (`#resources`) because Artifacts cannot change their path. The production build uses normal paths.

## Fonts

Gloock, Hanken Grotesk, Merriweather, Merriweather Sans, DM Sans and Libre Bodoni are self-hosted through Fontsource under the SIL Open Font License, so visitors make no requests to Google Fonts.
