# Catch! — Vercel 43 Build

Catch! is a mobile-first commercial fishing settlement application for fleet companies, vessel owners, captains, and crews.

## This package is a complete replacement

Replace the current GitHub repository contents with the contents of this ZIP. Do not merge the old Vinext/Sites build files back into this project.

The project has been rebuilt as a standard Next.js application for Vercel. It intentionally does not contain:

- Vinext or Vite
- Cloudflare Worker configuration
- `.openai/hosting.json`
- Sites-specific build plugins
- custom build or environment shell scripts
- Wrangler
- a custom output directory
- `package-lock.json`

## Upload through GitHub

1. In the `caliphsafe/catch` repository, remove the existing project files.
2. Keep the repository itself and its Git history.
3. Upload everything inside this ZIP to the repository root.
4. Commit directly to `main`.
5. Vercel will install the dependencies and run `next build`.

## Vercel settings

- Framework Preset: **Next.js**
- Root Directory: leave blank
- Build Command: `npm run build` or leave the detected default
- Output Directory: leave blank
- Install Command: `npm install` or leave the detected default
- Node.js: 22.x

If an old Output Directory value such as `dist` is saved in Vercel, clear it before redeploying.

## Current scope

The current experience is a polished working product prototype. It includes the fleet dashboard, guided six-step settlement workflow, trip history, boats, crew, practice mode, responsive mobile behavior, and Catch! branding.

Before processing real settlements, connect authentication, a production database, secure document storage, deterministic vessel share formulas, OCR/document extraction, electronic agreements, accounting exports, and a licensed payment provider.
