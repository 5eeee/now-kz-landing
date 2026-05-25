const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const leadForms = document.querySelectorAll("[data-lead-form]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

leadForms.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const status = form.querySelector("[data-form-status]");
    const submitButton = form.querySelector("[data-submit-button]");
    const submitLabel = form.querySelector("[data-submit-label]");
    const defaultLabel = submitLabel ? submitLabel.textContent : "Оставить заявку прямо сейчас";

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const payload = {
      name: form.elements.name?.value?.trim() || "",
      phone: form.elements.phone?.value?.trim() || "",
      goal: form.elements.goal?.value?.trim() || "",
    };

    if (submitButton) submitButton.disabled = true;
    if (submitLabel) submitLabel.textContent = "Отправка...";
    if (status) {
      status.textContent = "";
      status.classList.remove("success", "error");
    }

    try {
      const response = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Не удалось отправить заявку.");
      }

      if (status) {
        status.textContent = "Спасибо! Заявка отправлена. Менеджер скоро свяжется с вами.";
        status.classList.add("success");
      }

      form.reset();
    } catch (error) {
      if (status) {
        status.textContent =
          error.message || "Не удалось отправить заявку. Попробуйте позже.";
        status.classList.add("error");
      }
    } finally {
      if (submitButton) submitButton.disabled = false;
      if (submitLabel) submitLabel.textContent = defaultLabel;
    }
  });
});

function setupRevealAnimations() {
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.querySelectorAll(":scope > *").forEach((element, index) => {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", `${index * 0.1}s`);
    });
  }

  document.querySelectorAll(".page-section, .brand-line").forEach((section) => {
    section
      .querySelectorAll(
        ".section-title, .split-layout > *, .brand-grid > *, .feature-list > li, .categories-list > li, .section-text, .request-copy > *, .lead-card"
      )
      .forEach((element, index) => {
        element.classList.add("reveal");
        element.style.setProperty("--reveal-delay", `${Math.min(index * 0.08, 0.48)}s`);
      });
  });

  document.querySelectorAll(".brand-line span").forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${index * 0.1}s`);
  });

  const revealElements = document.querySelectorAll(".reveal");

  if (prefersReducedMotion) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const heroItems = heroContent ? heroContent.querySelectorAll(".reveal") : [];
  heroItems.forEach((element) => {
    window.setTimeout(() => element.classList.add("is-visible"), 120);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealElements.forEach((element) => {
    if (!element.closest(".hero-content")) {
      observer.observe(element);
    }
  });
}

setupRevealAnimations();
