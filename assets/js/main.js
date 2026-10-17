// Hero objects lean gently toward the pointer (depth-scaled in CSS),
// and rows below fade in once as they are reached.

(() => {
  document.documentElement.classList.add("js");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const hero = document.querySelector(".hero");
  if (hero && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    let frame = 0;
    hero.addEventListener("pointermove", (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = hero.getBoundingClientRect();
        const px = ((e.clientX - r.left) / r.width - 0.5) * -22;
        const py = ((e.clientY - r.top) / r.height - 0.5) * -22;
        hero.style.setProperty("--px", px.toFixed(2));
        hero.style.setProperty("--py", py.toFixed(2));
      });
    });
    hero.addEventListener("pointerleave", () => {
      hero.style.setProperty("--px", 0);
      hero.style.setProperty("--py", 0);
    });
  }

  const items = document.querySelectorAll(".section__head, .row, .contact");
  items.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach((el) => io.observe(el));
})();
