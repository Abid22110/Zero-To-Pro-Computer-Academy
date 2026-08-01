/* ===================================================
   Zero to Pro Computer & AI Academy – banner.js
   Independence Day Promotional Banner
   =================================================== */

const bannerData = {
  show: true,
  text: "🇵🇰 Independence Day Offer! 50% Off on All Courses – Limited Time",
  link: "https://wa.me/923061565858?text=I%20want%20to%20avail%20the%2050%25%20Independence%20Day%20discount"
};

if (bannerData.show) {
  const banner = document.createElement('div');
  banner.id = 'promoBanner';
  banner.innerHTML = `
    <div style="
      position: fixed; top: 0; left: 0; width: 100%;
      background: linear-gradient(90deg, #01411c, #00A651);
      color: white; text-align: center; padding: 12px 20px;
      font-weight: 600; z-index: 9998; display: flex;
      align-items: center; justify-content: center; gap: 15px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    ">
      <span style="flex:1; cursor:pointer;" onclick="window.open('${bannerData.link}', '_blank')">${bannerData.text}</span>
      <button style="
        background: none; border: none; color: white;
        font-size: 22px; cursor: pointer; line-height: 1;
      " onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;
  document.body.prepend(banner);
}
