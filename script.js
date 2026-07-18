/* ===================================================
   Zero to Pro Computer & AI Academy – script.js
   =================================================== */

const APP_VERSION = "1.4"; // Change to force popup again

// ========== DARK / LIGHT MODE ==========
const body = document.body;
const darkToggle = document.getElementById('darkToggle');

// Default dark mode
body.classList.remove('light');
darkToggle.textContent = '☀️ Light';

darkToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  darkToggle.textContent = body.classList.contains('light') ? '🌙 Dark' : '☀️ Light';
});

// ========== POPUP (Version-based Reappearance) ==========
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

// Close popup when clicking on overlay background
popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.style.display = 'none';
    mainSite.style.display = 'block';
    localStorage.setItem('appVersion', APP_VERSION);
  }
});

// Clicking poster opens WhatsApp
popupPoster.addEventListener('click', () => {
  window.open('https://wa.me/923061565858', '_blank');
});

// ========== MOBILE NAVIGATION ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ========== FLIP POSTER SYSTEM ==========
const flipCardInner = document.getElementById('flipCardInner');
const flipDots = document.querySelectorAll('.flip-dot');
const frontPosterImg = document.getElementById('frontPosterImg');
const backPosterImg = document.getElementById('backPosterImg');
const frontPosterLabel = document.getElementById('frontPosterLabel');
const backPosterLabel = document.getElementById('backPosterLabel');

const flipPosters = [
  {
    frontImg: 'assets/poster1.jpeg',
    backImg: 'assets/poster2.jpeg',
    frontLabel: '🔥 New Course Launch',
    backLabel: '🎓 Scholarship Test',
    link: 'https://wa.me/923061565858'
  },
  {
    frontImg: 'assets/poster2.jpeg',
    backImg: 'assets/poster3.jpeg',
    frontLabel: '🎓 Scholarship Test',
    backLabel: '💻 AI Course Starting Soon',
    link: 'https://wa.me/923061565858'
  },
  {
    frontImg: 'assets/poster3.jpeg',
    backImg: 'assets/poster1.jpeg',
    frontLabel: '💻 AI Course Starting Soon',
    backLabel: '🔥 New Course Launch',
    link: 'https://wa.me/923061565858'
  }
];

let currentPosterIndex = 0;
let isFlipped = false;
let flipInterval;

// Update poster content (front side)
function updatePosterContent(index) {
  const poster = flipPosters[index];
  
  frontPosterImg.style.opacity = '0';
  backPosterImg.style.opacity = '0';
  
  setTimeout(() => {
    frontPosterImg.src = poster.frontImg;
    frontPosterLabel.textContent = poster.frontLabel;
    frontPosterImg.style.opacity = '1';
    
    // Preload next poster on back side
    const nextIndex = (index + 1) % flipPosters.length;
    backPosterImg.src = flipPosters[nextIndex].frontImg;
    backPosterLabel.textContent = flipPosters[nextIndex].frontLabel;
    backPosterImg.style.opacity = '1';
  }, 200);
}

// Flip animation trigger
function flipPoster() {
  flipCardInner.classList.toggle('flipped');
  isFlipped = !isFlipped;
}

// Next poster with flip effect
function nextPoster() {
  // Add flip class
  flipCardInner.classList.add('flipped');
  isFlipped = true;
  
  // After flip animation completes
  setTimeout(() => {
    // Update to next poster
    currentPosterIndex = (currentPosterIndex + 1) % flipPosters.length;
    
    // Update front side with new poster
    const poster = flipPosters[currentPosterIndex];
    frontPosterImg.src = poster.frontImg;
    frontPosterLabel.textContent = poster.frontLabel;
    
    // Update back side with upcoming poster
    const upcomingIndex = (currentPosterIndex + 1) % flipPosters.length;
    backPosterImg.src = flipPosters[upcomingIndex].frontImg;
    backPosterLabel.textContent = flipPosters[upcomingIndex].frontLabel;
    
    // Reset flip without animation
    flipCardInner.style.transition = 'none';
    flipCardInner.classList.remove('flipped');
    isFlipped = false;
    
    // Restore transition
    setTimeout(() => {
      flipCardInner.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    }, 50);
    
    // Update dots
    flipDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentPosterIndex);
    });
  }, 800);
}

// Auto flip every 4 seconds
function startFlipInterval() {
  flipInterval = setInterval(nextPoster, 4000);
}

function resetFlipInterval() {
  clearInterval(flipInterval);
  startFlipInterval();
}

// Click on flip card to manually flip
flipCardInner.addEventListener('click', () => {
  nextPoster();
  resetFlipInterval();
});

// Dot click to jump to specific poster
flipDots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    e.stopPropagation();
    const targetIndex = parseInt(e.target.dataset.index);
    
    if (targetIndex === currentPosterIndex && !isFlipped) return;
    
    clearInterval(flipInterval);
    
    // If different poster, animate flip
    if (targetIndex !== currentPosterIndex) {
      flipCardInner.classList.add('flipped');
      isFlipped = true;
      
      setTimeout(() => {
        currentPosterIndex = targetIndex;
        
        const poster = flipPosters[currentPosterIndex];
        frontPosterImg.src = poster.frontImg;
        frontPosterLabel.textContent = poster.frontLabel;
        
        const upcomingIndex = (currentPosterIndex + 1) % flipPosters.length;
        backPosterImg.src = flipPosters[upcomingIndex].frontImg;
        backPosterLabel.textContent = flipPosters[upcomingIndex].frontLabel;
        
        flipCardInner.style.transition = 'none';
        flipCardInner.classList.remove('flipped');
        isFlipped = false;
        
        setTimeout(() => {
          flipCardInner.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 50);
        
        flipDots.forEach((d, i) => d.classList.toggle('active', i === currentPosterIndex));
        startFlipInterval();
      }, 800);
    }
  });
});

// Poster image click → WhatsApp
frontPosterImg.addEventListener('click', (e) => {
  e.stopPropagation();
  window.open(flipPosters[currentPosterIndex].link, '_blank');
});

backPosterImg.addEventListener('click', (e) => {
  e.stopPropagation();
  window.open(flipPosters[currentPosterIndex].link, '_blank');
});

// Initialize flip poster
updatePosterContent(0);
startFlipInterval();

// ========== COURSES DATA & CAROUSEL ==========
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

// Render courses
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
      <p style="font-size:0.85rem; opacity:0.7;">⏱️ Duration: ${c.duration}</p>
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
  
  // Add click listeners for "View Details" buttons
  document.querySelectorAll('.view-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      openCourseModal(courses[index]);
    });
  });
}

renderCourses();

function goToCourse(index) {
  courseIndex = index;
  track.style.transform = `translateX(-${index * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === index));
  resetCourseInterval();
}

function nextCourse() {
  courseIndex = (courseIndex + 1) % courses.length;
  goToCourse(courseIndex);
}

function resetCourseInterval() {
  clearInterval(courseInterval);
  courseInterval = setInterval(nextCourse, 3000);
}

// Course navigation buttons
document.getElementById('prevCourse').addEventListener('click', () => {
  courseIndex = (courseIndex - 1 + courses.length) % courses.length;
  goToCourse(courseIndex);
});

document.getElementById('nextCourse').addEventListener('click', () => {
  nextCourse();
});

// Start auto-slide
resetCourseInterval();

// ========== COURSE DETAILS MODAL ==========
const courseModal = document.getElementById('courseModal');
const closeCourseModalBtn = document.getElementById('closeCourseModal');
const courseModalContent = document.getElementById('courseModalContent');

function openCourseModal(course) {
  const msg = `Hi, I want to enroll in *${course.name}* (Fee: Rs. ${course.fee}). Please guide me.`;
  const link = `https://wa.me/923061565858?text=${encodeURIComponent(msg)}`;
  
  courseModalContent.innerHTML = `
    <h2>${course.name}</h2>
    <p style="font-size:1.4rem; color:var(--gold); font-weight:700;">Fee: Rs. ${course.fee}</p>
    <p><strong>Duration:</strong> ${course.duration}</p>
    <p><strong>Certificate:</strong> ${course.cert ? '✅ Yes' : '❌ No'}</p>
    <p style="margin-top:10px;">${course.desc}</p>
    <h4 style="margin-top:15px;">📚 Topics Covered:</h4>
    <ul class="topic-list">
      ${course.topics.map(t => `<li>✅ ${t}</li>`).join('')}
    </ul>
    <a href="${link}" target="_blank" class="btn btn-primary" style="display:inline-block; margin-top:15px;">Enroll Now via WhatsApp</a>
  `;
  
  courseModal.classList.add('active');
  disableBodyScroll();
}

closeCourseModalBtn.addEventListener('click', () => {
  courseModal.classList.remove('active');
  enableBodyScroll();
});

courseModal.addEventListener('click', (e) => {
  if (e.target === courseModal) {
    courseModal.classList.remove('active');
    enableBodyScroll();
  }
});

// ========== REVIEWS SLIDER ==========
const staticReviews = [
  { name: "Ahmed Raza", text: "Best decision of my life! Got a job right after completing the course.", rating: 5 },
  { name: "Sara Khan", text: "I was afraid of computers, now I teach others. Amazing academy!", rating: 5 },
  { name: "Usman Ali", text: "Earned my first $100 online through freelancing skills learned here.", rating: 5 },
  { name: "Ayesha Malik", text: "Canva course is amazing. I design social media posts professionally now.", rating: 5 },
  { name: "Fatima Hassan", text: "Python course helped me land an internship at a tech company.", rating: 5 },
  { name: "Zainab Bukhari", text: "The teachers are incredibly supportive and patient with beginners.", rating: 5 },
  { name: "Bilal Ahmed", text: "Web development course changed my career completely.", rating: 5 },
  { name: "Hira Noor", text: "Freelancing tips are gold! Already got two clients on Fiverr.", rating: 5 },
  { name: "Ali Raza", text: "Ethical hacking basics were mind-blowing. Very practical training.", rating: 4 },
  { name: "Marium Shah", text: "I built my first website thanks to this academy. So proud!", rating: 5 },
  { name: "Owais Qureshi", text: "The AI tools section saved me hours every day in my work.", rating: 5 },
  { name: "Anam Javed", text: "Resume and CV course helped me get noticed by top recruiters.", rating: 4 },
  { name: "Hamza Tariq", text: "I love the practical assignments. Learning by doing is the best!", rating: 5 },
  { name: "Kinza Sheikh", text: "Canva masterclass made designing fun and easy. Highly recommend!", rating: 5 },
  { name: "Talha Mehmood", text: "Python is no longer scary. The instructor explains everything clearly.", rating: 5 }
];

const reviewTrack = document.getElementById('reviewTrack');
let reviewIndex = 0;
let reviewInterval;

// Render static reviews
staticReviews.forEach(r => {
  const div = document.createElement('div');
  div.className = 'review-card';
  div.innerHTML = `
    <p class="rating-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</p>
    <p style="font-size:1.1rem;">"${r.text}"</p>
    <strong style="color:var(--gold);">- ${r.name}</strong>
  `;
  reviewTrack.appendChild(div);
});

function goToReview(idx) {
  reviewIndex = idx;
  reviewTrack.style.transform = `translateX(-${reviewIndex * 100}%)`;
}

function nextReview() {
  reviewIndex = (reviewIndex + 1) % staticReviews.length;
  goToReview(reviewIndex);
}

// Auto-slide reviews every 4 seconds
reviewInterval = setInterval(nextReview, 4000);

// ========== VIEW ALL REVIEWS MODAL ==========
const allReviewsModal = document.getElementById('allReviewsModal');
const viewAllBtn = document.getElementById('viewAllReviews');
const closeAllReviewsBtn = document.getElementById('closeAllReviewsModal');
const allReviewsList = document.getElementById('allReviewsList');

function renderAllReviews() {
  const userReviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
  const all = [...staticReviews, ...userReviews.map(u => ({ name: u.name, text: u.text, rating: u.rating }))];
  
  allReviewsList.innerHTML = all.map(r => `
    <div class="review-item">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <strong style="color:var(--gold);">${r.name}</strong>
        <span style="color:var(--gold);">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
      </div>
      <div style="margin-top:8px;">"${r.text}"</div>
    </div>
  `).join('');
}

viewAllBtn.addEventListener('click', () => {
  renderAllReviews();
  allReviewsModal.classList.add('active');
  disableBodyScroll();
});

closeAllReviewsBtn.addEventListener('click', () => {
  allReviewsModal.classList.remove('active');
  enableBodyScroll();
});

allReviewsModal.addEventListener('click', (e) => {
  if (e.target === allReviewsModal) {
    allReviewsModal.classList.remove('active');
    enableBodyScroll();
  }
});

// ========== REVIEW SUBMISSION MODAL ==========
const reviewModal = document.getElementById('reviewModal');
const openReviewBtn = document.getElementById('openReviewModal');
const closeReviewBtn = document.getElementById('closeReviewModal');
const submitReviewBtn = document.getElementById('submitReviewBtn');
const reviewerNameInput = document.getElementById('reviewerName');
const reviewMessageInput = document.getElementById('reviewMessage');
const starInputs = document.querySelectorAll('#starRating input[name="rating"]');

openReviewBtn.addEventListener('click', () => {
  reviewModal.classList.add('active');
  disableBodyScroll();
});

closeReviewBtn.addEventListener('click', () => {
  reviewModal.classList.remove('active');
  enableBodyScroll();
});

reviewModal.addEventListener('click', (e) => {
  if (e.target === reviewModal) {
    reviewModal.classList.remove('active');
    enableBodyScroll();
  }
});

submitReviewBtn.addEventListener('click', () => {
  const name = reviewerNameInput.value.trim();
  const text = reviewMessageInput.value.trim();
  const ratingElem = document.querySelector('#starRating input[name="rating"]:checked');
  
  if (!name || !text || !ratingElem) {
    alert('⚠️ Please fill all fields and select a star rating.');
    return;
  }
  
  const rating = parseInt(ratingElem.value);
  const reviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
  reviews.unshift({ name, text, rating });
  localStorage.setItem('userReviews', JSON.stringify(reviews));
  
  // Clear form
  reviewerNameInput.value = '';
  reviewMessageInput.value = '';
  starInputs.forEach(i => i.checked = false);
  
  // Close modal
  reviewModal.classList.remove('active');
  enableBodyScroll();
  
  // Show success message
  alert('✅ Thank you for your review! Your feedback helps us improve.');
});

// ========== COMMENTS / SHOUTOUTS SLIDER ==========
const comments = [
  "Hamza: Just enrolled in Python course! 🚀",
  "Zainab: The mentor helped me instantly with my assignment 💯",
  "Owais: This academy feels like family. Best learning experience! ❤️",
  "Kinza: Got my certificate today. So happy! 🎓",
  "Bilal: From zero to building websites in just 6 weeks! 💻"
];

const commentTrack = document.getElementById('commentTrack');
let commentIndex = 0;
let commentInterval;

comments.forEach(c => {
  const div = document.createElement('div');
  div.className = 'comment-card';
  div.textContent = c;
  commentTrack.appendChild(div);
});

function goToComment(idx) {
  commentIndex = idx;
  commentTrack.style.transform = `translateX(-${commentIndex * 100}%)`;
}

function nextComment() {
  commentIndex = (commentIndex + 1) % comments.length;
  goToComment(commentIndex);
}

// Auto-slide comments every 3 seconds
commentInterval = setInterval(nextComment, 3000);

// ========== FAQ ACCORDION ==========
const faqContainer = document.getElementById('faqContainer');
const faqs = [
  { q: "Do I need prior knowledge?", a: "No, we start from absolute zero. Our courses are designed for complete beginners." },
  { q: "How to get certificate?", a: "Complete your course and all assigned projects. Certificate is issued within 24 hours of completion." },
  { q: "How to pay?", a: "You can pay via JazzCash or EasyPaisa: <strong>0304 6491358</strong> (Account: Abid Hussain). We also accept bank transfer." },
  { q: "Is there a refund policy?", a: "Yes! If you don't like the first class, we offer 100% money-back guarantee." },
  { q: "Can I get a free demo class?", a: "Absolutely! We offer 3 FREE demo classes before enrollment. Contact us on WhatsApp to schedule." }
];

faqs.forEach(f => {
  const div = document.createElement('div');
  div.className = 'faq-item';
  div.innerHTML = `
    <div class="faq-question">${f.q} <span>➕</span></div>
    <div class="faq-answer">${f.a}</div>
  `;
  faqContainer.appendChild(div);
  
  div.querySelector('.faq-question').addEventListener('click', function() {
    const ans = this.nextElementSibling;
    const allAnswers = document.querySelectorAll('.faq-answer');
    const allIcons = document.querySelectorAll('.faq-question span');
    
    // Close all other answers
    allAnswers.forEach(a => {
      if (a !== ans) a.classList.remove('open');
    });
    allIcons.forEach(icon => {
      if (icon !== this.querySelector('span')) icon.textContent = '➕';
    });
    
    // Toggle current answer
    ans.classList.toggle('open');
    this.querySelector('span').textContent = ans.classList.contains('open') ? '➖' : '➕';
  });
});

// ========== COUNTDOWN TIMER (3 Days) ==========
const countdownSection = document.getElementById('countdownSection');
const countdownEl = document.getElementById('countdown');
const endDate = new Date();
endDate.setDate(endDate.getDate() + 3);

const timerInterval = setInterval(() => {
  const diff = endDate - new Date();
  
  if (diff <= 0) {
    countdownEl.textContent = 'Expired';
    clearInterval(timerInterval);
    
    // Smooth collapse
    setTimeout(() => {
      countdownSection.classList.add('collapsed');
    }, 2000);
    return;
  }
  
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  countdownEl.textContent = `${h}h ${m}m ${s}s`;
}, 1000);

// ========== LIVE NOTIFICATION ==========
const notif = document.getElementById('liveNotification');
const msgs = [
  "🎉 Ahmed enrolled in Python",
  "👏 Sara joined AI course",
  "🚀 Usman booked a demo",
  "✅ Ayesha accepted invite",
  "💻 Bilal started Web Dev",
  "🎓 Kinza got certified"
];
let notifIdx = 0;

function showNotification() {
  notif.textContent = msgs[notifIdx % msgs.length];
  notif.classList.add('visible');
  
  setTimeout(() => {
    notif.classList.remove('visible');
  }, 3500);
  
  notifIdx++;
}

// Show first notification after 3 seconds
setTimeout(() => {
  showNotification();
  // Repeat every 8 seconds
  setInterval(showNotification, 8000);
}, 3000);

// ========== BACK TO TOP BUTTON ==========
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== BODY SCROLL LOCK (FOR MODALS) ==========
function disableBodyScroll() {
  body.classList.add('no-scroll');
}

function enableBodyScroll() {
  body.classList.remove('no-scroll');
}

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close all modals
    reviewModal.classList.remove('active');
    allReviewsModal.classList.remove('active');
    courseModal.classList.remove('active');
    enableBodyScroll();
  }
});

// ========== AOS INITIALIZE ==========
if (typeof AOS !== 'undefined') {
  AOS.init({ 
    duration: 800, 
    once: true,
    offset: 50
  });
}

// ========== SMOOTH SCROLL FOR NAVIGATION LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

console.log('🚀 Zero to Pro Academy - Website Loaded Successfully!');
console.log('📚 Courses:', courses.length);
console.log('⭐ Reviews:', staticReviews.length);
console.log('🎴 Flip Posters:', flipPosters.length);
