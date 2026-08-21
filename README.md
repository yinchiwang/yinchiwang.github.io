# web

Academic website of Yin-Chi Wang (王胤琪), Associate Professor, Department of
Economics, National Taipei University.

Static HTML, no build step. Hosted on GitHub Pages from this repository
(`yinchiwang/web`).

## Structure

```
index.html      Home — bio, research fields, contact
vitae.html      CV page (links to files/CV_yinchi_Feb2025.pdf)
research.html   Publications, working papers, work in progress
teaching.html   Courses at NTPU, CUHK, WUSTL
style.css       All styling (light + dark mode, responsive)
images/         Photo
files/          CV and paper PDFs
```

## Deploying (first time)

This repository is `yinchiwang/web`, so GitHub Pages will publish it as a
**project site**, not a user site.

1. In the repository, go to **Settings → Pages** and set Source to
   "Deploy from a branch", branch `main`, folder `/ (root)`. Save.

After a minute the site is live at `https://yinchiwang.github.io/web/`.

### Serving it at the root domain instead

To get a bare `https://yinchiwang.github.io/` URL (no `/web/` suffix) later,
either:

- Rename this repository to `yinchiwang.github.io` in **Settings → General**
  (Pages will re-deploy automatically at the new URL), or
- Point a custom domain at it — see below.

### Using a custom domain later

Buy the domain, add a file named `CNAME` at the repository root containing just
the domain name, then set the domain under **Settings → Pages → Custom domain**
and point the DNS records at GitHub. GitHub issues the HTTPS certificate for
free.

## Editing

Edit the HTML files directly, then commit and push — GitHub Pages redeploys
automatically in about a minute.

**To add a publication:** copy an existing `<li>` block in `research.html` and
change the title, authors, journal and links.

**To update the CV:** replace `files/CV_yinchi_Feb2025.pdf` with the new PDF. If
the filename changes, update the link in `vitae.html` too.

## Local preview

Open `index.html` in a browser, or run a local server:

```
python -m http.server 8000
```

then visit http://localhost:8000
