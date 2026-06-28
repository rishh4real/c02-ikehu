const page = document.body.dataset.page;
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const menuToggle = document.querySelector(".menu-toggle");

const pageMap = {
  home: "Home",
  about: "About",
  clients: "Partnering Clients",
  talent: "Partnering Talent",
};

navLinks.forEach((link) => {
  if (link.textContent.trim() === pageMap[page]) {
    link.classList.add("active");
  }

  link.addEventListener("click", () => {
    if (document.body.classList.contains("menu-open")) {
      document.body.classList.remove("menu-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    }
  });
});

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    document.body.classList.toggle("menu-open", !expanded);
  });
}

requestAnimationFrame(() => {
  document.body.classList.add("loaded");
});

document
  .querySelectorAll(
    ".hero, .page-hero, .section, .site-footer, .founder-card, .info-card, .article-card, .service-panel, [data-animate]"
  )
  .forEach((element) => {
    element.setAttribute("data-reveal", "");
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
  { threshold: 0.12 }
);

document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
