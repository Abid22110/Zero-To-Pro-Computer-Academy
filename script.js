// ===== Config =====
const OFFER_END = new Date('2025-08-14T23:59:59'); // as requested
const DISCOUNT_ACTIVE = true;
const DISCOUNT_PERCENT = 50;
const POPUP_VERSION = 'v3-independence';

// ===== Data =====
const courses = [
  { name: "Basic Computer", fee: 2500, desc: "Computer fundamentals, MS Office, internet, safety.", category: "computer", cert: true, duration: "6 Weeks", progress: 92, topics: ["Computer Fundamentals","Windows OS","Internet Basics","MS Office"] },
  { name: "Typing Course", fee: 2500, desc: "Professional typing skills in English and Urdu.", category: "computer", cert: true, duration: "4 Weeks", progress: 88, topics: ["English Typing","Urdu Typing","Speed Building","Accuracy Practice"] },
  { name: "Microsoft Office", fee: 4000, desc: "MS Word, Excel, PowerPoint and Outlook.", category: "computer", cert: true, duration: "6 Weeks", progress: 90, topics: ["Word","Excel","PowerPoint","Outlook"] },
  { name: "Graphic Designing", fee: 7500, desc: "Canva, Photoshop, Illustrator from basics to pro.", category: "computer", cert: true, duration: "8 Weeks", progress: 86, topics: ["Canva","Photoshop","Illustrator","Brand Design"] },
  { name: "Video Editing", fee: 8000, desc: "CapCut, Premiere Pro, effects and transitions.", category: "computer", cert: true, duration: "8 Weeks", progress: 84, topics: ["CapCut","Premiere Pro","Effects","Color Grading"] },
  { name: "Digital Marketing", fee: 8500, desc: "SEO, Social Media, Ads, Email Marketing.", category: "freelancing", cert: true, duration: "8 Weeks", progress: 85, topics: ["SEO","Google Ads","Facebook Ads","Email Marketing"] },
  { name: "Freelancing", fee: 5000, desc: "Fiverr & Upwork profile, bidding and clients.", category: "freelancing", cert: true, duration: "6 Weeks", progress: 89, topics: ["Profile Setup","Bidding","Client Communication","Portfolio"] },
  { name: "Web Development", fee: 10000, desc: "HTML, CSS, JavaScript, responsive websites.", category: "computer", cert: true, duration: "10 Weeks", progress: 83, topics: ["HTML","CSS","JavaScript","Responsive Design"] },
  { name: "Programming", fee: 12000, desc: "Python, C++, Java from fundamentals to advanced.", category: "computer", cert: true, duration: "12 Weeks", progress: 82, topics: ["Python","C++","Java","OOP"] },
  { name: "Networking", fee: 10000, desc: "CCNA basics, routing, switching, subnetting.", category: "computer", cert: true, duration: "8 Weeks", progress: 80, topics: ["IP Addressing","Routing","Switching","Subnetting"] },
  { name: "Database Management", fee: 9000, desc: "SQL, MySQL, MongoDB and data modeling.", category: "computer", cert: true, duration: "8 Weeks", progress: 79, topics: ["SQL","MySQL","MongoDB","Queries"] },
  { name: "Cloud Computing", fee: 12000, desc: "AWS, Azure and Google Cloud fundamentals.", category: "ai", cert: true, duration: "10 Weeks", progress: 78, topics: ["AWS","Azure","GCP","Cloud Architecture"] },
  { name: "Cyber Security", fee: 15000, desc: "Security fundamentals, threats and defense.", category: "computer", cert: true, duration: "12 Weeks", progress: 77, topics: ["Network Security","Firewalls","Threat Analysis","Incident Response"] },
  { name: "Ethical Hacking", fee: 18000, desc: "Pen testing and vulnerability assessment.", category: "computer", cert: true, duration: "12 Weeks", progress: 76, topics: ["Recon","Scanning","Exploitation","Reporting"] },
  { name: "Artificial Intelligence (AI)", fee: 20000, desc: "ML, DL, NLP, Computer Vision.", category: "ai", cert: true, duration: "12 Weeks", progress: 81, topics: ["Machine Learning","Deep Learning","NLP","Computer Vision"] },
  { name: "AI Automation", fee: 25000, desc: "Advanced AI tools, chatbots, workflow automation.", category: "ai", cert: true, duration: "10 Weeks", progress: 80, topics: ["Automation","Chatbots","API Integration","Projects"] },
  { name: "Al-Quran Al-Karim", fee: 0, desc: "Learn selected Surahs with Tajweed (free).", category: "free", cert: false, duration: "Flexible", progress: 95, topics: ["Surah Al-Fatiha","Surah Yaseen","Surah Ar-Rahman"] }
];

const reviews = [
  { name: "Ayesha", text: "Amazing teaching style. Highly recommended!", stars: 5 },
  { name: "Fatima", text: "AI course changed my career direction.", stars: 5 },
  { name: "Ali", text: "Got my first freelancing client after this.", stars: 5 },
  { name: "Zainab", text: "Graphic design classes are very practical.", stars: 5 }
];

const faqData = [
  ["Do I need prior knowledge?", "No, beginners can start from zero."],
  ["How to get certificate?", "Complete course + assignments + final evaluation."],
  ["How to pay?", "JazzCash / EasyPaisa payment available."],
  ["Is there a demo class?", "Yes, FREE demo classes are available."],
  ["What courses do you offer?", "Computer, AI, freelancing, design, development and more."],
  ["Can I get a scholarship?", "Yes, through scholarship test form."],
  ["Are classes online or physical?", "Both options can be available depending on batch."],
  ["How long does a course take?", "Typically 4–12 weeks depending on course."]
];

// ===== Helpers =====
const qs = (s) => document.querySelector(s);
const qsa = (s) => [...document.querySelectorAll(s)];
const fmtFee = (n) => (n === 0 ? "FREE" : `Rs. ${n.toLocaleString("en-PK")}`);
const discounted = (n) => Math.round(n - (n * DISCOUNT_PERCENT / 100));
const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

// ===== Popup =====
(function popupInit() {
  const popup = qs("#popupOverlay");
  const closeBtn = qs("#closePopup");
  const exploreBtn = qs("#exploreBtn");
  const poster = qs("#popupPoster");
  const main = qs("#mainSite");

  const hidden = localStorage.getItem("popupClosed") === "1";
  const ver = sessionStorage.getItem("popupVersion");

  if (hidden && ver === POPUP_VERSION) {
    popup.style.display = "none";
    main.style.display = "block";
  } else {
    popup.style.display = "flex";
    main.style.display = "none";
  }

  const closePopup = () => {
    popup.style.display = "none";
    main.style.display = "block";
    localStorage.setItem("popupClosed", "1");
    sessionStorage.setItem("popupVersion", POPUP_VERSION);
  };

  closeBtn?.addEventListener("click", closePopup);
  exploreBtn?.addEventListener("click", (e) => { e.preventDefault(); closePopup(); });
  poster?.addEventListener("click", () => window.open("https://wa.me/923061565858", "_blank"));
})();

// ===== Theme + Mobile nav =====
(function navThemeInit() {
  const darkToggle = qs("#darkToggle");
  const navLinks = qs("#navLinks");
  const hamburger = qs("#hamburger");
  const isLightSaved = localStorage.getItem("lightMode") === "1";
  if (isLightSaved) document.body.classList.add("light");

  const refreshThemeBtn = () => {
    if (!darkToggle) return;
    darkToggle.textContent = document.body.classList.contains("light") ? "🌙 Dark" : "☀️ Light";
  };
  refreshThemeBtn();

  darkToggle?.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("lightMode", document.body.classList.contains("light") ? "1" : "0");
    refreshThemeBtn();
  });

  hamburger?.addEventListener("click", () => navLinks?.classList.toggle("active"));
  qsa("#navLinks a").forEach(a => a.addEventListener("click", () => navLinks?.classList.remove("active")));
})();

// ===== Typewriter =====
(function typewriterInit() {
  const el = qs("#typewriter");
  const lines = [
    "Zero to Pro Computer & AI Academy",
    "Learn Today • Build Tomorrow • Lead the Future",
    "Build Skills. Build Future."
  ];
  let li = 0, ci = 0, del = false;

  const tick = () => {
    if (!el) return;
    const t = lines[li];
    el.textContent = del ? t.slice(0, ci--) : t.slice(0, ci++);
    if (!del && ci === t.length + 1) { del = true; setTimeout(tick, 1200); return; }
    if (del && ci < 0) { del = false; li = (li + 1) % lines.length; ci = 0; }
    setTimeout(tick, del ? 35 : 75);
  };
  tick();
})();

// ===== Counters =====
(function countersInit() {
  const items = qsa(".counter-number");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target || "0");
      let cur = 0;
      const step = target / 60;
      const iv = setInterval(() => {
        cur += step;
        if (cur >= target) {
          clearInterval(iv);
          el.textContent = Number.isInteger(target) ? target.toLocaleString("en-PK") : target.toFixed(1);
        } else {
          el.textContent = Number.isInteger(target) ? Math.floor(cur).toLocaleString("en-PK") : cur.toFixed(1);
        }
      }, 25);
      io.unobserve(el);
    });
  }, { threshold: 0.35 });

  items.forEach(el => io.observe(el));
})();

// ===== Courses + filter + carousel =====
let filteredCourses = [...courses];
let courseIndex = 0;
const track = qs("#coursesTrack");
const dotsWrap = qs("#courseDots");

function buildCourseCard(c, idx) {
  const originalFee = c.fee;
  const newFee = DISCOUNT_ACTIVE && originalFee > 0 ? discounted(originalFee) : originalFee;
  const msg = `Hi, I want to enroll in *${c.name}* (Fee: ${fmtFee(newFee)}). Please guide me.`;
  const wa = `https://wa.me/923061565858?text=${encodeURIComponent(msg)}`;
  const progress = Number.isFinite(c.progress) ? c.progress : 85;

  return `
    <div class="course-card">
      <h3>${c.name}</h3>
      <div class="price-line">
        ${DISCOUNT_ACTIVE && originalFee > 0
          ? `<span class="old-price">${fmtFee(originalFee)}</span><span class="new-price">${fmtFee(newFee)}</span><span class="badge-off">50% OFF</span>`
          : `<span class="new-price">${fmtFee(originalFee)}</span>`}
      </div>
      <p>${c.desc}</p>
      ${c.cert ? `<span class="cert-badge">🎓 Certificate</span>` : ``}
      <div class="progress-bar-container"><div class="progress-bar-fill" data-w="${progress}%"></div></div>
      <button class="btn btn-outline view-details" data-i="${idx}">📋 View Details</button>
      <a href="${wa}" target="_blank" class="btn btn-primary">Enroll Now</a>
    </div>
  `;
}

function renderCourses() {
  if (!track || !dotsWrap) return;
  track.innerHTML = filteredCourses.map((c, i) => buildCourseCard(c, i)).join("");
  dotsWrap.innerHTML = filteredCourses.map((_, i) => `<button class="dot ${i === 0 ? "active" : ""}" data-i="${i}"></button>`).join("");
  courseIndex = 0;
  updateCarousel();

  setTimeout(() => {
    qsa(".progress-bar-fill").forEach(b => b.style.width = b.dataset.w || "85%");
  }, 300);

  qsa(".dot").forEach(d => d.addEventListener("click", () => {
    courseIndex = +d.dataset.i;
    updateCarousel();
  }));

  qsa(".view-details").forEach(btn => btn.addEventListener("click", () => openCourseModal(+btn.dataset.i)));
}

function updateCarousel() {
  if (!track) return;
  track.style.transform = `translateX(-${courseIndex * 100}%)`;
  qsa(".dot").forEach((d, i) => d.classList.toggle("active", i === courseIndex));
}

qs("#prevCourse")?.addEventListener("click", () => {
  courseIndex = (courseIndex - 1 + filteredCourses.length) % filteredCourses.length;
  updateCarousel();
});
qs("#nextCourse")?.addEventListener("click", () => {
  courseIndex = (courseIndex + 1) % filteredCourses.length;
  updateCarousel();
});

// auto slide
setInterval(() => {
  if (!filteredCourses.length) return;
  courseIndex = (courseIndex + 1) % filteredCourses.length;
  updateCarousel();
}, 3000);

// filter
qsa(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    qsa(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    if (f === "all") filteredCourses = [...courses];
    else if (f === "free") filteredCourses = courses.filter(c => c.fee === 0 || c.category === "free");
    else filteredCourses = courses.filter(c => c.category === f);
    renderCourses();
  });
});

// ===== Course Modal =====
function openCourseModal(i) {
  const c = filteredCourses[i];
  if (!c) return;
  const originalFee = c.fee;
  const newFee = DISCOUNT_ACTIVE && originalFee > 0 ? discounted(originalFee) : originalFee;
  const msg = `Hi, I want to enroll in *${c.name}* (Fee: ${fmtFee(newFee)}). Please guide me.`;
  const wa = `https://wa.me/923061565858?text=${encodeURIComponent(msg)}`;

  const html = `
    <h2>${c.name}</h2>
    <p class="price-line">
      ${DISCOUNT_ACTIVE && originalFee > 0
        ? `<span class="old-price">${fmtFee(originalFee)}</span><span class="new-price">${fmtFee(newFee)}</span><span class="badge-off">50% OFF</span>`
        : `<span class="new-price">${fmtFee(originalFee)}</span>`}
    </p>
    <p><strong>Duration:</strong> ${c.duration}</p>
    <p><strong>Certificate:</strong> ${c.cert ? "Yes" : "No"}</p>
    <h4 style="margin-top:10px">Topics Covered:</h4>
    <ul>${c.topics.map(t => `<li>✅ ${t}</li>`).join("")}</ul>
    <a href="${wa}" target="_blank" class="btn btn-primary" style="margin-top:12px;display:inline-block">Enroll Now</a>
  `;
  qs("#courseModalContent").innerHTML = html;
  qs("#courseModal").classList.add("active");
}
qs("#closeCourseModal")?.addEventListener("click", () => qs("#courseModal").classList.remove("active"));

// ===== Countdown =====
(function countdownInit() {
  const el = qs("#countdown");
  const section = qs("#countdownSection");
  if (!el || !section) return;

  const tick = () => {
    const diff = OFFER_END - new Date();
    if (diff <= 0) {
      el.textContent = "Offer Expired";
      section.style.opacity = "0";
      section.style.pointerEvents = "none";
      setTimeout(() => section.style.display = "none", 600);
      return;
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    el.textContent = `${d}d ${h}h ${m}m ${s}s`;
  };
  tick();
  setInterval(tick, 1000);
})();

// ===== Reviews =====
let allReviews = [...reviews];

function renderReviews() {
  const track = qs("#reviewTrack");
  if (!track) return;
  track.innerHTML = allReviews.map(r => `
    <div class="review-card">
      <p class="stars">${stars(r.stars)}</p>
      <p>"${r.text}"</p>
      <p><strong>— ${r.name}</strong></p>
    </div>
  `).join("");
}
renderReviews();

let reviewSlide = 0;
setInterval(() => {
  const t = qs("#reviewTrack");
  if (!t || allReviews.length === 0) return;
  reviewSlide = (reviewSlide + 1) % allReviews.length;
  t.style.transform = `translateX(-${reviewSlide * 360}px)`;
}, 4000);

qs("#viewAllReviews")?.addEventListener("click", () => {
  qs("#allReviewsList").innerHTML = allReviews.map(r => `
    <div class="review-card" style="margin-bottom:10px">
      <p class="stars">${stars(r.stars)}</p><p>${r.text}</p><p><strong>${r.name}</strong></p>
    </div>
  `).join("");
  qs("#allReviewsModal").classList.add("active");
});
qs("#closeAllReviewsModal")?.addEventListener("click", () => qs("#allReviewsModal").classList.remove("active"));

// review submit + localStorage
(function reviewFormInit() {
  const modal = qs("#reviewModal");
  qs("#openReviewModal")?.addEventListener("click", () => modal.classList.add("active"));
  qs("#closeReviewModal")?.addEventListener("click", () => modal.classList.remove("active"));

  const saved = JSON.parse(localStorage.getItem("userReviews") || "[]");
  if (Array.isArray(saved) && saved.length) allReviews = [...saved, ...allReviews], renderReviews();

  qs("#submitReviewBtn")?.addEventListener("click", () => {
    const name = qs("#reviewerName").value.trim();
    const msg = qs("#reviewMessage").value.trim();
    const rating = +((qs('input[name="rating"]:checked') || {}).value || 0);
    if (!name || !msg || !rating) return alert("Please fill name, review and rating.");
    const newR = { name, text: msg, stars: rating };
    const store = JSON.parse(localStorage.getItem("userReviews") || "[]");
    store.unshift(newR);
    localStorage.setItem("userReviews", JSON.stringify(store));
    allReviews.unshift(newR);
    renderReviews();
    modal.classList.remove("active");
    qs("#reviewerName").value = "";
    qs("#reviewMessage").value = "";
    qsa('input[name="rating"]').forEach(i => i.checked = false);
  });
})();

// ===== FAQ =====
(function faqInit() {
  const wrap = qs("#faqContainer");
  if (!wrap) return;
  wrap.innerHTML = faqData.map(([q,a]) => `
    <div class="faq-item">
      <div class="faq-q">${q}</div>
      <div class="faq-a">${a}</div>
    </div>
  `).join("");
  qsa(".faq-q").forEach(q => q.addEventListener("click", () => q.parentElement.classList.toggle("active")));
})();

// ===== Live status bar + notification =====
(function liveInit() {
  const msgs = [
    "🔥 3 students are viewing this course right now",
    "📢 Independence Day Offer: 50% OFF on ALL Courses",
    "🎓 New batch starts soon — reserve your seat"
  ];
  let i = 0;
  setInterval(() => {
    const bar = qs("#liveStatusBar");
    if (!bar) return;
    i = (i + 1) % msgs.length;
    bar.textContent = msgs[i];
  }, 3500);

  const live = qs("#liveNotification");
  const notif = ["Ahmed enrolled in Python 🎉", "Sara joined AI course 👏", "Hina enrolled in Graphic Designing ✨"];
  let n = 0;
  setInterval(() => {
    if (!live) return;
    live.textContent = notif[n];
    live.style.display = "block";
    setTimeout(() => live.style.display = "none", 2200);
    n = (n + 1) % notif.length;
  }, 7000);
})();

// ===== Back to top =====
(function backTopInit() {
  const b = qs("#backToTop");
  window.addEventListener("scroll", () => {
    if (!b) return;
    b.style.display = window.scrollY > 300 ? "grid" : "none";
  });
  b?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();

// initial courses render
renderCourses();
