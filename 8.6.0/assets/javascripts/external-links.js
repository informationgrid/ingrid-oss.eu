document.addEventListener("DOMContentLoaded", () => {
  const here = location.origin;
  for (const a of document.querySelectorAll('a[href^="http"]')) {
    if (!a.href.startsWith(here)) {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    }
  }
});
