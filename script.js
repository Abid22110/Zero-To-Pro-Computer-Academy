// Safe minimal script to prevent crashes
(function () {
  // Dark/Light toggle
  const darkToggle = document.getElementById('darkToggle');
  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('light');
      darkToggle.textContent = document.body.classList.contains('light') ? '🌙 Dark' : '☀️ Light';
    });
  }

  // Mobile nav
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('active')));
  }

  // Back to top
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (!backToTop) return;
    backToTop.style.display = window.scrollY > 300 ? 'grid' : 'none';
  });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Basic countdown safe
  const countdown = document.getElementById('countdown');
  const countdownSection = document.getElementById('countdownSection');
  const end = new Date('2025-08-14T23:59:59');

  function tick() {
    if (!countdown) return;
    const diff = end - new Date();
    if (diff <= 0) {
      countdown.textContent = 'Offer Expired';
      if (countdownSection) countdownSection.style.display = 'none';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    countdown.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }
  tick();
  setInterval(tick, 1000);
})();
