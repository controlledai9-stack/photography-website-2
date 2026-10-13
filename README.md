# Folder-driven photography portfolio

The website is generated from the `albums` folder.

- Create a folder inside `albums` to create a new album on the home page.
- Put `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, or `.gif` images inside it.
- The first image alphabetically becomes the cover. Prefix it with `01-` to control this.
- Run `npm run dev` for a localhost preview that automatically detects added, replaced, and deleted images. Refreshing the page also checks the folders before serving it.
- Run `npm run build` before deploying. On GitHub Pages, Cloudflare Pages, or Netlify, set the build command to `npm run build` and publish directory to `dist`; every pushed folder or image then appears automatically.

## Google AI Studio deployment

Import this repository into Google AI Studio. The production command is `npm start`; it respects Google Cloud Run's `PORT` environment variable and rebuilds the gallery from `albums` when the service starts.

To update the portfolio, add or remove images in the album folders, commit the changes to GitHub, sync/import the updated repository in AI Studio, and publish a new revision. Create a new folder inside `albums` to create a new album automatically.

Changes made in the AI Studio workspace become live after publishing a new revision. A deployed Cloud Run service cannot permanently monitor folders on somebody's computer, and its local filesystem is temporary. Persistent uploads made after deployment require external storage, such as Cloud Storage, and an authenticated administration interface.

```text
albums/
  Fashion/
    01-cover.jpg
    campaign-01.jpg
  Portraits/
    01-cover.jpg
    client-name.jpg
```
