# yinchiwang.github.io

Academic website of Yin-Chi Wang (王胤琪), Associate Professor, Department of
Economics, National Taipei University.

Static HTML, no build step. Hosted on GitHub Pages from this repository at
**https://yinchiwang.github.io/**.

## Structure

```
index.html      Home — bio, research fields, contact
vitae.html      CV page (links to files/CV_yinchi_Feb2025.pdf)
research.html   Publications, working papers, work in progress
teaching.html   Courses at NTPU, CUHK, WUSTL
style.css       All styling (always light, responsive)
images/         Photo
files/          CV and paper PDFs
sitemap.xml     Page list for search engines
robots.txt      Points crawlers at sitemap.xml
```

Pages is already configured: Settings → Pages → Source "Deploy from a
branch", branch `main`, folder `/ (root)`. Every push to `main` redeploys the
live site in about a minute.

### Using a custom domain later

Buy the domain, add a file named `CNAME` at the repository root containing just
the domain name, then set the domain under **Settings → Pages → Custom domain**
and point the DNS records at GitHub. GitHub issues the HTTPS certificate for
free.

## Updating content

No coding tools needed — everything can be done from the browser.

**Option A: edit directly on GitHub.com**

1. Open the file you want to change (e.g. `research.html`) in this repository.
2. Click the pencil icon (Edit this file) in the top right.
3. Make your change, then scroll down and click **Commit changes** — this
   commits straight to `main`.
4. The live site updates automatically in about a minute.

**To add a publication or working paper:** copy an existing `<li>...</li>`
block in `research.html` and change the title, authors, journal, and links.

**To update the CV:** go into `files/`, click **Add file → Upload files**,
upload the new PDF. If the filename changed, also edit `vitae.html` (or
`research.html` for a paper PDF) so the link points at the new filename.

**Option B: ask Claude**

Come back to a Claude Code session on this repository and describe the
change in plain language (e.g. "add a new paper to research.html: title X,
authors Y, journal Z, link W") — it will edit the files and push the commit
for you.

## Local preview

Open `index.html` in a browser, or run a local server:

```
python -m http.server 8000
```

then visit http://localhost:8000
