async function loadPartials() {
  // Load header
  const headerEl = document.getElementById('header');
  if (headerEl) {
    const header = await fetch('/header.html').then(res => res.text());
    headerEl.innerHTML = header;
  }

  // Load footer
  const footerEl = document.getElementById('footer');
  if (footerEl) {
    const footer = await fetch('/footer.html').then(res => res.text());
    footerEl.innerHTML = footer;
  }
}

document.addEventListener("DOMContentLoaded", loadPartials);
