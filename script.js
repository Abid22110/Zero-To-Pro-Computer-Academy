AOS.init({
  once: true,
  duration: 850,
  easing: 'ease-out-cubic'
});

const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

menuToggle?.addEventListener('click', () => {
  menu.classList.toggle('open');
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => menu.classList.remove('open'));
});
