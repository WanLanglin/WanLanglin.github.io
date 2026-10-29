// Rows fade in once as they are reached.

(() => {
  document.documentElement.classList.add("js");

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
