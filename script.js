/* ===================================================
   Zero to Pro Computer & AI Academy – script.js
   Full Featured – All Courses + 50% Independence Day Discount
   =================================================== */

const APP_VERSION = "3.0";

// ========== DARK / LIGHT MODE ==========
const body = document.body;
const darkToggle = document.getElementById('darkToggle');

function setTheme(isDark) {
  if (isDark) {
    body.classList.remove('light');
    darkToggle.textContent = '☀️ Light';
  } else {
    body.classList.add('light');
    darkToggle.textContent = '🌙 Dark';
  }
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
setTheme(prefersDark.matches);
prefersDark.addEventListener('change', (e) => setTheme(e.matches));

darkToggle.addEventListener('click', () => {
  const isLight = body.classList.contains('light');
  setTheme(isLight);
});

// ========== POPUP ==========
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

// ========== MOBILE NAVIGATION ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

window.addEventListener('scroll', () => {
  if (navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
  }
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// ========== TYPEWRITER ==========
const typewriterElement = document.getElementById('typewriter');
const phrases = [
  "Zero to Pro Computer & AI Academy",
  "Learn Today • Build Tomorrow",
  "Transform Your Future"
];
let phraseIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 100;

function typeWriter() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typewriterElement.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50;
  } else {
    typewriterElement.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100;
  }
  if (!isDeleting && charIndex === current.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500;
  }
  setTimeout(typeWriter, typeSpeed);
}
typeWriter();

// ========== ANIMATED COUNTERS ==========
const counters = document.querySelectorAll('.counter-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = +counter.getAttribute('data-target');
      const isFloat = target % 1 !== 0;
      const duration = 2000;
      const start = +counter.innerText;
      const startTime = performance.now();
      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = start + (target - start) * progress;
        counter.innerText = isFloat ? value.toFixed(1) : Math.floor(value);
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.3 });
counters.forEach(c => counterObserver.observe(c));

// ========== COURSE FILTER ==========
const filterButtons = document.querySelectorAll('.filter-btn');
let activeFilter = 'all';
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderCourses();
    goToCourse(0);
    resetCourseInterval();
  });
});

// ========== DISCOUNT SETTINGS ==========
const DISCOUNT_ACTIVE = true;
const DISCOUNT_PERCENT = 50;

function formatFee(fee) {
  if (fee === 0) return "FREE";
  return "Rs. " + fee.toLocaleString("en-PK");
}

function getDiscountedPrice(original) {
  return Math.round(original - (original * DISCOUNT_PERCENT / 100));
}

// ========== ALL COURSES ==========
const courses = [
  {
    name: "Basic Computer",
    fee: 2500,
    desc: "Computer fundamentals, MS Office, internet, safety.",
    topics: ["Computer Fundamentals", "Windows OS", "File/Folder Management", "Internet & Browsing", "Gmail & Google Workspace", "MS Word", "MS Excel", "MS PowerPoint", "PDF Tools", "Typing Skills", "Printing & Scanning", "Digital Safety"],
    cert: true, duration: "4 Weeks", category: "computer", progress: 85
  },
  {
    name: "Typing Course",
    fee: 2500,
    desc: "Professional typing skills in English and Urdu.",
    topics: ["English Typing", "Urdu Typing", "Speed Building", "Accuracy Practice", "Formatting"],
    cert: false, duration: "2 Weeks", category: "computer", progress: 90
  },
  {
    name: "Microsoft Office",
    fee: 4000,
    desc: "Complete MS Word, Excel, PowerPoint, and Outlook.",
    topics: ["MS Word Advanced", "MS Excel Advanced", "MS PowerPoint", "Outlook", "Google Workspace"],
    cert: true, duration: "4 Weeks", category: "computer", progress: 80
  },
  {
    name: "Graphic Designing",
    fee: 7500,
    desc: "Canva, Photoshop, Illustrator – from basics to pro.",
    topics: ["Design Fundamentals", "Color Theory", "Typography", "Canva Mastery", "Adobe Photoshop", "Adobe Illustrator", "Logo Design"],
    cert: true, duration: "6 Weeks", category: "computer", progress: 75
  },
  {
    name: "Video Editing",
    fee: 8000,
    desc: "CapCut, Premiere Pro, After Effects.",
    topics: ["Video Basics", "CapCut Pro", "Adobe Premiere Pro", "Transitions & Effects", "Color Grading", "Audio Editing", "Export & Delivery"],
    cert: true, duration: "6 Weeks", category: "computer", progress: 70
  },
  {
    name: "Digital Marketing",
    fee: 8500,
    desc: "SEO, Social Media, Google Ads, Email Marketing.",
    topics: ["SEO Fundamentals", "Google Ads", "Facebook Ads", "Email Marketing", "Social Media Strategy", "Analytics"],
    cert: true, duration: "8 Weeks", category: "freelancing", progress: 65
  },
  {
    name: "Freelancing",
    fee: 5000,
    desc: "Fiverr, Upwork – profile, bidding, clients.",
    topics: ["Profile Creation", "Gig Optimization", "Bidding Strategies", "Client Communication", "Payment Methods", "Portfolio Building"],
    cert: false, duration: "4 Weeks", category: "freelancing", progress: 90
  },
  {
    name: "Web Development",
    fee: 10000,
    desc: "HTML, CSS, JavaScript, React, responsive sites.",
    topics: ["HTML5", "CSS3", "JavaScript", "React Basics", "Responsive Design", "Git & GitHub", "Hosting & Deployment"],
    cert: true, duration: "12 Weeks", category: "computer", progress: 60
  },
  {
    name: "Programming",
    fee: 12000,
    desc: "Python, C++, Java – fundamentals to advanced.",
    topics: ["Python", "C++", "Java", "Data Structures", "Algorithms", "OOP"],
    cert: true, duration: "12 Weeks", category: "computer", progress: 55
  },
  {
    name: "Networking",
    fee: 10000,
    desc: "CCNA basics, routing, switching, subnetting.",
    topics: ["IP Addressing", "Routing", "Switching", "Subnetting", "CCNA Prep"],
    cert: true, duration: "8 Weeks", category: "computer", progress: 50
  },
  {
    name: "Database Management",
    fee: 9000,
    desc: "SQL, MySQL, MongoDB, data modeling.",
    topics: ["SQL", "MySQL", "MongoDB", "Data Modeling", "Queries"],
    cert: true, duration: "8 Weeks", category: "computer", progress: 45
  },
  {
    name: "Cloud Computing",
    fee: 12000,
    desc: "AWS, Azure, Google Cloud fundamentals.",
    topics: ["AWS", "Azure", "Google Cloud", "Cloud Architecture", "Deployment"],
    cert: true, duration: "10 Weeks", category: "computer", progress: 40
  },
  {
    name: "Cyber Security",
    fee: 15000,
    desc: "Network security, firewalls, threat analysis.",
    topics: ["Security Basics", "Firewalls", "Threat Analysis", "Encryption", "Incident Response"],
    cert: true, duration: "10 Weeks", category: "computer", progress: 35
  },
  {
    name: "Ethical Hacking",
    fee: 18000,
    desc: "Penetration testing, vulnerability assessment.",
    topics: ["Networking", "Linux", "Reconnaissance", "Scanning", "Exploitation", "Reporting"],
    cert: true, duration: "12 Weeks", category: "computer", progress: 30
  },
  {
    name: "Artificial Intelligence (AI)",
    fee: 20000,
    desc: "Machine learning, deep learning, NLP.",
    topics: ["ML Basics", "Deep Learning", "NLP", "Computer Vision", "Python AI"],
    cert: true, duration: "12 Weeks", category: "ai", progress: 25
  },
  {
    name: "AI Automation",
    fee: 25000,
    desc: "Advanced AI tools, workflow automation, chatbots.",
    topics: ["AI Tools", "Workflow Automation", "Chatbots", "API Integration", "Real Projects"],
    cert: true, duration: "12 Weeks", category: "ai", progress: 20
  },
  {
    name: "Al-Quran Al-Karim",
    fee: 0,
    desc: "Learn specific Surahs with proper Tajweed – completely free for everyone.",
    topics: ["Surah Al-Fatiha", "Surah Yaseen", "Surah Ar-Rahman", "Surah Al-Mulk", "Surah Al-Waqi'ah", "Tajweed Basics"],
    cert: false, duration: "Ongoing", category: "free", progress: 100
  }
];

// ========== COURSES CAROUSEL ==========
const track = document.getElementById('coursesTrack');
const dotsContainer = document.getElementById('courseDots');
let courseIndex = 0, courseInterval;

function getFilteredCourses() {
  return courses.filter(c => activeFilter === 'all' || c.category === activeFilter);
}

function renderCourses() {
  track.innerHTML = '';
  dotsContainer.innerHTML = '';
  const filtered = getFilteredCourses();
  if (!filtered.length) {
    track.innerHTML = '<div style="width:100%;text-align:center;padding:40px;">No courses found.</div>';
    return;
  }
  filtered.forEach((c, i) => {
    const originalFee = c.fee;
    const discountedFee = DISCOUNT_ACTIVE ? getDiscountedPrice(originalFee) : originalFee;
    const msg = `Hi, I want to enroll in *${c.name}* (Fee: ${formatFee(discountedFee)}). Please guide me.`;
    const link = `https://wa.me/923061565858?text=${encodeURIComponent(msg)}`;
    const card = document.createElement('div');
    card.className = 'course-card';
    let feeHTML = '';
    if (DISCOUNT_ACTIVE && originalFee > 0) {
      feeHTML = `<div style="margin:10px 0;"><span style="text-decoration:line-through;opacity:0.6;font-size:1rem;">${formatFee(originalFee)}</span><span style="font-size:1.6rem;font-weight:800;color:var(--gold);margin-left:10px;">${formatFee(discountedFee)}</span><span style="background:#dc2626;color:white;padding:3px 10px;border-radius:12px;font-size:0.8rem;margin-left:8px;">50% OFF</span></div>`;
    } else {
      feeHTML = `<p class="course-fee">${formatFee(originalFee)}</p>`;
    }
    card.innerHTML = `<h3>${c.name}</h3>${feeHTML}<p>${c.desc}</p>${c.cert ? '<span style="background:#06b6d4;color:#000;padding:4px 12px;border-radius:12px;display:inline-block;margin:10px 0;">🎓 Certificate</span>' : ''}<div class="progress-bar-container"><div class="progress-bar-fill" style="width:0%" data-width="${c.progress}%"></div></div><button class="btn btn-outline view-details" data-index="${i}" style="margin:10px 0;">📋 View Details</button><a href="${link}" target="_blank" class="btn btn-primary" style="margin-top:10px;">Enroll Now</a>`;
    track.appendChild(card);
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToCourse(i));
    dotsContainer.appendChild(dot);
  });
  equalizeCourseCards();
  document.querySelectorAll('.view-details').forEach(btn => {
    btn.addEventListener('click', (e) => openCourseModal(courses[+e.target.dataset.index]));
  });
  document.querySelectorAll('.progress-bar-fill').forEach(bar => {
    new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) { bar.style.width = bar.dataset.width; } });
    }, { threshold: 0.5 }).observe(bar);
  });
}
renderCourses();

function equalizeCourseCards() {
  const cards = track.querySelectorAll('.course-card');
  cards.forEach(c => c.style.height = 'auto');
  let max = 0;
  cards.forEach(c => { const h = c.offsetHeight; if (h > max) max = h; });
  cards.forEach(c => c.style.height = max + 'px');
}
window.addEventListener('load', equalizeCourseCards);
window.addEventListener('resize', equalizeCourseCards);

function goToCourse(i) {
  const f = getFilteredCourses();
  if (!f.length) return;
  courseIndex = i;
  track.style.transform = `translateX(-${i * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, j) => d.classList.toggle('active', j === i));
  resetCourseInterval();
}
function nextCourse() {
  const f = getFilteredCourses();
  if (!f.length) return;
  courseIndex = (courseIndex + 1) % f.length;
  goToCourse(courseIndex);
}
function resetCourseInterval() {
  clearInterval(courseInterval);
  courseInterval = setInterval(nextCourse, 3000);
}
document.getElementById('prevCourse').addEventListener('click', () => {
  const f = getFilteredCourses();
  if (!f.length) return;
  courseIndex = (courseIndex - 1 + f.length) % f.length;
  goToCourse(courseIndex);
});
document.getElementById('nextCourse').addEventListener('click', nextCourse);
resetCourseInterval();

// ========== COURSE DETAIL MODAL ==========
const courseModal = document.getElementById('courseModal');
const closeCourseModal = document.getElementById('closeCourseModal');
const courseModalContent = document.getElementById('courseModalContent');
function openCourseModal(c) {
  const discountedFee = DISCOUNT_ACTIVE ? getDiscountedPrice(c.fee) : c.fee;
  const msg = `Hi, I want to enroll in *${c.name}* (Fee: ${formatFee(discountedFee)}). Please guide me.`;
  const link = `https://wa.me/923061565858?text=${encodeURIComponent(msg)}`;
  courseModalContent.innerHTML = `<h2>${c.name}</h2><p style="font-size:1.4rem;color:var(--gold);font-weight:700;">Fee: ${formatFee(discountedFee)} ${DISCOUNT_ACTIVE && c.fee > 0 ? `<span style="text-decoration:line-through;opacity:0.6;font-size:1rem;margin-left:10px;">${formatFee(c.fee)}</span><span style="background:#dc2626;color:white;padding:3px 10px;border-radius:12px;font-size:0.8rem;margin-left:8px;">50% OFF</span>` : ''}</p><p><strong>Duration:</strong> ${c.duration}</p><p><strong>Certificate:</strong> ${c.cert ? 'Yes' : 'No'}</p><h4>Topics:</h4><ul class="topic-list">${c.topics.map(t => `<li>✅ ${t}</li>`).join('')}</ul><a href="${link}" target="_blank" class="btn btn-primary" style="display:inline-block;margin-top:15px;">Enroll Now</a>`;
  courseModal.classList.add('active');
  disableBodyScroll();
}
closeCourseModal.addEventListener('click', () => { courseModal.classList.remove('active'); enableBodyScroll(); });
window.addEventListener('click', (e) => { if (e.target === courseModal) { courseModal.classList.remove('active'); enableBodyScroll(); } });

// ========== REVIEWS ==========
const staticReviews = [
  { name: "Ahmed", text: "Best decision! Got a job.", rating: 5 },
  { name: "Sara", text: "I was afraid of computers, now I teach others.", rating: 5 },
  { name: "Usman", text: "Earned my first $100 online.", rating: 5 },
  { name: "Ayesha", text: "Canva course is amazing.", rating: 5 },
  { name: "Fatima", text: "Python course helped me land an internship.", rating: 5 },
  { name: "Zainab", text: "The teachers are incredibly supportive.", rating: 5 },
  { name: "Bilal", text: "Web development course changed my career.", rating: 5 },
  { name: "Hira", text: "Freelancing tips are gold!", rating: 5 },
  { name: "Ali", text: "Ethical hacking basics were mind-blowing.", rating: 4 },
  { name: "Marium", text: "I built my first website.", rating: 5 },
  { name: "Owais", text: "AI tools saved me hours.", rating: 5 },
  { name: "Anam", text: "CV course got me noticed.", rating: 4 },
  { name: "Hamza", text: "I love practical assignments.", rating: 5 },
  { name: "Kinza", text: "Canva made designing fun.", rating: 5 },
  { name: "Talha", text: "Python is no longer scary.", rating: 5 }
];
const reviewTrack = document.getElementById('reviewTrack');
staticReviews.forEach(r => {
  const d = document.createElement('div');
  d.className = 'review-card';
  d.innerHTML = `<p class="rating-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</p><p>"${r.text}"</p><strong>${r.name}</strong>`;
  reviewTrack.appendChild(d);
});
let reviewIndex = 0;
setInterval(() => { reviewIndex = (reviewIndex + 1) % staticReviews.length; reviewTrack.style.transform = `translateX(-${reviewIndex * 100}%)`; }, 4000);

// ========== VIEW ALL REVIEWS ==========
const allReviewsModal = document.getElementById('allReviewsModal');
const viewAllBtn = document.getElementById('viewAllReviews');
const closeAllReviewsModal = document.getElementById('closeAllReviewsModal');
const allReviewsList = document.getElementById('allReviewsList');
function renderAllReviews() {
  const userReviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
  const all = [...staticReviews, ...userReviews.map(u => ({ name: u.name, text: u.text, rating: u.rating }))];
  allReviewsList.innerHTML = all.map(r => `<div class="review-item"><div style="display:flex;justify-content:space-between;"><strong>${r.name}</strong><span>${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span></div><div style="margin-top:5px;">${r.text}</div></div>`).join('');
}
viewAllBtn.addEventListener('click', () => { renderAllReviews(); allReviewsModal.classList.add('active'); disableBodyScroll(); });
closeAllReviewsModal.addEventListener('click', () => { allReviewsModal.classList.remove('active'); enableBodyScroll(); });
window.addEventListener('click', (e) => { if (e.target === allReviewsModal) { allReviewsModal.classList.remove('active'); enableBodyScroll(); } });

// ========== USER REVIEW ==========
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
  const n = reviewerNameInput.value.trim(), t = reviewMessageInput.value.trim(), r = document.querySelector('#starRating input[name="rating"]:checked');
  if (!n || !t || !r) { alert('Fill all fields'); return; }
  const reviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
  reviews.unshift({ name: n, text: t, rating: +r.value });
  localStorage.setItem('userReviews', JSON.stringify(reviews));
  reviewerNameInput.value = ''; reviewMessageInput.value = ''; starInputs.forEach(i => i.checked = false);
  reviewModal.classList.remove('active'); enableBodyScroll();
});

// ========== COMMENTS ==========
const comments = ["Hamza: Just enrolled! 🚀", "Zainab: Mentor helped me instantly 💯", "Owais: Academy feels like family ❤️"];
const commentTrack = document.getElementById('commentTrack');
let commentIndex = 0;
comments.forEach(c => { const d = document.createElement('div'); d.className = 'comment-card'; d.textContent = c; commentTrack.appendChild(d); });
setInterval(() => { commentIndex = (commentIndex + 1) % comments.length; commentTrack.style.transform = `translateX(-${commentIndex * (commentTrack.firstElementChild.offsetWidth + 20)}px)`; }, 3000);

// ========== FAQ ==========
const faqContainer = document.getElementById('faqContainer');
const faqs = [
  { q: "Do I need prior knowledge?", a: "No, we start from absolute zero." },
  { q: "How to get certificate?", a: "Complete course and projects." },
  { q: "How to pay?", a: "JazzCash/EasyPaisa: 0304 6491358 (Abid Hussain)." },
  { q: "Is there a demo class?", a: "Yes! 3 FREE demo classes." },
  { q: "What courses do you offer?", a: "Basic Computer, AI, Automation, Design, Freelancing, Programming, Cybersecurity, and more." },
  { q: "Can I get a scholarship?", a: "Yes. Take our scholarship test." },
  { q: "Online or physical?", a: "All classes are online." },
  { q: "How long?", a: "2 to 12 weeks depending on course." }
];
faqs.forEach(f => {
  const d = document.createElement('div'); d.className = 'faq-item';
  d.innerHTML = `<div class="faq-question">${f.q} <span>➕</span></div><div class="faq-answer">${f.a}</div>`;
  faqContainer.appendChild(d);
  d.querySelector('.faq-question').addEventListener('click', function() { const a = this.nextElementSibling; a.classList.toggle('open'); this.querySelector('span').textContent = a.classList.contains('open') ? '➖' : '➕'; });
});

// ========== COUNTDOWN (14 AUGUST) ==========
const countdownSection = document.getElementById('countdownSection');
const countdownEl = document.getElementById('countdown');
const endDate = new Date('2025-08-14T23:59:59');
const timerInterval = setInterval(() => {
  const diff = endDate - new Date();
  if (diff <= 0) { countdownEl.textContent = 'Offer Expired'; clearInterval(timerInterval); countdownSection.style.opacity = '0'; countdownSection.style.visibility = 'hidden'; countdownSection.style.pointerEvents = 'none'; }
  else { const d = Math.floor(diff / (1000 * 60 * 60 * 24)), h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)), s = Math.floor((diff % (1000 * 60)) / 1000); countdownEl.textContent = `${d}d ${h}h ${m}m ${s}s`; }
}, 1000);

// ========== LIVE NOTIFICATION ==========
const notif = document.getElementById('liveNotification');
const msgs = ["Ahmed enrolled in Python 🎉","Sara joined AI course 👏","Usman booked demo 🚀","Ayesha accepted invite ✅"]; let idx = 0;
setInterval(() => { notif.style.opacity = '0'; setTimeout(() => { notif.textContent = msgs[idx%4]; notif.classList.add('visible'); }, 200); setTimeout(() => { notif.style.opacity = '0'; setTimeout(() => notif.classList.remove('visible'), 200); }, 4000); idx++; }, 8000);

// ========== BACK TO TOP ==========
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => backToTop.classList.toggle('show', window.scrollY > 300));
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ========== SCROLLBAR ==========
function getScrollbarWidth() { return window.innerWidth - document.documentElement.clientWidth; }
function disableBodyScroll() { document.documentElement.style.setProperty('--scrollbar-width', getScrollbarWidth() + 'px'); body.classList.add('no-scroll'); }
function enableBodyScroll() { body.classList.remove('no-scroll'); }

// ========== ENROLLMENT STEPS ==========
document.querySelectorAll('.step').forEach(s => new IntersectionObserver((e) => { if (e[0].isIntersecting) s.classList.add('visible'); }, { threshold: 0.3 }).observe(s));

// ========== LIVE STATUS BAR ==========
const statusBar = document.getElementById('liveStatusBar');
const statusMsgs = ["🇵🇰 50% Off Independence Day Special!","🔥 Students viewing this course","⚡ Limited seats available"]; let sIdx = 0;
setInterval(() => { statusBar.textContent = statusMsgs[sIdx%3]; statusBar.style.display = 'block'; setTimeout(() => statusBar.style.display = 'none', 4000); sIdx++; }, 15000);

// ========== FLIP CARDS ==========
document.querySelectorAll('.flip-card').forEach(c => c.addEventListener('click', () => c.classList.toggle('flipped')));

// ========== AOS ==========
AOS.init({ duration: 800, once: true });
