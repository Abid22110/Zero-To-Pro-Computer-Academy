const body = document.body;
const darkToggle = document.getElementById('darkToggle');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

function setTheme(isDark) {
  if (isDark) {
    body.classList.remove('light');
    if (darkToggle) darkToggle.textContent = '☀️ Light';
  } else {
    body.classList.add('light');
    if (darkToggle) darkToggle.textContent = '🌙 Dark';
  }
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
setTheme(prefersDark.matches);
prefersDark.addEventListener('change', (e) => setTheme(e.matches));
if (darkToggle) darkToggle.addEventListener('click', () => setTheme(body.classList.contains('light')));

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
}

const typewriterElement = document.getElementById('typewriter');
const phrases = ["Zero to Pro Computer & AI Academy", "Learn Today • Build Tomorrow", "Transform Your Future"];
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function typeWriter() {
  if (!typewriterElement) return;
  const current = phrases[phraseIndex];
  typewriterElement.textContent = isDeleting ? current.substring(0, charIndex--) : current.substring(0, charIndex++);
  if (!isDeleting && charIndex === current.length + 1) { isDeleting = true; setTimeout(typeWriter, 1200); return; }
  if (isDeleting && charIndex < 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; charIndex = 0; }
  setTimeout(typeWriter, isDeleting ? 40 : 90);
}
typeWriter();

const courses = [
  { name: "Basic Computer", fee: 2500, desc: "Computer fundamentals, MS Office, internet, safety." },
  { name: "Typing Course", fee: 2500, desc: "Professional typing skills in English and Urdu." },
  { name: "Web Development", fee: 10000, desc: "HTML, CSS, JavaScript, React basics." }
];

const track = document.getElementById('coursesTrack');
const dotsContainer = document.getElementById('courseDots');
let courseIndex = 0;

function renderCourses() {
  if (!track || !dotsContainer) return;
  track.innerHTML = '';
  dotsContainer.innerHTML = '';

  courses.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
      <h3>${c.name}</h3>
      <p class="course-fee">${c.fee === 0 ? 'FREE' : 'Rs. ' + c.fee.toLocaleString('en-PK')}</p>
      <p>${c.desc}</p>
    `;
    track.appendChild(card);

    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.style.width = '10px';
    dot.style.height = '10px';
    dot.style.borderRadius = '50%';
    dot.style.border = 'none';
    dot.style.margin = '0 4px';
    dot.style.cursor = 'pointer';
    dot.style.background = i === 0 ? '#06B6D4' : '#475569';
    dot.addEventListener('click', () => goToCourse(i));
    dotsContainer.appendChild(dot);
  });
}

function goToCourse(i) {
  if (!track) return;
  courseIndex = i;
  track.style.transform = `translateX(-${i * 100}%)`;
  [...dotsContainer.children].forEach((d, idx) => d.style.background = idx === i ? '#06B6D4' : '#475569');
}

document.getElementById('prevCourse')?.addEventListener('click', () => {
  courseIndex = (courseIndex - 1 + courses.length) % courses.length;
  goToCourse(courseIndex);
});

document.getElementById('nextCourse')?.addEventListener('click', () => {
  courseIndex = (courseIndex + 1) % courses.length;
  goToCourse(courseIndex);
});

renderCourses();

AOS.init({ duration: 800, once: true });
