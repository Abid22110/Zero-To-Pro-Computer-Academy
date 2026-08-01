// ========== PROMOTIONAL BANNER ==========
const bannerData = {
  show: true,   // false to hide the banner
  text: "🚀 New Course Launched! 50% Discount – Enroll Now",
  link: "https://wa.me/923061565858?text=I%20want%20to%20enroll%20in%20the%20new%20course"
};

if (bannerData.show) {
  const banner = document.createElement('div');
  banner.id = 'promoBanner';
  banner.innerHTML = `
    <div style="
      position: fixed; top: 0; left: 0; width: 100%;
      background: linear-gradient(90deg, #F59E0B, #fbbf24);
      color: #000; text-align: center; padding: 12px 20px;
      font-weight: 600; z-index: 9998; display: flex;
      align-items: center; justify-content: center; gap: 15px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    ">
      <span style="flex:1; cursor:pointer;" onclick="window.open('${bannerData.link}', '_blank')">${bannerData.text}</span>
      <button style="
        background: none; border: none; color: #000;
        font-size: 22px; cursor: pointer; line-height: 1;
      " onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;
  document.body.prepend(banner);
  document.body.style.paddingTop = '50px';
}
