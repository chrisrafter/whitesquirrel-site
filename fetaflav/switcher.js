/* TEMPORARY design switcher for the Feta Flav pitch.
   Remove the <script src="switcher.js"> tag from each page (and this file) once a design is chosen. */
(function () {
  var designs = [
    { file: "index.html",     key: "A", name: "Original" },
    { file: "taverna.html",   key: "B", name: "Taverna" },
    { file: "brewhouse.html", key: "C", name: "Brewhouse" },
    { file: "aegean.html",    key: "D", name: "Aegean" }
  ];
  var here = location.pathname.split("/").pop() || "index.html";
  var H = 44;

  var css =
    "#ff-switch{position:fixed;top:0;left:0;right:0;height:" + H + "px;z-index:9999;background:#111;color:#fff;" +
    "display:flex;align-items:center;gap:10px;padding:0 12px;font:600 13px/1 system-ui,-apple-system,Segoe UI,sans-serif;" +
    "box-shadow:0 2px 10px rgba(0,0,0,.35);overflow-x:auto;white-space:nowrap;-webkit-overflow-scrolling:touch}" +
    "#ff-switch .lbl{opacity:.6;letter-spacing:.08em;text-transform:uppercase;font-size:11px;margin-right:4px}" +
    "#ff-switch a{color:#fff;text-decoration:none;padding:7px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.25);flex:none}" +
    "#ff-switch a:hover{background:rgba(255,255,255,.12)}" +
    "#ff-switch a[aria-current=page]{background:#fff;color:#111;border-color:#fff}" +
    "#ff-switch a b{opacity:.55;margin-right:5px}" +
    "body{padding-top:" + H + "px!important}" +
    "header.nav{top:" + H + "px!important}" +
    "section,[id]{scroll-margin-top:" + (H + 76) + "px!important}" +
    "@media (max-width:560px){#ff-switch .lbl,#ff-switch a b{display:none}#ff-switch{gap:6px;padding:0 8px}#ff-switch a{padding:7px 10px;font-size:12px}}";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var bar = document.createElement("div");
  bar.id = "ff-switch";
  bar.setAttribute("role", "navigation");
  bar.setAttribute("aria-label", "Design options");
  var html = '<span class="lbl">Design options</span>';
  designs.forEach(function (d) {
    html += '<a href="' + d.file + '"' + (d.file === here ? ' aria-current="page"' : "") +
            ' data-ff><b>' + d.key + "</b>" + d.name + "</a>";
  });
  bar.innerHTML = html;
  document.body.insertBefore(bar, document.body.firstChild);

  // Keep roughly the same scroll position when flipping between designs.
  var KEY = "ff-scroll";
  bar.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-ff]");
    if (!a) return;
    try {
      var max = document.documentElement.scrollHeight - innerHeight;
      sessionStorage.setItem(KEY, String(max > 0 ? scrollY / max : 0));
    } catch (err) {}
  });
  try {
    var r = sessionStorage.getItem(KEY);
    if (r !== null && !location.hash) {
      sessionStorage.removeItem(KEY);
      addEventListener("load", function () {
        var max = document.documentElement.scrollHeight - innerHeight;
        scrollTo({ top: Math.round(parseFloat(r) * max), behavior: "instant" });
      });
    }
  } catch (err) {}
})();
