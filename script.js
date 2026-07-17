/* ===================================================
   Zero to Pro Computer & AI Academy – script.js
   =================================================== */

const APP_VERSION = "1.3"; // Change to force popup again

// ---------- DARK / LIGHT MODE ----------
const body = document.body;
const darkToggle = document.getElementById('darkToggle');
body.classList.remove('light');
darkToggle.textContent = '☀️ Light';
darkToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  darkToggle.textContent = body.classList.contains('light') ? '🌙 Dark' : '☀️ Light';
});

// ---------- POPUP (version‑based reappearance) ----------
const popupOverlay = document.getElementById('popupOverlay');
const mainSite = document.getElementById('mainSite');
const closePopupBtn = document.getElementById('closePopup');
const exploreBtn = document.getElementById('exploreBtn');
const popupPoster = document.getElementById('popupPoster');

if (localStorage.getItem('appVersion') !== APP_VERSION) {
  popupOverlay.style.display = 'flex';
  mainSite.style.display = 'none';
} else {
  popupOverlay.style.display = 'none';
  mainSite.style.display = 'block';
}

closePopupBtn.addEventListener('click', () => {
  popupOverlay.style.display = 'none';
  mainSite.style.display = 'block';
  localStorage.setItem('appVersion', APP_VERSION);
});

exploreBtn.addEventListener('click', (e) => {
  e.preventDefault();
  popupOverlay.style.display = 'none';
  mainSite.style.display = 'block';
  localStorage.setItem('appVersion', APP_VERSION);
});

// Close popup when clicking on the overlay background
popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.style.display = 'none';
    mainSite.style.display = 'block';
    localStorage.setItem('appVersion', APP_VERSION);
  }
});

// Clicking the poster opens WhatsApp
popupPoster.addEventListener('click', () => {
  window.open('https://wa.me/923061565858', '_blank');
});

// ---------- MOBILE NAVIGATION ----------
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ---------- COURSES DATA & CUSTOM CAROUSEL ----------
const courses = [
  { name: "Basic Computer", fee: "1,500", desc: "Computer fundamentals, MS Office, internet, safety.", cert: true },
  { name: "Basic Computer + AI", fee: "2,500", desc: "ChatGPT, Gemini, Copilot, AI tools.", cert: true },
  { name: "Basic Computer + AI + Auto", fee: "3,500", desc: "AI automation, workflows. (Standard)", cert: true },
  { name: "Premium Automation", fee: "5,000", desc: "All above + 3 certificates. Ultimate.", cert: true },
  { name: "Graphic Design", fee: "4,000", desc: "Design principles, Canva, Photoshop.", cert: false },
  { name: "Video Editing", fee: "5,000", desc: "CapCut, Premiere, effects.", cert: false },
  { name: "Web Development", fee: "8,000", desc: "HTML, CSS, JS, responsive sites.", cert: false },
  { name: "Python Programming", fee: "7,000", desc: "Basics to automation, data analysis.", cert: false },
  { name: "Digital Marketing", fee: "6,000", desc: "SEO, Ads, email marketing.", cert: false },
  { name: "Freelancing", fee: "3,500", desc: "Fiverr, Upwork success.", cert: false },
  { name: "Ethical Hacking", fee: "7,500", desc: "Penetration testing, security.", cert: false },
  { name: "Resume & CV", fee: "1,000", desc: "ATS-friendly resumes.", cert: false }
];

const track = document.getElementById('coursesTrack');
const dotsContainer = document.getElementById('courseDots');
let courseIndex = 0;

courses.forEach((c, i) => {
  const msg = `Hi, I want to enroll in *${c.name}* (Fee: Rs. ${c.fee}). Please guide me.`;
  const link = `https://wa.me/923061565858?text=${encodeURIComponent(msg)}`;

  const card = document.createElement('div');
  card.className = 'course-card';
  card.innerHTML = `
    <h3>${c.name}</h3>
    <p class="course-fee">Rs. ${c.fee}</p>
    <p>${c.desc}</p>
    ${c.cert ? '<span style="background:#06b6d4; color:#000; padding:4px 12px; border-radius:12px; display:inline-block; margin:10px 0;">🎓 Certificate</span>' : ''}
    <a href="${link}" target="_blank" class="btn btn-primary" style="margin-top:15px;">Enroll Now</a>
  `;
  track.appendChild(card);

  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goToCourse(i));
  dotsContainer.appendChild(dot);
});

function goToCourse(index) {
  courseIndex = index;
  const cardWidth = track.firstElementChild.offsetWidth + 20; // gap
  track.style.transform = `translateX(-${index * cardWidth}px)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === index));
}

document.getElementById('prevCourse').addEventListener('click', () => {
  if (courseIndex > 0) goToCourse(courseIndex - 1);
});

document.getElementById('nextCourse').addEventListener('click', () => {
  if (courseIndex < courses.length - 1) goToCourse(courseIndex + 1);
});

// ---------- REVIEWS SLIDER ----------
const reviewsData = [
  { name: "Ahmed", text: "Best decision! Got a job." },
  { name: "Sara", text: "I was afraid of computers, now I teach others." },
  { name: "Usman", text: "Earned my first $100 online." },
  { name: "Ayesha", text: "Canva course is amazing." }
];

const reviewTrack = document.getElementById('reviewTrack');
let reviewIndex = 0;

reviewsData.forEach(r => {
  const div = document.createElement('div');
  div.className = 'review-card';
  div.innerHTML = `<p>⭐ 5.0</p><p>"${r.text}"</p><strong>${r.name}</strong>`;
  reviewTrack.appendChild(div);
});

function goToReview(idx) {
  reviewIndex = idx;
  reviewTrack.style.transform = `translateX(-${reviewIndex * 100}%)`;
}

document.getElementById('prevReview').addEventListener('click', () => {
  if (reviewIndex > 0) goToReview(reviewIndex - 1);
});

document.getElementById('nextReview').addEventListener('click', () => {
  if (reviewIndex < reviewsData.length - 1) goToReview(reviewIndex + 1);
});

// ---------- COMMENTS SLIDER ----------
const comments = [
  "Hamza: Just enrolled! 🚀",
  "Zainab: Mentor helped me instantly 💯",
  "Owais: Academy feels like family ❤️"
];

const commentTrack = document.getElementById('commentTrack');
let commentIndex = 0;

comments.forEach(c => {
  const div = document.createElement('div');
  div.className = 'comment-card';
  div.textContent = c;
  commentTrack.appendChild(div);
});

function goToComment(idx) {
  commentIndex = idx;
  const cardWidth = commentTrack.firstElementChild.offsetWidth + 20;
  commentTrack.style.transform = `translateX(-${commentIndex * cardWidth}px)`;
}

document.getElementById('prevComment').addEventListener('click', () => {
  if (commentIndex > 0) goToComment(commentIndex - 1);
});

document.getElementById('nextComment').addEventListener('click', () => {
  if (commentIndex < comments.length - 1) goToComment(commentIndex + 1);
});

// ---------- REVIEW MODAL ----------
const reviewModal = document.getElementById('reviewModal');
const openReviewBtn = document.getElementById('openReviewModal');
const closeReviewModal = document.getElementById('closeReviewModal');
const submitReviewBtn = document.getElementById('submitReviewBtn');
const reviewerNameInput = document.getElementById('reviewerName');
const reviewMessageInput = document.getElementById('reviewMessage');
const starInputs = document.querySelectorAll('#starRating input[name="rating"]');
const userReviewsContainer = document.getElementById('userReviewsContainer');

openReviewBtn.addEventListener('click', () => reviewModal.classList.add('active'));
closeReviewModal.addEventListener('click', () => reviewModal.classList.remove('active'));
window.addEventListener('click', (e) => {
  if (e.target === reviewModal) reviewModal.classList.remove('active');
});

function loadUserReviews() {
  const reviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
  userReviewsContainer.innerHTML = reviews
    .map(
      r => `
    <div class="review-card" style="margin-bottom:15px;">
      <div style="display:flex; justify-content:space-between;">
        <strong>${r.name}</strong>
        <span>${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
      </div>
      <div>${r.text}</div>
    </div>`
    )
    .join('');
}
loadUserReviews();

submitReviewBtn.addEventListener('click', () => {
  const name = reviewerNameInput.value.trim();
  const text = reviewMessageInput.value.trim();
  const ratingElem = document.querySelector('#starRating input[name="rating"]:checked');
  if (!name || !text || !ratingElem) {
    alert('Please fill all fields and select a rating.');
    return;
  }
  const rating = parseInt(ratingElem.value);
  const reviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
  reviews.unshift({ name, text, rating });
  localStorage.setItem('userReviews', JSON.stringify(reviews));
  reviewerNameInput.value = '';
  reviewMessageInput.value = '';
  starInputs.forEach(i => (i.checked = false));
  reviewModal.classList.remove('active');
  loadUserReviews();
});

// ---------- FAQ ACCORDION ----------
const faqContainer = document.getElementById('faqContainer');
const faqs = [
  { q: "Do I need prior knowledge?", a: "No, we start from absolute zero." },
  { q: "How to get certificate?", a: "Complete course and projects." },
  { q: "How to pay?", a: "JazzCash/EasyPaisa: 0304 6491358 (Abid Hussain)." }
];

faqs.forEach(f => {
  const div = document.createElement('div');
  div.className = 'faq-item';
  div.innerHTML = `
    <div class="faq-question">${f.q} <span>➕</span></div>
    <div class="faq-answer">${f.a}</div>`;
  faqContainer.appendChild(div);
  div.querySelector('.faq-question').addEventListener('click', function () {
    const ans = this.nextElementSibling;
    ans.classList.toggle('open');
    this.querySelector('span').textContent = ans.classList.contains('open') ? '➖' : '➕';
  });
});

// ---------- COUNTDOWN TIMER (3 days) ----------
const countdownEl = document.getElementById('countdown');
const endDate = new Date();
endDate.setDate(endDate.getDate() + 3);

setInterval(() => {
  const diff = endDate - new Date();
  if (diff <= 0) {
    countdownEl.textContent = 'Expired';
    return;
  }
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  countdownEl.textContent = `${h}h ${m}m ${s}s`;
}, 1000);

// ---------- LIVE NOTIFICATION ----------
const notif = document.getElementById('liveNotification');
const msgs = [
  "Ahmed enrolled in Python 🎉",
  "Sara joined AI course 👏",
  "Usman booked demo 🚀"
];
let idx = 0;
setInterval(() => {
  notif.style.opacity = '0';
  setTimeout(() => {
    notif.textContent = msgs[idx % 3];
    notif.style.display = 'block';
    notif.style.opacity = '1';
  }, 200);
  setTimeout(() => {
    notif.style.opacity = '0';
    setTimeout(() => {
      notif.style.display = 'none';
    }, 200);
  }, 4000);
  idx++;
}, 8000);

// ---------- AOS INITIALIZE ----------
AOS.init({ duration: 800, once: true });
