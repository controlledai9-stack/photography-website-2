# Portfolio photo updates on a MacBook

The normal update process does **not** require Google AI Studio, Node.js, Terminal, or a local server. The client only needs a GitHub account with access to this repository and the free [GitHub Desktop for Mac](https://desktop.github.com/).

## One-time setup

1. Install GitHub Desktop and sign in.
2. Choose **File → Clone Repository → URL**.
3. Enter `https://github.com/controlledai9-stack/photography-website-2`.
4. Choose where to keep the portfolio on the Mac and select **Clone**.
5. In GitHub Desktop, choose **Repository → Show in Finder**.

## Add or replace photographs

1. Open the `albums` folder in Finder.
2. Open the required album, such as `Fashion`, `Food`, `Interior`, `People`, or `Products`.
3. Drag the new `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, or `.gif` files into that folder.
4. To replace an image, remove the old file and add the replacement.
5. Return to GitHub Desktop. Enter a short summary such as `Update Fashion photos`.
6. Select **Commit to main**, then **Push origin**.

GitHub Pages will rebuild the website automatically. Refresh the live website after the deployment finishes.

## Remove photographs

Delete the unwanted files from the album folder in Finder, then commit and push the deletion through GitHub Desktop.

## Create a new album

Create a new folder inside `albums`, name it exactly as the album should appear on the website, and add at least one photograph. Commit and push it through GitHub Desktop. The new album appears automatically.

## Choose an album cover

The first image alphabetically becomes the cover. Name the preferred cover `01-cover.jpg` (or use the matching extension).

## Optional local preview

A local preview is optional. If Node.js 20 or newer is installed, open Terminal in the repository and run:

```sh
npm run dev
```

Then open `http://127.0.0.1:4173/`. Added, replaced, and deleted images are detected automatically.

