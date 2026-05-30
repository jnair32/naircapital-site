document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("[data-menu-button]");
  const nav = document.querySelector("[data-site-nav]");
  if (!button || !nav) return;

  button.addEventListener("click", () => {
    const isOpen = nav.getAttribute("data-open") === "true";
    nav.setAttribute("data-open", String(!isOpen));
    button.setAttribute("aria-expanded", String(!isOpen));
  });
});

