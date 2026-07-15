AOS.init({ once: true, duration: 800, easing: 'ease-out-cubic' });

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');
const sections = [...document.querySelectorAll('main section[id], header#home')];

hamburger?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinkItems.forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active nav on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkItems.forEach(l => l.classList.remove('active'));
      const id = entry.target.id;
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
      if (id === 'home') document.querySelector('.nav-link[href="#home"]')?.classList.add('active');
    }
  });
}, { threshold: 0.45 });
sections.forEach(s => observer.observe(s));

// Topics toggle
document.querySelectorAll('.toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    target?.classList.toggle('open');
    btn.textContent = target?.classList.contains('open') ? 'Hide Topics' : 'View Topics';
  });
});

// Enroll WhatsApp with burst animation
const waBase = 'https://wa.me/923061565858?text=';
document.querySelectorAll('.enroll').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.add('burst');
    setTimeout(() => btn.classList.remove('burst'), 350);
    const msg = encodeURIComponent(btn.dataset.msg || 'Hello');
    window.open(waBase + msg, '_blank');
  });
});

// Scholarship confetti (load on demand)
let confettiLoaded = false;
async function runConfetti() {
  if (!confettiLoaded) {
    await import('https://cdn.skypack.dev/canvas-confetti');
    confettiLoaded = true;
  }
  if (window.confetti) {
    window.confetti({ particleCount: 90, spread: 75, origin: { y: 0.7 } });
  }
}
const scholar = document.getElementById('scholarship');
const scholarObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      runConfetti();
      scholarObserver.disconnect();
    }
  });
}, { threshold: 0.55 });
if (scholar) scholarObserver.observe(scholar);

// Cursor-follow bubble in contact
const contact = document.getElementById('contact');
const bubble = document.getElementById('chatBubble');
contact?.addEventListener('mousemove', (e) => {
  if (!bubble) return;
  const rect = contact.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  bubble.style.transform = `translate(${Math.min(x / 18, 18)}px, ${Math.min(y / 18, 18)}px)`;
});
