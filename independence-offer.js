// ===================================================
// Independence Day Offer – 14 August 2025
// Add this file on 14 Aug, remove after 15 Aug
// ===================================================

(function() {
  // ========== DISCOUNT SETTINGS ==========
  const DISCOUNT_PERCENT = 50;
  const DISCOUNT_ACTIVE = true;

  // ========== NEW COURSES WITH UPDATED FEES ==========
  const independenceCourses = [
    { name: "Basic Computer", fee: 2500, desc: "Computer fundamentals, MS Office, internet, safety.", topics: ["Computer Fundamentals", "Windows OS", "File/Folder Management", "Internet & Browsing", "Gmail & Google Workspace", "MS Word", "MS Excel", "MS PowerPoint", "PDF Tools", "Typing Skills", "Printing & Scanning", "Digital Safety"], cert: true, duration: "4 Weeks", category: "computer", progress: 85 },
    { name: "Typing Course", fee: 2500, desc: "Professional typing skills in English and Urdu.", topics: ["English Typing", "Urdu Typing", "Speed Building", "Accuracy Practice", "Formatting"], cert: false, duration: "2 Weeks", category: "computer", progress: 90 },
    { name: "Microsoft Office", fee: 4000, desc: "Complete MS Word, Excel, PowerPoint, and Outlook.", topics: ["MS Word Advanced", "MS Excel Advanced", "MS PowerPoint", "Outlook", "Google Workspace"], cert: true, duration: "4 Weeks", category: "computer", progress: 80 },
    { name: "Graphic Designing", fee: 7500, desc: "Canva, Photoshop, Illustrator – from basics to pro.", topics: ["Design Fundamentals", "Color Theory", "Typography", "Canva Mastery", "Adobe Photoshop", "Adobe Illustrator", "Logo Design"], cert: true, duration: "6 Weeks", category: "computer", progress: 75 },
    { name: "Video Editing", fee: 8000, desc: "CapCut, Premiere Pro, After Effects.", topics: ["Video Basics", "CapCut Pro", "Adobe Premiere Pro", "Transitions & Effects", "Color Grading", "Audio Editing", "Export & Delivery"], cert: true, duration: "6 Weeks", category: "computer", progress: 70 },
    { name: "Digital Marketing", fee: 8500, desc: "SEO, Social Media, Google Ads, Email Marketing.", topics: ["SEO Fundamentals", "Google Ads", "Facebook Ads", "Email Marketing", "Social Media Strategy", "Analytics"], cert: true, duration: "8 Weeks", category: "freelancing", progress: 65 },
    { name: "Freelancing", fee: 5000, desc: "Fiverr, Upwork – profile, bidding, clients.", topics: ["Profile Creation", "Gig Optimization", "Bidding Strategies", "Client Communication", "Payment Methods", "Portfolio Building"], cert: false, duration: "4 Weeks", category: "freelancing", progress: 90 },
    { name: "Web Development", fee: 10000, desc: "HTML, CSS, JavaScript, React, responsive sites.", topics: ["HTML5", "CSS3", "JavaScript", "React Basics", "Responsive Design", "Git & GitHub", "Hosting & Deployment"], cert: true, duration: "12 Weeks", category: "computer", progress: 60 },
    { name: "Programming", fee: 12000, desc: "Python, C++, Java – fundamentals to advanced.", topics: ["Python", "C++", "Java", "Data Structures", "Algorithms", "OOP"], cert: true, duration: "12 Weeks", category: "computer", progress: 55 },
    { name: "Networking", fee: 10000, desc: "CCNA basics, routing, switching, subnetting.", topics: ["IP Addressing", "Routing", "Switching", "Subnetting", "CCNA Prep"], cert: true, duration: "8 Weeks", category: "computer", progress: 50 },
    { name: "Database Management", fee: 9000, desc: "SQL, MySQL, MongoDB, data modeling.", topics: ["SQL", "MySQL", "MongoDB", "Data Modeling", "Queries"], cert: true, duration: "8 Weeks", category: "computer", progress: 45 },
    { name: "Cloud Computing", fee: 12000, desc: "AWS, Azure, Google Cloud fundamentals.", topics: ["AWS", "Azure", "Google Cloud", "Cloud Architecture", "Deployment"], cert: true, duration: "10 Weeks", category: "computer", progress: 40 },
    { name: "Cyber Security", fee: 15000, desc: "Network security, firewalls, threat analysis.", topics: ["Security Basics", "Firewalls", "Threat Analysis", "Encryption", "Incident Response"], cert: true, duration: "10 Weeks", category: "computer", progress: 35 },
    { name: "Ethical Hacking", fee: 18000, desc: "Penetration testing, vulnerability assessment.", topics: ["Networking", "Linux", "Reconnaissance", "Scanning", "Exploitation", "Reporting"], cert: true, duration: "12 Weeks", category: "computer", progress: 30 },
    { name: "Artificial Intelligence (AI)", fee: 20000, desc: "Machine learning, deep learning, NLP.", topics: ["ML Basics", "Deep Learning", "NLP", "Computer Vision", "Python AI"], cert: true, duration: "12 Weeks", category: "ai", progress: 25 },
    { name: "AI Automation", fee: 25000, desc: "Advanced AI tools, workflow automation, chatbots.", topics: ["AI Tools", "Workflow Automation", "Chatbots", "API Integration", "Real Projects"], cert: true, duration: "12 Weeks", category: "ai", progress: 20 },
    { name: "Al-Quran Al-Karim", fee: 0, desc: "Learn specific Surahs with proper Tajweed – completely free for everyone.", topics: ["Surah Al-Fatiha", "Surah Yaseen", "Surah Ar-Rahman", "Surah Al-Mulk", "Surah Al-Waqi'ah", "Tajweed Basics"], cert: false, duration: "Ongoing", category: "free", progress: 100 }
  ];

  // ========== HELPERS ==========
  function formatFee(fee) {
    if (fee === 0) return "FREE";
    return "Rs. " + fee.toLocaleString("en-PK");
  }

  function getDiscountedPrice(original) {
    return Math.round(original - (original * DISCOUNT_PERCENT / 100));
  }

  // ========== OVERRIDE COURSES AFTER PAGE LOADS ==========
  window.addEventListener('load', () => {
    setTimeout(() => {
      const track = document.getElementById('coursesTrack');
      const dotsContainer = document.getElementById('courseDots');
      if (!track || !dotsContainer) return;

      // Clear existing courses
      track.innerHTML = '';
      dotsContainer.innerHTML = '';

      independenceCourses.forEach((c, i) => {
        const originalFee = c.fee;
        const discountedFee = DISCOUNT_ACTIVE ? getDiscountedPrice(originalFee) : originalFee;
        const msg = `Hi, I want to enroll in *${c.name}* (Fee: ${formatFee(discountedFee)}). Please guide me.`;
        const link = `https://wa.me/923061565858?text=${encodeURIComponent(msg)}`;

        const card = document.createElement('div');
        card.className = 'course-card';

        // Fee display with 50% discount badge
        let feeHTML = '';
        if (DISCOUNT_ACTIVE && originalFee > 0) {
          feeHTML = `
            <div style="margin:10px 0;">
              <span style="text-decoration:line-through; opacity:0.6; font-size:1rem;">${formatFee(originalFee)}</span>
              <span style="font-size:1.6rem; font-weight:800; color:var(--cyan); margin-left:10px;">${formatFee(discountedFee)}</span>
              <span style="background:#dc2626; color:white; padding:3px 10px; border-radius:12px; font-size:0.8rem; margin-left:8px;">50% OFF</span>
            </div>
          `;
        } else {
          feeHTML = `<p class="course-fee">${formatFee(originalFee)}</p>`;
        }

        card.innerHTML = `
          <h3>${c.name}</h3>
          ${feeHTML}
          <p>${c.desc}</p>
          ${c.cert ? '<span style="background:#00A651; color:#000; padding:4px 12px; border-radius:12px; display:inline-block; margin:10px 0;">🎓 Certificate</span>' : ''}
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width:0%" data-width="${c.progress}%"></div>
          </div>
          <button class="btn btn-outline view-details-independence" data-index="${i}" style="margin:10px 0;">📋 View Details</button>
          <a href="${link}" target="_blank" class="btn btn-primary" style="margin-top:10px;">Enroll Now</a>
        `;
        track.appendChild(card);
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dotsContainer.appendChild(dot);
      });

      // Animate progress bars
      setTimeout(() => {
        document.querySelectorAll('.progress-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width;
        });
      }, 500);

      // View Details handlers
      document.querySelectorAll('.view-details-independence').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = +e.target.dataset.index;
          const course = independenceCourses[index];
          const discountedFee = DISCOUNT_ACTIVE ? getDiscountedPrice(course.fee) : course.fee;
          const msg = `Hi, I want to enroll in *${course.name}* (Fee: ${formatFee(discountedFee)}). Please guide me.`;
          const link = `https://wa.me/923061565858?text=${encodeURIComponent(msg)}`;

          const courseModal = document.getElementById('courseModal');
          const courseModalContent = document.getElementById('courseModalContent');
          if (courseModal && courseModalContent) {
            courseModalContent.innerHTML = `
              <h2>${course.name}</h2>
              <p style="font-size:1.4rem; color:var(--cyan); font-weight:700;">
                Fee: ${formatFee(discountedFee)}
                ${DISCOUNT_ACTIVE && course.fee > 0 ? `<span style="text-decoration:line-through; opacity:0.6; font-size:1rem; margin-left:10px;">${formatFee(course.fee)}</span><span style="background:#dc2626; color:white; padding:3px 10px; border-radius:12px; font-size:0.8rem; margin-left:8px;">50% OFF</span>` : ''}
              </p>
              <p><strong>Duration:</strong> ${course.duration}</p>
              <p><strong>Certificate:</strong> ${course.cert ? 'Yes' : 'No'}</p>
              <h4>Topics Covered:</h4>
              <ul class="topic-list">${course.topics.map(t => `<li>✅ ${t}</li>`).join('')}</ul>
              <a href="${link}" target="_blank" class="btn btn-primary" style="display:inline-block; margin-top:15px;">Enroll Now</a>
            `;
            courseModal.classList.add('active');
          }
        });
      });

    }, 1500);
  });

  // ========== UPDATE COUNTDOWN TO 14 AUGUST ==========
  window.addEventListener('load', () => {
    setTimeout(() => {
      const countdownSection = document.getElementById('countdownSection');
      const countdownEl = document.getElementById('countdown');
      if (!countdownSection || !countdownEl) return;

      // Update heading
      const heading = countdownSection.querySelector('h3');
      if (heading) heading.innerHTML = '🇵🇰 Independence Day Offer Ends In';

      // Update button
      const button = countdownSection.querySelector('.btn');
      if (button) {
        button.textContent = 'Claim 50% Discount';
        button.href = 'https://wa.me/923061565858?text=I%20want%20to%20avail%20the%2050%25%20Independence%20Day%20discount';
      }

      // Set countdown to 14 August 2025
      const endDate = new Date('2025-08-14T23:59:59');
      const timerInterval = setInterval(() => {
        const diff = endDate - new Date();
        if (diff <= 0) {
          if (countdownEl) countdownEl.textContent = 'Offer Expired';
          clearInterval(timerInterval);
          if (countdownSection) {
            countdownSection.style.opacity = '0';
            countdownSection.style.visibility = 'hidden';
            countdownSection.style.pointerEvents = 'none';
          }
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((diff % (1000 * 60)) / 1000);
          if (countdownEl) countdownEl.textContent = `${days}d ${h}h ${m}m ${s}s`;
        }
      }, 1000);
    }, 1500);
  });

  // ========== ADD PAKISTAN FLAG ==========
  window.addEventListener('load', () => {
    setTimeout(() => {
      const countersGrid = document.getElementById('counters');
      if (countersGrid) {
        const flagDiv = document.createElement('div');
        flagDiv.style.cssText = 'text-align:center; font-size:4rem; padding:20px; width:100%;';
        flagDiv.innerHTML = '🇵🇰';
        countersGrid.parentElement.insertBefore(flagDiv, countersGrid);
      }
    }, 1500);
  });

})();
