document.querySelectorAll(".headerlink").forEach(link => {
  link.addEventListener("click", () => {
    navigator.clipboard.writeText(link.href);
  });
});