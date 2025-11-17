// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// Close nav when clicking a link (mobile)
nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

// Footer year auto-update
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Scroll reveal for sections & cards
const revealTargets = [
  ...document.querySelectorAll(".section"),
  ...document.querySelectorAll(".card"),
];

if ("IntersectionObserver" in window && revealTargets.length) {
  revealTargets.forEach((el) => {
    el.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
    }
  );

  revealTargets.forEach((el) => observer.observe(el));
}

// Hero parallax (mouse/pointer based)
const hero = document.querySelector(".hero");

if (hero) {
  const handleParallax = (evt) => {
    const rect = hero.getBoundingClientRect();
    const x = (evt.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (evt.clientY - rect.top) / rect.height - 0.5;
    hero.style.setProperty("--parallax-x", x.toFixed(3));
    hero.style.setProperty("--parallax-y", y.toFixed(3));
  };

  const resetParallax = () => {
    hero.style.setProperty("--parallax-x", "0");
    hero.style.setProperty("--parallax-y", "0");
  };

  hero.addEventListener("pointermove", handleParallax);
  hero.addEventListener("pointerleave", resetParallax);
}

// Card hover spotlight (updates CSS vars for each card)
document.querySelectorAll(".card").forEach((card) => {
  const handleSpotlight = (evt) => {
    const rect = card.getBoundingClientRect();
    const x = ((evt.clientX - rect.left) / rect.width) * 100;
    const y = ((evt.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--spotlight-x", `${x.toFixed(1)}%`);
    card.style.setProperty("--spotlight-y", `${y.toFixed(1)}%`);
  };

  const resetSpotlight = () => {
    card.style.setProperty("--spotlight-x", "50%");
    card.style.setProperty("--spotlight-y", "0%");
  };

  card.addEventListener("pointermove", handleSpotlight);
  card.addEventListener("pointerleave", resetSpotlight);
});
