/* ===================================================
   Zero to Pro Computer & AI Academy – script.js
   =================================================== */

// ---------- Dark / Light Mode Toggle ----------
const body = document.body;
const darkToggle = document.getElementById('darkToggle');
// default dark mode
body.classList.remove('light');
darkToggle.textContent = '☀️ Light';

darkToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  darkToggle.textContent = body.classList.contains('light') ? '🌙 Dark' : '☀️ Light';
});


// ---------- Popup Logic ----------
const popupOverlay = document.getElementById('popupOverlay');
const mainSite = document.getElementById('mainSite');
const closePopup = document.getElementById('closePopup');
const exploreBtn = document.getElementById('exploreBtn');
const popupPoster = document.getElementById('popupPoster');

// Show popup only once per session
if (!sessionStorage.getItem('popupShown')) {
  popupOverlay.style.display = 'flex';
  mainSite.style.display = 'none';
} else {
  popupOverlay.style.display = 'none';
  mainSite.style.display = 'block';
}

closePopup.addEventListener('click', () => {
  popupOverlay.style.display = 'none';
  mainSite.style.display = 'block';
  sessionStorage.setItem('popupShown', 'true');
});

exploreBtn.addEventListener('click', (e) => {
  e.preventDefault();
  popupOverlay.style.display = 'none';
  mainSite.style.display = 'block';
  sessionStorage.setItem('popupShown', 'true');
});

// Clicking the poster opens WhatsApp
popupPoster.addEventListener('click', () => {
  window.open('https://wa.me/923061565858', '_blank');
});


// ---------- Mobile Navigation ----------
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});


// ---------- Courses Data & Coverflow Swiper ----------
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


// ---------- Static Reviews Swiper ----------
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
  div.innerHTML = `<div style="background:var(--card-bg); padding:20px; border-radius:16px;"><p>⭐ 5.0</p><p>"${r.text}"</p><strong>${r.name}</strong></div>`;
  revWrap.appendChild(div);
});


// ---------- User Review Submission (Local Storage) ----------
const userReviewsContainer = document.getElementById('userReviewsContainer');
const submitBtn = document.getElementById('submitReviewBtn');
const reviewerName = document.getElementById('reviewerName');
const reviewMessage = document.getElementById('reviewMessage');
const starInputs = document.querySelectorAll('input[name="rating"]');

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
      <div class="user-review-text">${r.text}</div>
    `;
    userReviewsContainer.appendChild(card);
  });
}
loadUserReviews();

submitBtn.addEventListener('click', () => {
  const name = reviewerName.value.trim();
  const text = reviewMessage.value.trim();
  const ratingElem = document.querySelector('input[name="rating"]:checked');
  if (!name || !text || !ratingElem) {
    alert('Please enter your name, select a rating, and write a review.');
    return;
  }
  const rating = parseInt(ratingElem.value);
  const newReview = { name, text, rating };
  const reviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
  reviews.unshift(newReview);
  localStorage.setItem('userReviews', JSON.stringify(reviews));
  reviewerName.value = '';
  reviewMessage.value = '';
  starInputs.forEach(i => i.checked = false);
  loadUserReviews();
});


// ---------- Comments Carousel ----------
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


// ---------- FAQ Accordion ----------
const faqContainer = document.getElementById('faqContainer');
const faqs = [
  { q: "Do I need prior knowledge?", a: "No, we start from absolute zero." },
  { q: "How to get certificate?", a: "Complete course and projects." },
  { q: "How to pay?", a: "JazzCash/EasyPaisa: 0304 6491358 (Abid Hussain)." }
];
faqs.forEach(f => {
  const div = document.createElement('div');
  div.className = 'faq-item';
  div.innerHTML = `<div class="faq-question">${f.q} <span>➕</span></div><div class="faq-answer">${f.a}</div>`;
  faqContainer.appendChild(div);
  div.querySelector('.faq-question').addEventListener('click', function () {
    const ans = this.nextElementSibling;
    ans.classList.toggle('open');
    this.querySelector('span').textContent = ans.classList.contains('open') ? '➖' : '➕';
  });
});


// ---------- Countdown Timer (3 days) ----------
const countdownEl = document.getElementById('countdown');
const endDate = new Date();
endDate.setDate(endDate.getDate() + 3);
function updateCountdown() {
  const diff = endDate - new Date();
  if (diff <= 0) {
    countdownEl.textContent = "Expired";
    return;
  }
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  countdownEl.textContent = `${h}h ${m}m ${s}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();


// ---------- Live Notification ----------
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


// ---------- Initialize Swipers & AOS after DOM ready ----------
document.addEventListener('DOMContentLoaded', () => {
  // Courses Coverflow Swiper
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
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    }
  });

  // Reviews Swiper
  new Swiper('.reviewSwiper', {
    slidesPerView: 1.2,
    spaceBetween: 15,
    loop: true,
    autoplay: { delay: 3000 },
    breakpoints: {
      768: { slidesPerView: 2 }
    }
  });

  // Comments Swiper
  new Swiper('.commentSwiper', {
    slidesPerView: 2,
    spaceBetween: 10,
    loop: true,
    autoplay: { delay: 2000 },
    breakpoints: {
      480: { slidesPerView: 1 }
    }
  });

  // AOS (Animate on Scroll) Init
  AOS.init({ duration: 800, once: true });
});
