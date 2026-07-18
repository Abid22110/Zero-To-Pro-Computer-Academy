/* ===================================================
   Zero to Pro Computer & AI Academy – script.js
   =================================================== */

const APP_VERSION = "1.7";

// ---------- DARK / LIGHT MODE ----------
const body = document.body;
const darkToggle = document.getElementById('darkToggle');
body.classList.remove('light');
darkToggle.textContent = '☀️ Light';
darkToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  darkToggle.textContent = body.classList.contains('light') ? '🌙 Dark' : '☀️ Light';
});

// ---------- POPUP ----------
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

popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.style.display = 'none';
    mainSite.style.display = 'block';
    localStorage.setItem('appVersion', APP_VERSION);
  }
});

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

// ---------- HERO POSTER SLIDESHOW ----------
const posterImages = document.querySelectorAll('#heroPosterSlideshow img');
let currentPoster = 0;
if (posterImages.length > 0) {
  setInterval(() => {
    posterImages[currentPoster].classList.remove('active');
    currentPoster = (currentPoster + 1) % posterImages.length;
    posterImages[currentPoster].classList.add('active');
  }, 4000);
}

// ---------- COURSES DATA & CUSTOM CAROUSEL ----------
const courses = [
  { name: "Basic Computer", fee: "1,500", desc: "Computer fundamentals, MS Office, internet, safety.", topics: ["Computer Fundamentals", "Windows OS", "File/Folder Management", "Internet & Browsing", "Gmail & Google Workspace", "MS Word", "MS Excel", "MS PowerPoint", "PDF Tools", "Typing Skills", "Printing & Scanning", "Digital Safety"], cert: true, duration: "4 Weeks" },
  { name: "Basic Computer + AI", fee: "2,500", desc: "ChatGPT, Gemini, Copilot, AI tools.", topics: ["Everything in Basic Computer", "ChatGPT", "Google Gemini", "Microsoft Copilot", "AI Prompt Engineering", "AI for Students", "AI for Office Work", "AI Content Creation", "AI Image Generation", "AI Presentations", "AI Resume Builder", "AI Productivity Tools"], cert: true, duration: "6 Weeks" },
  { name: "Basic Computer + AI + Auto", fee: "3,500", desc: "AI automation, workflows. (Standard)", topics: ["Basic Computer", "AI Tools", "AI Automation", "Workflow Automation", "Smart Productivity Tools"], cert: true, duration: "8 Weeks" },
  { name: "Premium Automation", fee: "5,000", desc: "All above + 3 certificates. Ultimate.", topics: ["Complete Basic Computer", "Advanced AI Tools", "Advanced Automation", "Real-World Projects", "3 Certificates"], cert: true, duration: "12 Weeks" },
  { name: "Graphic Design", fee: "4,000", desc: "Design principles, Canva, Photoshop.", topics: ["Design Fundamentals", "Color Theory", "Typography", "Canva Mastery", "Adobe Photoshop Basics", "Logo Design", "Social Media Graphics"], cert: false, duration: "6 Weeks" },
  { name: "Video Editing", fee: "5,000", desc: "CapCut, Premiere, effects.", topics: ["Video Basics", "CapCut Pro", "Adobe Premiere Pro", "Transitions & Effects", "Color Grading", "Audio Editing", "Export & Delivery"], cert: false, duration: "6 Weeks" },
  { name: "Web Development", fee: "8,000", desc: "HTML, CSS, JS, responsive sites.", topics: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Git & GitHub", "Hosting & Deployment"], cert: false, duration: "12 Weeks" },
  { name: "Python Programming", fee: "7,000", desc: "Basics to automation, data analysis.", topics: ["Python Syntax", "Data Types & Structures", "Functions & Modules", "File Handling", "Web Scraping", "Data Analysis (Pandas)"], cert: false, duration: "10 Weeks" },
  { name: "Digital Marketing", fee: "6,000", desc: "SEO, Ads, email marketing.", topics: ["SEO Fundamentals", "Google Ads", "Facebook Ads", "Email Marketing", "Social Media Strategy", "Analytics"], cert: false, duration: "8 Weeks" },
  { name: "Freelancing", fee: "3,500", desc: "Fiverr, Upwork success.", topics: ["Profile Creation", "Gig Optimization", "Bidding Strategies", "Client Communication", "Payment Methods", "Portfolio Building"], cert: false, duration: "4 Weeks" },
  { name: "Ethical Hacking", fee: "7,500", desc: "Penetration testing, security.", topics: ["Networking Basics", "Linux Fundamentals", "Footprinting & Recon", "Scanning Networks", "Vulnerability Analysis", "Exploitation Basics"], cert: false, duration: "10 Weeks" },
  { name: "Resume & CV", fee: "1,000", desc: "ATS-friendly resumes.", topics: ["Resume Structure", "Action Verbs", "Formatting", "Cover Letter", "LinkedIn Optimization"], cert: false, duration: "1 Week" }
];

const track = document.getElementById('coursesTrack');
const dotsContainer = document.getElementById('courseDots');
let courseIndex = 0;
let courseInterval;

function renderCourses() {
  track.innerHTML = '';
  dotsContainer.innerHTML = '';
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
      <button class="btn btn-outline view-details" data-index="${i}" style="margin:10px 0;">📋 View Details</button>
      <a href="${link}" target="_blank" class="btn btn-primary" style="margin-top:10px;">Enroll Now</a>
    `;
    track.appendChild(card);
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToCourse(i));
    dotsContainer.appendChild(dot);
  });

  equalizeCourseCards();

  document.querySelectorAll('.view-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      openCourseModal(courses[index]);
    });
  });
}
renderCourses();

function equalizeCourseCards() {
  const cards = track.querySelectorAll('.course-card');
  cards.forEach(c => { c.style.height = 'auto'; });
  let maxHeight = 0;
  cards.forEach(c => { const h = c.offsetHeight; if (h > maxHeight) maxHeight = h; });
  cards.forEach(c => { c.style.height = maxHeight + 'px'; });
}

// Recalculate heights after all assets load and on resize
window.addEventListener('load', () => {
  equalizeCourseCards();
});
window.addEventListener('resize', () => {
  equalizeCourseCards();
});

function goToCourse(index) {
  courseIndex = index;
  track.style.transform = `translateX(-${index * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === index));
  resetCourseInterval();
}

function nextCourse() { courseIndex = (courseIndex + 1) % courses.length; goToCourse(courseIndex); }
function resetCourseInterval() { clearInterval(courseInterval); courseInterval = setInterval(nextCourse, 3000); }

document.getElementById('prevCourse').addEventListener('click', () => {
  courseIndex = (courseIndex - 1 + courses.length) % courses.length;
  goToCourse(courseIndex);
});
document.getElementById('nextCourse').addEventListener('click', () => nextCourse());
resetCourseInterval();

// ---------- COURSE DETAIL MODAL ----------
const courseModal = document.getElementById('courseModal');
const closeCourseModal = document.getElementById('closeCourseModal');
const courseModalContent = document.getElementById('courseModalContent');

function openCourseModal(course) {
  const msg = `Hi, I want to enroll in *${course.name}* (Fee: Rs. ${course.fee}). Please guide me.`;
  const link = `https://wa.me/923061565858?text=${encodeURIComponent(msg)}`;
  courseModalContent.innerHTML = `
    <h2>${course.name}</h2>
    <p style="font-size:1.4rem; color:var(--gold); font-weight:700;">Fee: Rs. ${course.fee}</p>
    <p><strong>Duration:</strong> ${course.duration}</p>
    <p><strong>Certificate:</strong> ${course.cert ? 'Yes' : 'No'}</p>
    <h4>Topics Covered:</h4>
    <ul class="topic-list">${course.topics.map(t => `<li>✅ ${t}</li>`).join('')}</ul>
    <a href="${link}" target="_blank" class="btn btn-primary" style="display:inline-block; margin-top:15px;">Enroll Now</a>
  `;
  courseModal.classList.add('active');
  disableBodyScroll();
}

closeCourseModal.addEventListener('click', () => { courseModal.classList.remove('active'); enableBodyScroll(); });
window.addEventListener('click', (e) => { if (e.target === courseModal) { courseModal.classList.remove('active'); enableBodyScroll(); } });

// ---------- REVIEWS ----------
const staticReviews = [
  { name: "Ahmed", text: "Best decision! Got a job.", rating: 5 },
  { name: "Sara", text: "I was afraid of computers, now I teach others.", rating: 5 },
  { name: "Usman", text: "Earned my first $100 online.", rating: 5 },
  { name: "Ayesha", text: "Canva course is amazing.", rating: 5 },
  { name: "Fatima", text: "Python course helped me land an internship.", rating: 5 },
  { name: "Zainab", text: "The teachers are incredibly supportive.", rating: 5 },
  { name: "Bilal", text: "Web development course changed my career.", rating: 5 },
  { name: "Hira", text: "Freelancing tips are gold! Already got two clients.", rating: 5 },
  { name: "Ali", text: "Ethical hacking basics were mind-blowing.", rating: 4 },
  { name: "Marium", text: "I built my first website thanks to this academy.", rating: 5 },
  { name: "Owais", text: "The AI tools section saved me hours every day.", rating: 5 },
  { name: "Anam", text: "Resume and CV course helped me get noticed by recruiters.", rating: 4 },
  { name: "Hamza", text: "I love the practical assignments.", rating: 5 },
  { name: "Kinza", text: "Canva masterclass made designing fun.", rating: 5 },
  { name: "Talha", text: "Python is no longer scary.", rating: 5 }
];

const reviewTrack = document.getElementById('reviewTrack');
staticReviews.forEach(r => {
  const div = document.createElement('div');
  div.className = 'review-card';
  div.innerHTML = `<p class="rating-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</p><p>"${r.text}"</p><strong>${r.name}</strong>`;
  reviewTrack.appendChild(div);
});

let reviewIndex = 0;
function goToReview(idx) {
  reviewIndex = idx;
  reviewTrack.style.transform = `translateX(-${reviewIndex * 100}%)`;
}
setInterval(() => {
  reviewIndex = (reviewIndex + 1) % staticReviews.length;
  goToReview(reviewIndex);
}, 4000);

// ---------- VIEW ALL REVIEWS MODAL ----------
const allReviewsModal = document.getElementById('allReviewsModal');
const viewAllBtn = document.getElementById('viewAllReviews');
const closeAllReviewsModal = document.getElementById('closeAllReviewsModal');
const allReviewsList = document.getElementById('allReviewsList');

function renderAllReviews() {
  const userReviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
  const all = [...staticReviews, ...userReviews.map(u => ({ name: u.name, text: u.text, rating: u.rating }))];
  allReviewsList.innerHTML = all.map(r => `
    <div class="review-item">
      <div style="display:flex; justify-content:space-between;">
        <strong>${r.name}</strong>
        <span>${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
      </div>
      <div style="margin-top:5px;">${r.text}</div>
    </div>
  `).join('');
}

viewAllBtn.addEventListener('click', () => {
  renderAllReviews();
  allReviewsModal.classList.add('active');
  disableBodyScroll();
});
closeAllReviewsModal.addEventListener('click', () => { allReviewsModal.classList.remove('active'); enableBodyScroll(); });
window.addEventListener('click', (e) => { if (e.target === allReviewsModal) { allReviewsModal.classList.remove('active'); enableBodyScroll(); } });

// ---------- USER REVIEW SUBMISSION ----------
const reviewModal = document.getElementById('reviewModal');
const openReviewBtn = document.getElementById('openReviewModal');
const closeReviewModal = document.getElementById('closeReviewModal');
const submitReviewBtn = document.getElementById('submitReviewBtn');
const reviewerNameInput = document.getElementById('reviewerName');
const reviewMessageInput = document.getElementById('reviewMessage');
const starInputs = document.querySelectorAll('#starRating input[name="rating"]');

openReviewBtn.addEventListener('click', () => { reviewModal.classList.add('active'); disableBodyScroll(); });
closeReviewModal.addEventListener('click', () => { reviewModal.classList.remove('active'); enableBodyScroll(); });
window.addEventListener('click', (e) => { if (e.target === reviewModal) { reviewModal.classList.remove('active'); enableBodyScroll(); } });

submitReviewBtn.addEventListener('click', () => {
  const name = reviewerNameInput.value.trim();
  const text = reviewMessageInput.value.trim();
  const ratingElem = document.querySelector('#starRating input[name="rating"]:checked');
  if (!name || !text || !ratingElem) { alert('Please fill all fields and select a rating.'); return; }
  const rating = parseInt(ratingElem.value);
  const reviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
  reviews.unshift({ name, text, rating });
  localStorage.setItem('userReviews', JSON.stringify(reviews));
  reviewerNameInput.value = ''; reviewMessageInput.value = ''; starInputs.forEach(i => i.checked = false);
  reviewModal.classList.remove('active');
  enableBodyScroll();
});

// ---------- COMMENTS AUTO-SLIDE ----------
const comments = ["Hamza: Just enrolled! 🚀", "Zainab: Mentor helped me instantly 💯", "Owais: Academy feels like family ❤️"];
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
setInterval(() => {
  commentIndex = (commentIndex + 1) % comments.length;
  goToComment(commentIndex);
}, 3000);

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
  div.innerHTML = `<div class="faq-question">${f.q} <span>➕</span></div><div class="faq-answer">${f.a}</div>`;
  faqContainer.appendChild(div);
  div.querySelector('.faq-question').addEventListener('click', function () {
    const ans = this.nextElementSibling;
    ans.classList.toggle('open');
    this.querySelector('span').textContent = ans.classList.contains('open') ? '➖' : '➕';
  });
});

// ---------- COUNTDOWN TIMER (SMOOTH – KEEPS SPACE) ----------
const countdownSection = document.getElementById('countdownSection');
const countdownEl = document.getElementById('countdown');
const endDate = new Date();
endDate.setDate(endDate.getDate() + 3);

const timerInterval = setInterval(() => {
  const diff = endDate - new Date();
  if (diff <= 0) {
    countdownEl.textContent = "Expired";
    clearInterval(timerInterval);
    // Instead of collapsing height, just hide the content while keeping the section space
    countdownSection.style.opacity = '0';
    countdownSection.style.visibility = 'hidden';
    countdownSection.style.pointerEvents = 'none';
  } else {
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    countdownEl.textContent = `${h}h ${m}m ${s}s`;
  }
}, 1000);

// ---------- LIVE NOTIFICATION ----------
const notif = document.getElementById('liveNotification');
const msgs = [
  "Ahmed enrolled in Python 🎉",
  "Sara joined AI course 👏",
  "Usman booked demo 🚀",
  "Ayesha accepted invite ✅"
];
let idx = 0;
setInterval(() => {
  notif.style.opacity = '0';
  setTimeout(() => {
    notif.textContent = msgs[idx % 4];
    notif.classList.add('visible');
  }, 200);
  setTimeout(() => {
    notif.style.opacity = '0';
    setTimeout(() => notif.classList.remove('visible'), 200);
  }, 4000);
  idx++;
}, 8000);

// ---------- BACK TO TOP ----------
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 300);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- SCROLLBAR WIDTH COMPENSATION ----------
function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}
function disableBodyScroll() {
  const scrollbarWidth = getScrollbarWidth();
  document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
  body.classList.add('no-scroll');
}
function enableBodyScroll() {
  body.classList.remove('no-scroll');
}

// ---------- AOS INITIALIZE ----------
AOS.init({ duration: 800, once: true });
