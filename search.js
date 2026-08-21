(function () {
  var PAGES = [
    { url: "index.html", title: "Home" },
    { url: "vitae.html", title: "Vitae" },
    { url: "research.html", title: "Research" },
    { url: "teaching.html", title: "Teaching" }
  ];

  var indexPromise = null;

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function buildPageIndex(page, doc) {
    var entries = [];
    var heading = { id: "", text: page.title };
    var nodes = doc.body.querySelectorAll("h1, h2, h3, li, p, dd");
    nodes.forEach(function (el) {
      if (el.closest("nav.site, .search-wrap")) return;
      if (/^H[1-3]$/.test(el.tagName)) {
        heading = { id: el.id || "", text: el.textContent.replace(/\s+/g, " ").trim() };
        return;
      }
      var text = el.textContent.replace(/\s+/g, " ").trim();
      if (!text) return;
      entries.push({
        page: page.url,
        pageTitle: page.title,
        heading: heading.text,
        anchor: heading.id,
        text: text
      });
    });
    return entries;
  }

  function loadIndex() {
    if (indexPromise) return indexPromise;
    indexPromise = Promise.all(
      PAGES.map(function (page) {
        return fetch(page.url)
          .then(function (r) { return r.text(); })
          .then(function (html) {
            var doc = new DOMParser().parseFromString(html, "text/html");
            return buildPageIndex(page, doc);
          })
          .catch(function () { return []; });
      })
    ).then(function (lists) { return lists.reduce(function (a, b) { return a.concat(b); }, []); });
    return indexPromise;
  }

  function search(entries, query) {
    var q = query.trim().toLowerCase();
    if (!q) return [];
    var seen = Object.create(null);
    var out = [];
    for (var i = 0; i < entries.length && out.length < 20; i++) {
      var e = entries[i];
      if (e.text.toLowerCase().indexOf(q) === -1 && e.heading.toLowerCase().indexOf(q) === -1) continue;
      var key = e.page + "#" + e.anchor + "|" + e.text;
      if (seen[key]) continue;
      seen[key] = true;
      out.push(e);
    }
    return out;
  }

  function render(results, container) {
    if (!results.length) {
      container.innerHTML = '<p class="search-empty">No matches</p>';
      container.hidden = false;
      return;
    }
    container.innerHTML = results
      .map(function (r) {
        var href = r.anchor ? r.page + "#" + r.anchor : r.page;
        var snippet = r.text.length > 130 ? r.text.slice(0, 130) + "…" : r.text;
        var headingLabel = r.heading === r.pageTitle ? r.pageTitle : r.pageTitle + " — " + r.heading;
        return (
          '<a class="search-result" href="' + href + '">' +
          '<span class="search-result-heading">' + escapeHtml(headingLabel) + "</span>" +
          '<span class="search-result-snippet">' + escapeHtml(snippet) + "</span>" +
          "</a>"
        );
      })
      .join("");
    container.hidden = false;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var input = document.getElementById("site-search");
    var results = document.getElementById("search-results");
    if (!input || !results) return;

    var entries = null;
    var timer = null;

    input.addEventListener("focus", function () { loadIndex(); });

    input.addEventListener("input", function () {
      clearTimeout(timer);
      var q = input.value;
      if (!q.trim()) {
        results.hidden = true;
        results.innerHTML = "";
        return;
      }
      timer = setTimeout(function () {
        loadIndex().then(function (all) {
          entries = all;
          render(search(entries, q), results);
        });
      }, 150);
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".search-wrap")) results.hidden = true;
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        results.hidden = true;
        input.blur();
      }
    });
  });
})();
