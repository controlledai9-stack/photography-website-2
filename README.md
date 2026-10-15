# Folder-driven photography portfolio

The website is generated from the `albums` folder.

- Create a folder inside `albums` to create a new album on the home page.
- Put `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, or `.gif` images inside it.
- The first image alphabetically becomes the cover. Prefix it with `01-` to control this.
- Run `npm run dev` for a localhost preview that automatically detects added, replaced, and deleted images. Refreshing the page also checks the folders before serving it.
- Run `npm run build` before deploying. On GitHub Pages, Cloudflare Pages, or Netlify, set the build command to `npm run build` and publish directory to `dist`; every pushed folder or image then appears automatically.

## GitHub Pages deployment

The included GitHub Actions workflow builds and publishes the original website directly to GitHub Pages whenever `main` changes. In the repository, open **Settings → Pages** and select **GitHub Actions** as the source once. After that, adding, replacing, or deleting images under `albums` and pushing the commit automatically rebuilds the live gallery.

```text
albums/
  Fashion/
    01-cover.jpg
    campaign-01.jpg
  Portraits/
    01-cover.jpg
    client-name.jpg
```
