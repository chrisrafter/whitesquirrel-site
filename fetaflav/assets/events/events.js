/* Feta Flav event pages: nav toggle, scroll reveal, countdown, price tiers */
(function () {
  var EVENT_START = new Date("2026-10-28T18:30:00-04:00");
  var EARLY_ENDS = new Date("2026-10-22T00:00:00-04:00"); // $49 through 10/21
  var now = new Date();

  // mobile nav
  var t = document.querySelector(".menu-toggle"), l = document.querySelector(".nav-links");
  if (t && l) t.addEventListener("click", function () {
    var o = l.classList.toggle("open"); t.setAttribute("aria-expanded", o);
  });
  if (l) l.addEventListener("click", function (e) { if (e.target.closest("a")) { l.classList.remove("open"); t && t.setAttribute("aria-expanded", "false"); } });

  // reveal on scroll
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else els.forEach(function (el) { el.classList.add("in"); });

  // current price
  var early = now < EARLY_ENDS, over = now > EVENT_START;
  var price = early ? "$49" : "$59";
  document.querySelectorAll("[data-price]").forEach(function (el) { el.textContent = price; });
  document.querySelectorAll("[data-price-note]").forEach(function (el) {
    el.textContent = early ? "Early-bird price through Wed, Oct 21" : "Regular price";
  });
  document.querySelectorAll("[data-price-short]").forEach(function (el) {
    el.innerHTML = early ? "Early bird<br>thru 10/21" : "Per person";
  });
  var te = document.querySelector('[data-tier="early"]'), tr = document.querySelector('[data-tier="regular"]');
  if (te && tr) { (early ? te : tr).classList.add("active"); if (!early) te.classList.add("past"); }

  // countdown
  var cd = document.querySelector("[data-countdown]");
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function tick() {
    if (!cd) return;
    var ms = EVENT_START - new Date();
    if (ms <= 0) { cd.innerHTML = '<div style="flex:1"><b>Tonight!</b><span>Thanks for coming</span></div>'; return; }
    var d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
    cd.innerHTML = "<div><b>" + d + "</b><span>Days</span></div><div><b>" + pad(h) + "</b><span>Hours</span></div><div><b>" + pad(m) + "</b><span>Min</span></div><div><b>" + pad(s) + "</b><span>Sec</span></div>";
  }
  tick(); setInterval(tick, 1000);

  if (over) document.querySelectorAll("[data-hide-after]").forEach(function (el) { el.hidden = true; });

  var y = document.getElementById("yr"); if (y) y.textContent = new Date().getFullYear();
})();
