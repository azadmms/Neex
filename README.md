# SkyGate Sample Receipt Generator

A mobile-friendly static website designed for GitHub Pages.

## Features

- Fixed beneficiary name: **SkyGate Technology**
- Fixed currency: **IQD**
- Editable amount
- Automatic current date and time
- Download receipt as PNG
- Save as PDF through the browser print dialog
- Mobile Home Screen support
- Offline caching after the first successful load
- Permanent **SAMPLE — NOT A BANK RECEIPT** disclaimer

## Deploy on GitHub Pages

1. Sign in to GitHub.
2. Create a new repository, for example:
   `skygate-receipt`
3. Keep the repository **Public** if you are using GitHub Pages on a free account.
4. Upload every file from this ZIP to the repository root:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `manifest.webmanifest`
   - `service-worker.js`
   - `icon.svg`
   - `.nojekyll`
5. Open the repository.
6. Go to **Settings**.
7. Open **Pages**.
8. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
9. Click **Save**.
10. Wait a few minutes for GitHub Pages to publish the site.

Your address will normally be:

`https://YOUR-USERNAME.github.io/skygate-receipt/`

## Update later

1. Edit the files in the repository.
2. Commit the changes.
3. GitHub Pages will redeploy automatically.

## Mobile installation

### iPhone

1. Open the deployed site in Safari.
2. Tap **Share**.
3. Tap **Add to Home Screen**.
4. Tap **Add**.

### Android

1. Open the deployed site in Chrome.
2. Open the browser menu.
3. Tap **Add to Home screen** or **Install app**.

## Important

This project creates a generic internal sample only. It must not be presented as an official bank document or proof of payment.
