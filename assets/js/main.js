document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("[data-menu-button]");
  const nav = document.querySelector("[data-site-nav]");

  if (button && nav) {
    button.addEventListener("click", () => {
      const isOpen = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!isOpen));
      button.setAttribute("aria-expanded", String(!isOpen));
    });
  }

  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");
  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector("button[type='submit']");
    status.textContent = "Sending...";
    status.dataset.state = "pending";
    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { accept: "application/json" },
      });
      const result = await response.json();
      status.textContent = result.message || "Thank you. Your message has been sent.";
      status.dataset.state = response.ok ? "success" : "error";
      if (response.ok) form.reset();
    } catch {
      status.textContent = "Sorry, the message could not be sent. Please try again later.";
      status.dataset.state = "error";
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
});
