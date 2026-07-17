/* ===================================================
   Zero to Pro Computer & AI Academy – script.js
   =================================================== */

// Set this version whenever you update the site.
// When changed, the popup will be shown again.
const APP_VERSION = "1.1";

// ---------- DARK / LIGHT MODE ----------
const body = document.body;
const darkToggle = document.getElementById('darkToggle');

// Default dark mode (no 'light' class)
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

const storedVersion = localStorage.getItem('appVersion');
if (storedVersion !== APP_VERSION) {
  // Show popup for new version or first visit
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

// Close mobile menu when any link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});


// ---------- COURSES DATA (DYNAMIC SWIPER) ----------
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

const coursesWrapper = document.getElementById('coursesWrapper');
courses.forEach(c => {
  const msg = `Hi, I want to enroll in *${c.name}* (Fee: Rs. ${c.fee}). Please guide me.`;
  const link = `https://wa.me/923061565858?text=${encodeURIComponent(msg)}`;

  const slide = document.createElement('div');
  slide.className = 'swiper-slide';
  slide.innerHTML = `
    <div class="course-swiper-card">
      <h3>${c.name}</h3>
      <p class="course-fee">Rs. ${c.fee}</p>
      <p>${c.desc}</p>
      ${c.cert ? '<span class="badge" style="background:#06b6d4; color:#000; padding:4px 12px; border-radius:12px;">🎓 Certificate</span>' : ''}
      <a href="${link}" target="_blank" class="btn btn-primary" style="margin-top:15px;">Enroll Now</a>
    </div>`;
  coursesWrapper.appendChild(slide);
});


// ---------- STATIC REVIEWS (CAROUSEL) ----------
const reviewsData = [
  { name: "Ahmed", text: "Best decision! Got a job." },
  { name: "Sara", text: "I was afraid of computers, now I teach others." },
  { name: "Usman", text: "Earned my first $100 online." },
  { name: "Ayesha", text: "Canva course is amazing." }
];

const revWrap = document.getElementById('reviewsWrapper');
reviewsData.forEach(r => {
  const div = document.createElement('div');
  div.className = 'swiper-slide';
  div.innerHTML = `
    <div style="background:var(--card-bg); padding:20px; border-radius:16px;">
      <p>⭐ 5.0</p>
      <p>"${r.text}"</p>
      <strong>${r.name}</strong>
    </div>`;
  revWrap.appendChild(div);
});


// ---------- USER REVIEWS (MODAL + LOCAL STORAGE) ----------
const reviewModal = document.getElementById('reviewModal');
const openReviewBtn = document.getElementById('openReviewModal');
const closeReviewModal = document.getElementById('closeReviewModal');
const submitReviewBtn = document.getElementById('submitReviewBtn');
const reviewerNameInput = document.getElementById('reviewerName');
const reviewMessageInput = document.getElementById('reviewMessage');
const starInputs = document.querySelectorAll('#starRating input[name="rating"]');
const userReviewsContainer = document.getElementById('userReviewsContainer');

// Open/close modal
openReviewBtn.addEventListener('click', () => {
  reviewModal.classList.add('active');
});
closeReviewModal.addEventListener('click', () => {
  reviewModal.classList.remove('active');
});
window.addEventListener('click', (e) => {
  if (e.target === reviewModal) reviewModal.classList.remove('active');
});

// Load reviews from localStorage
function loadUserReviews() {
  const reviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
  userReviewsContainer.innerHTML = '';
  reviews.forEach(r => {
    const card = document.createElement('div');
    card.className = 'user-review-card';
    card.innerHTML = `
      <div class="user-review-header">
        <span class="user-review-name">${r.name}</span>
        <span class="user-review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
      </div>
      <div class="user-review-text">${r.text}</div>`;
    userReviewsContainer.appendChild(card);
  });
}
loadUserReviews();

// Submit review
submitReviewBtn.addEventListener('click', () => {
  const name = reviewerNameInput.value.trim();
  const text = reviewMessageInput.value.trim();
  const ratingElem = document.querySelector('#starRating input[name="rating"]:checked');

  if (!name || !text || !ratingElem) {
    alert('Please fill all fields and select a rating.');
    return;
  }

  const rating = parseInt(ratingElem.value);
  const newReview = { name, text, rating };
  const reviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
  reviews.unshift(newReview);   // latest first
  localStorage.setItem('userReviews', JSON.stringify(reviews));

  // Reset form and close modal
  reviewerNameInput.value = '';
  reviewMessageInput.value = '';
  starInputs.forEach(i => i.checked = false);
  reviewModal.classList.remove('active');
  loadUserReviews();
});


// ---------- COMMENTS CAROUSEL ----------
const comments = [
  "Hamza: Just enrolled! 🚀",
  "Zainab: Mentor helped me instantly 💯",
  "Owais: Academy feels like family ❤️"
];

const comWrap = document.getElementById('commentsWrapper');
comments.forEach(c => {
  const div = document.createElement('div');
  div.className = 'swiper-slide';
  div.innerHTML = `<div style="background:var(--card-bg); padding:15px; border-radius:12px;">${c}</div>`;
  comWrap.appendChild(div);
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
    const answer = this.nextElementSibling;
    answer.classList.toggle('open');
    this.querySelector('span').textContent = answer.classList.contains('open') ? '➖' : '➕';
  });
});


// ---------- COUNTDOWN TIMER (3 days) ----------
const countdownEl = document.getElementById('countdown');
const endDate = new Date();
endDate.setDate(endDate.getDate() + 3);

function updateCountdown() {
  const diff = endDate - new Date();
  if (diff <= 0) {
    countdownEl.textContent = 'Expired';
    return;
  }
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  countdownEl.textContent = `${h}h ${m}m ${s}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();


// ---------- LIVE NOTIFICATION ----------
const notif = document.getElementById('liveNotification');
const msgs = [
  "Ahmed enrolled in Python 🎉",
  "Sara joined AI course 👏",
  "Usman booked demo 🚀"
];
let idx = 0;
setInterval(() => {
  notif.textContent = msgs[idx % 3];
  notif.style.display = 'block';
  setTimeout(() => { notif.style.display = 'none'; }, 4000);
  idx++;
}, 8000);


// ---------- INITIALIZE SWIPERS & AOS (AFTER DOM READY) ----------
document.addEventListener('DOMContentLoaded', () => {
  // Courses Coverflow Swiper (pauses on interaction, shows arrows)
  new Swiper('.courseSwiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 30,
      stretch: 0,
      depth: 150,
      modifier: 1,
      slideShadows: true
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,  // stops after user swipes or clicks
      pauseOnMouseEnter: true
    }
  });

  // Reviews Swiper
  new Swiper('.reviewSwiper', {
    slidesPerView: 1.2,
    spaceBetween: 15,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    breakpoints: {
      768: { slidesPerView: 2 }
    }
  });

  // Comments Swiper
  new Swiper('.commentSwiper', {
    slidesPerView: 2,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    breakpoints: {
      480: { slidesPerView: 1 }
    }
  });

  // Animate on Scroll
  AOS.init({
    duration: 800,
    once: true
  });
});
