(function () {
  const show = true;
  if (!show) return;

  const text = "🇵🇰 Independence Day Offer! 50% Off on All Courses – Limited Time";
  const link = "https://wa.me/923061565858?text=I%20want%20to%20avail%2050%25%20Independence%20Day%20discount";
  const root = document.getElementById("bannerRoot");
  if (!root) return;

  root.innerHTML = `
    <div style="
      position:sticky;top:0;z-index:1400;
      background:linear-gradient(90deg,#0b7d44,#00A651);
      color:#fff;padding:10px 12px;text-align:center;font-weight:700;">
      <span id="bannerText" style="cursor:pointer">${text}</span>
      <button id="bannerClose" style="margin-left:10px;background:none;border:none;color:#fff;font-size:20px;cursor:pointer">×</button>
    </div>
  `;

  document.getElementById("bannerText")?.addEventListener("click", () => window.open(link, "_blank"));
  document.getElementById("bannerClose")?.addEventListener("click", () => root.innerHTML = "");
})();
