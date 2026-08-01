🚀 Zero to Pro Computer & AI Academy – Website Documentation
📌 Website Overview
Yeh Zero to Pro Computer & AI Academy ki official website hai.
Isay HTML5, CSS3, aur JavaScript mein banaya gaya hai aur GitHub Pages par host kiya gaya hai.

Website fully responsive hai — mobile, tablet, aur desktop sab par perfect dikhti hai.
Isme Dark/Light Mode, Animations, Course Carousel, 50% Discount System, Countdown Timer, Student Reviews, aur Certificate System mojood hain.

📁 File Structure
text
/ (root)
├── index.html              (Main website)
├── style.css               (All styles)
├── script.js               (All functionality)
├── banner.js               (Promotional banner)
├── README.md               (Ye file)
└── assets/
    ├── logo.jpg            (Academy logo)
    ├── independenceday.jpeg (Independence Day poster)
    └── certificate.png     (Sample certificate)
🎨 Color Scheme
Mode	Background	Cards	Text	Accent
Light	#f8f9fa	#ffffff	#1e293b	#f59e0b
Dark	#0d1f0a	#1a3a14	#ffffff	#00A651
Primary Green: #01411c (Pakistan flag green)

Light Green: #00A651

Gold: #f59e0b

📋 Features List
🎯 1. Welcome Popup
Pehli baar visit par popup show hota hai

Poster image, welcome message, aur contact buttons

Close button ya background click se band hota hai

Version update hone par dobara show hota hai

📱 2. Responsive Navigation
Sticky header with logo and navigation links

Mobile par hamburger menu (☰)

Scroll karne par menu auto-close

Dark/Light mode toggle button

⌨️ 3. Typewriter Effect
Hero section mein heading typewriter style mein likhti hai

3 rotating phrases

🔢 4. Animated Counters
Scroll karne par numbers count-up hote hain

Students, Courses, Rating, Certificates

⏳ 5. Independence Day Countdown
14 August 2025 tak countdown

Din, ghante, minute, second dikhata hai

Refresh par kabhi disappear nahi hota

Expire hone par automatic hide

📚 6. Courses Carousel
17 courses with full details

Auto-slide (3 seconds) + manual arrows/dots

Course filter (All, Computer, AI, Freelancing, Free)

Har course ke liye "View Details" modal

💰 7. 50% Independence Day Discount
Original price strikethrough

Discounted price + "50% OFF" red badge

WhatsApp enrollment link with discounted price

🛤️ 8. Learning Path
4 steps: Zero → Basic → AI → Pro

Animated with icons and descriptions

🎓 9. Scholarship Section
"Want FREE Learning?" card

Scholarship test aur admission form links

⭐ 10. Student Reviews
Auto-sliding reviews (15 reviews)

Star ratings

"View all reviews" modal

User review submission (localStorage)

🏆 11. Success Stories
4 flip cards (click/hover to flip)

3 girls + 1 boy stories

🎓 12. Certificate Section
Sample certificate image display

👨‍🏫 13. Meet Founder
Abid Hussain introduction

Avatar + quote

❓ 14. FAQ Section
Accordion style (click to expand)

8 common questions with answers

📞 15. Contact Section
3 contact cards (Abid Hussain, Miss Anayea, Ms. Eman Fatima)

WhatsApp chat links

JazzCash/EasyPaisa payment info

Facebook, Instagram, Email links

🔼 16. Floating Buttons
Review button (green, bottom-right)

Back to Top button (appears after scroll)

📢 17. Live Notification
Bottom-left corner notification

Enrollment/activity messages

🌙 18. Dark/Light Mode
System preference auto-detect

Manual toggle button

Smooth transition

🚀 How to Use
Local Development:
Sab files ek folder mein rakhein

index.html ko browser mein kholen

Koi server ki zaroorat nahi

Deploy to GitHub Pages:
GitHub repository banayein

Sab files upload karein

Settings → Pages → Branch select karein

Website live ho jayegi

🔧 Customization Guide
Poster Change Karna:
index.html mein 2 jagah poster change karein:

Line ~30: Popup mein <img src="assets/independenceday.jpeg"

Line ~80: Hero section mein <img src="assets/independenceday.jpeg"

Course Fees Update Karna:
script.js mein courses array mein har course ki fee value change karein

Countdown Date Change Karna:
script.js mein ye line change karein:

javascript
const endDate = new Date('2025-08-14T23:59:59');
Discount Percent Change Karna:
script.js mein ye value change karein:

javascript
const DISCOUNT_PERCENT = 50;
Banner Text Change Karna:
banner.js mein bannerData object ki text aur link values change karein

📊 Courses List (17 Courses)
#	Course Name	Original Fee	Discounted (50%)
1	Basic Computer	Rs. 2,500	Rs. 1,250
2	Typing Course	Rs. 2,500	Rs. 1,250
3	Microsoft Office	Rs. 4,000	Rs. 2,000
4	Graphic Designing	Rs. 7,500	Rs. 3,750
5	Video Editing	Rs. 8,000	Rs. 4,000
6	Digital Marketing	Rs. 8,500	Rs. 4,250
7	Freelancing	Rs. 5,000	Rs. 2,500
8	Web Development	Rs. 10,000	Rs. 5,000
9	Programming	Rs. 12,000	Rs. 6,000
10	Networking	Rs. 10,000	Rs. 5,000
11	Database Management	Rs. 9,000	Rs. 4,500
12	Cloud Computing	Rs. 12,000	Rs. 6,000
13	Cyber Security	Rs. 15,000	Rs. 7,500
14	Ethical Hacking	Rs. 18,000	Rs. 9,000
15	AI (Artificial Intelligence)	Rs. 20,000	Rs. 10,000
16	AI Automation	Rs. 25,000	Rs. 12,500
17	Al-Quran Al-Karim	FREE	FREE
📞 Contact Information
Person	Role	WhatsApp
Abid Hussain	Founder & CEO	+92 306 1565858
Miss Anayea	Coordinator	+92 315 5344783
Ms. Eman Fatima	Coordinator	+92 370 4979576
Email: zerotoproaccedmy@gmail.com

Facebook: Zero to Pro Academy

Instagram: @zero_to_pro_ai_accedmy

Payment: JazzCash / EasyPaisa: 0304 6491358 (Abid Hussain)

🛠️ Technologies Used
HTML5

CSS3 (Custom Properties, Flexbox, Animations)

JavaScript (ES6+)

AOS (Animate on Scroll Library)

Font Awesome Icons

Google Fonts (Poppins, Nunito, Great Vibes, Playfair Display)

📝 Version History
Version	Date	Changes
5.0	2 Aug 2025	Independence Day theme, 50% discount, countdown fix
4.0	1 Aug 2025	Pakistan Academy style redesign
3.0	July 2025	All courses added, carousel, reviews
2.0	July 2025	Dark mode, counters, FAQ
1.0	June 2025	Initial release
📄 License
© 2025 Zero to Pro Computer & AI Academy. All rights reserved.

Made with ❤️ by Abid Hussain
Learn Today • Build Tomorrow • Lead the Future
