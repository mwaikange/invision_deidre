# InVision Wellness

A responsive wellness website for InVision Wellness in Windhoek, Namibia, with the supplied InVision logo, founders’ portraits, magazine artwork and illustrative lifestyle images.

## Run locally

No installation or build is required. Open `dist/index.html` in a browser, or serve the directory with a static web server:

```sh
python -m http.server 8000 --directory dist
```

Then open http://localhost:8000. For hosting, publish the contents of `dist/` as the static site root. Navigation uses hash routes, so no server-side route rewrites are needed.

## Deploy to Vercel

Import this repository with production branch `main` and leave **Root Directory** at the repository root (`.`). The included `vercel.json` selects the **Other** framework preset, skips installation and building, and serves `dist/`.

If the project already exists, check that Root Directory is still the repository root, then deploy the latest commit. First verify that the generated `.vercel.app` URL opens correctly. After that, add your custom domain under the project's Domains settings and apply the exact DNS records Vercel supplies.

## Website features

- Ten views: home, corporate wellness, magazine, The VA(u)LT, courses, BLOOM, our story, Wellness in the City, MyCourses and contact.
- Responsive desktop and mobile navigation.
- Four service shortcuts and an interactive eight-dimensions wellness guide.
- Five historical magazine issues, article-page previews with zoom, search, year filters and locally saved favourites.
- One-minute guided breathing exercise with optional original ambient audio.
- Workplace wellness programme starting-point planner.
- Moving testimonials with pause controls, BLOOM programme details and upcoming workshop enquiries.
- Tailored enquiry forms that prepare an email for the visitor to review and send.

## Files

- `dist/index.html`: page shell and navigation.
- `dist/app.js`: views and interactive behaviour.
- `dist/style.css`, `dist/visual-refresh.css` and `dist/round-one.css`: responsive layouts and visual styling.
- `dist/assets/`: supplied branding, founder portraits, magazine covers, selected article pages and illustrative imagery.
- `IMAGE-CREDITS.md`: image provenance and generation prompts.

## Current integration status

Enquiry forms prepare a draft for the visitor to review and send; they do not send or store messages automatically. Event-update requests use an explicit consent statement. Saved magazine preferences stay in the visitor's browser. Magazine previews include the supplied historical covers and selected original article pages; complete issues are not included.

Online payments, purchased course access, patient sign-in, intake forms and test-result storage are not active. The website explains their status and collects no medical records. Corporate Quick Care Clinic enquiries are available; the patient portal is still being prepared.

## Imagery

The InVision wordmark and founder portraits are reproduced from the supplied files. The VA(u)LT artwork retains its original lettering with a phone detail inside the U. Four AI-created lifestyle pictures illustrate movement, workplace wellbeing, pregnancy preparation and nourishment; they are not photographs of InVision staff, clients or events. The site includes an image-credit explanation.

Google Fonts is optional, with local font fallbacks. Reduced-motion preferences are respected. No analytics or tracking scripts are included.
