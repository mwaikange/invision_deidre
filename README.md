# InVision Wellness

A responsive wellness website for InVision Wellness in Windhoek, Namibia, with the supplied photographic eye branding, magazine artwork and four custom lifestyle images.

## Run locally

No installation or build is required. Open `dist/index.html` in a browser, or serve the directory with a static web server:

```sh
python -m http.server 8000 --directory dist
```

Then open http://localhost:8000. For hosting, publish the contents of `dist/` as the static site root. Navigation uses hash routes, so no server-side route rewrites are needed.

## Website features

- Nine views: home, corporate wellness, magazine, The VA(u)LT, BLOOM, our story, Wellness in the City, MyCourses and contact.
- Responsive desktop and mobile navigation.
- Interactive lifestyle picture switcher.
- Magazine cover search, year filters, previews and locally saved favourites.
- One-minute guided breathing exercise.
- Workplace wellness programme starting-point planner.
- Testimonial navigation and BLOOM programme details.
- Tailored enquiry forms that prepare an email for the visitor to review and send.

## Files

- `dist/index.html`: page shell and navigation.
- `dist/app.js`: views and interactive behaviour.
- `dist/style.css` and `dist/visual-refresh.css`: responsive layouts and visual styling.
- `dist/assets/`: website imagery and branding. `logo-photo.svg` embeds the exact supplied eye photograph.
- `IMAGE-CREDITS.md`: image provenance and generation prompts.

## Current integration status

Enquiry forms do not send or store messages automatically. Saved magazine preferences stay in the visitor's browser. Magazine previews show the supplied historical covers; full issues are not included.

Online payments, purchased course access, patient sign-in, intake forms and test-result storage are not active. The website explains their status and collects no medical records. The clinic, wellness centre and coach certification offerings are not published.

## Imagery

The original eye photograph is reproduced unchanged. Four AI-created lifestyle pictures illustrate movement, workplace wellbeing, pregnancy preparation and nourishment; they are not photographs of InVision staff, clients or events. The site includes an image-credit explanation.

Google Fonts is optional, with local font fallbacks. Reduced-motion preferences are respected. No analytics or tracking scripts are included.
