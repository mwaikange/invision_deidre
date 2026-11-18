const $ = s => document.querySelector(s);
const arrow = '<span aria-hidden="true">↗</span>';
const brandStar = '<svg class="brand-star" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><path d="M20 2v36M2 20h36M7.3 7.3l25.4 25.4M7.3 32.7 32.7 7.3" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>';
const button = (label, href, cls = 'dark') => `<a class="button ${cls}" href="${href}">${label}${arrow}</a>`;
const inquiry = (type, label = 'Let’s talk') => `<button class="button dark" data-inquiry="${type}">${label}${arrow}</button>`;
const heading = (eyebrow, title, description = '', cls = '') => `<div class="page-title ${cls}"><div class="page-head wrap reveal"><div class="crumb"><a href="#/">Home</a> / ${eyebrow}</div><span class="eyebrow">${eyebrow.toUpperCase()}</span><h1>${title}</h1>${description ? `<p>${description}</p>` : ''}</div></div>`;
const magazines = [
  { id:'08', date:'Feb – Apr 2019', year:'2019', title:'Eating to lower cholesterol', topic:'Food, wellbeing & everyday choices', tags:['Nutrition','Heart health'], cover:'assets/magazine-08.png', alt:'InVision Wellness Magazine, eighth edition, February to April 2019', articleTitle:'Eating to lower cholesterol', pages:['08-1.png','08-2.png'], pageTitles:['Eating to lower cholesterol','Pistachio-crusted salmon with glazed carrots'] },
  { id:'07', date:'Nov 2018 – Jan 2019', year:'2018', title:'From trauma to triumph', topic:'King Salomon’s road to recovery', tags:['Resilience','Community','Diabetes'], cover:'assets/magazine-07.jpg', alt:'InVision Wellness Magazine, seventh edition, featuring King Salomon', articleTitle:'Managing Type 2 Diabetes over the festive season', pages:['07-1.png','07-2.png'], pageTitles:['Managing Type 2 Diabetes over the festive season','Tips for the festive season'] },
  { id:'06', date:'Aug – Oct 2018', year:'2018', title:'A woman’s glow', topic:'Pregnancy, mental health & friendship', tags:['Pregnancy','Mind','Friendship'], cover:'assets/magazine-06.jpg', alt:'InVision Wellness Magazine, sixth edition, featuring a pregnant woman in a white dress', articleTitle:'The power of friendship', pages:['06-1.png'], pageTitles:['The power of friendship'] },
  { id:'04', date:'Feb – Apr 2018', year:'2018', title:'What your blood type is telling you…', topic:'Relationships, family & health awareness', tags:['Blood type','Family'], cover:'assets/magazine-04.jpg', alt:'InVision Wellness Magazine, fourth edition, with a heart-shaped collage of people', articleTitle:'What your blood type is telling you…', pages:['04-1.png','04-2.png'], pageTitles:['What your blood type is telling you, page one','What your blood type is telling you, page two'] },
  { id:'01', date:'June 2017', year:'2017', title:'Finding your purpose', topic:'The first issue, featuring Adriano', tags:['Stress','Anxiety','Purpose'], cover:'assets/magazine-01.jpeg', alt:'InVision Wellness Magazine, first edition, June 2017, featuring Adriano', articleTitle:'Reduce stress and anxiety in less than 15 minutes', pages:['01-1.jpeg'], pageTitles:['Reduce stress and anxiety in less than 15 minutes'] }
];
const testimonials = [
  { quote:'Many of the audiences truly enjoyed your presentations.', credit:'Leena', context:'World AIDS Day at the Bank of Namibia' },
  { quote:'They delivered the results of the health screens to the respective employees in a timely and confidential manner.', credit:'Raturua', context:'Corporate wellness services' },
  { quote:'Their work has been a major factor in the improvement of our staff Wellness programme.', credit:'Vilyo', context:'Staff wellness programme' },
  { quote:'Within 2 weeks of placing the advert in InVision Wellness Magazine, a major pharmaceutical sales company listed my product and bought all of my stock.', credit:'Pink Cup Sales Associate', context:'InVision Wellness Magazine advertiser' }
];
let magFilter = 'All', magSearch = '', breathTimer = null, breathStart = 0, sound = null;
let saved = [];
try { saved = JSON.parse(localStorage.getItem('invision-saved') || '[]'); if (!Array.isArray(saved)) saved = []; } catch { saved = []; }

function magCard(m) {
  return `<article class="mag-card"><div class="cover-wrap"><button class="mag-cover" data-mag="${m.id}" aria-label="Explore issue ${m.id}: ${m.articleTitle}"><img src="${m.cover}" alt="${m.alt}" loading="lazy" width="454" height="646"></button><button class="save-button ${saved.includes(m.id) ? 'saved' : ''}" data-save="${m.id}" aria-pressed="${saved.includes(m.id)}" aria-label="${saved.includes(m.id) ? 'Unsave' : 'Save'} issue ${m.id}">${saved.includes(m.id) ? '♥' : '♡'}</button></div><div class="mag-meta">Issue ${m.id} · ${m.date}</div><h3>${m.title}</h3><button class="text-link" data-mag="${m.id}">Explore the issue ↗</button></article>`;
}
function magazinePartners() {
  return `<section class="mag-partners" aria-labelledby="mag-partners-title"><span class="eyebrow">MAKE A CONNECTION</span><h2 id="mag-partners-title">How to make InVision Wellness Magazine part of <em>your story.</em></h2><p>Bring magazines to your business, connect with our readers as an advertiser, or contribute your professional perspective.</p><div class="partner-grid"><article><span class="partner-number">01</span><h3>For your business</h3><p>Make wellness reading part of your waiting area or employee wellness programme.</p>${inquiry('Magazine — distribution','Distribution enquiry')}</article><article><span class="partner-number">02</span><h3>For your brand</h3><p>Talk to us about advertising opportunities and sharing your offering with wellness-minded readers.</p>${inquiry('Magazine — advertising','Advertising enquiry')}</article><article><span class="partner-number">03</span><h3>For our Experts</h3><p>Help make credible, relevant information more accessible by sharing your professional perspective.</p>${inquiry('Magazine — contributor','Become a contributor')}</article></div></section>`;
}
function testimonialTicker() {
  const quotes = testimonials.map(t => `<blockquote><p>“${t.quote}”</p><cite>${t.credit} <span>· ${t.context}</span></cite></blockquote><b aria-hidden="true">${brandStar}</b>`).join('');
  return `<section class="testimonial-ticker" aria-label="Words from our community"><div class="testimonial-marquee"><div class="testimonial-group">${quotes}</div><div class="testimonial-group" aria-hidden="true">${quotes}</div></div><button class="ticker-toggle" data-action="ticker" aria-pressed="false">Pause testimonials <span aria-hidden="true">Ⅱ</span></button></section>`;
}
function breath() {
  return `<section class="pause-section section wrap"><div><span class="eyebrow">A LITTLE SPACE FOR YOU</span><h2>Your next step?<br>Take a <em>breath.</em></h2><p>Before the next meeting. Before the next thing. Give yourself one quiet minute, right here.</p><p class="breath-note">Follow a gentle, comfortable rhythm. Breathe naturally whenever you prefer.</p></div><div class="breath-box"><div class="breath-orbit"><div class="breath-circle" id="breath-circle"><strong id="breath-label">Just be.</strong><span id="breath-count">YOUR ONE-MINUTE RESET</span></div></div><audio id="gentle-audio" src="assets/gentle-music.wav" preload="metadata" loop hidden></audio><div class="breath-actions"><button class="button light" data-action="breathe" id="breath-button">Start my minute <span aria-hidden="true">↗</span></button><button class="music-toggle" data-action="music" aria-pressed="false"><span aria-hidden="true">♫</span> Play gentle music</button></div><div class="breath-status" id="breath-status" role="status">A little pause can be a lovely place to start.</div></div></section>`;
}
const dimensions = [
  ['Emotional','Making space to recognise feelings and seek support.'], ['Spiritual','Connecting with purpose, values and what gives life meaning.'],
  ['Intellectual','Staying curious, learning and exploring new perspectives.'], ['Physical','Making room for movement, rest and everyday physical wellbeing.'],
  ['Environmental','Considering how our surroundings support us and how we care for them.'], ['Financial','Building awareness and confidence around everyday financial choices.'],
  ['Occupational','Finding balance, purpose and wellbeing in working life.'], ['Social','Nurturing relationships, belonging and community connection.']
];
function dimensionsSection() {
  return `<div class="dimensions-section"><div class="dimensions-art"><img src="assets/wellness-dimensions.svg" alt="Eight dimensions of wellness: emotional, spiritual, intellectual, physical, environmental, financial, occupational and social" loading="lazy" width="500" height="500"></div><div><span class="eyebrow">THE WHOLE PERSON. THE WHOLE PICTURE.</span><h2>Eight dimensions.<br>One <em>whole you.</em></h2><p>We see the whole person. That’s why our approach incorporates the eight dimensions of wellness. Taking into consideration every aspect that makes up our well-being.</p><div class="dimension-options" role="group" aria-label="Explore the eight dimensions">${dimensions.map(([name],i) => `<button data-dimension="${i}" aria-pressed="${i === 0}" class="${i === 0 ? 'active' : ''}">${name}</button>`).join('')}</div><p class="dimension-detail" id="dimension-detail" role="status"><strong>Emotional wellness.</strong> ${dimensions[0][1]}</p></div></div>`;
}
function home() {
  return `<section class="hero wrap reveal"><div class="hero-copy"><h1>For your body.<br>Your mind.<br>Your <em class="soul">soul.</em></h1><p>Wellness is a whole-life kind of thing. Let’s make space for more energy, better balance, and a little more you.</p><div class="hero-actions">${button('Explore our corporate wellness options','#/corporate','gold')}<a class="text-link" href="#/about">Get to know us ↗</a></div><div class="hero-foot">IF YOU CAN SEE IT, THEN YOU CAN BE IT.</div></div><div class="hero-art photo-hero"><div class="hero-photo-frame"><img id="hero-scene" src="assets/movement.webp" alt="Illustrative lifestyle scene of three women enjoying an outdoor walk" width="1536" height="1024" fetchpriority="high"><div class="photo-bottom"><span>A LITTLE MORE WELLNESS. EVERY DAY.</span></div></div><span class="photo-star" aria-hidden="true">${brandStar}</span><div class="service-shortcuts" aria-label="Explore our products and services"><a href="#/corporate"><img src="assets/workplace.png" alt=""><span>Corporate wellness</span></a><a href="#/magazine"><img src="assets/magazine-08.png" alt=""><span>Magazine</span></a><a href="#/vault"><img class="shortcut-vault" src="assets/vault-phone.svg" alt=""><span>The VA(u)LT</span></a><a href="#/courses"><img src="assets/workplace.png" alt=""><span>Online courses</span></a><a href="#/bloom"><img class="shortcut-bloom" src="assets/bloom-logo.jpg" alt=""><span>BLOOM</span></a><a href="#/clinic"><img src="assets/quick-care-clinic.webp" alt=""><span>Quick Care Clinic</span></a></div><button class="floating-note" data-action="pause"><span class="note-top"><span class="note-icon">✷</span>A moment for yourself <span aria-hidden="true">↗</span></span><p>Try your one-minute breathing break.</p></button></div></section>${testimonialTicker()}<section class="section wrap"><div class="section-head"><div><span class="eyebrow">EXPLORE OUR PRODUCTS + SERVICES… THERE’S SOMETHING FOR EVERYONE</span><h2>Wellness; from a<br><em>holistic approach.</em></h2></div><p>From the workplace to your everyday, we bring practical wellness closer to the people who need it. Good information. Real support. Opportunities to grow.</p></div><div class="world-grid"><a class="world-card workplace-card" href="#/corporate"><span class="card-no">WORKPLACE WELLNESS OPTIONS</span><span class="round-arrow" aria-hidden="true">↗</span><div class="card-art image-art"><img src="assets/workplace.png" alt="Illustrative workplace stretch break" loading="lazy"></div><h3>People first.<br>Better together.</h3><p>Corporate wellness programmes built around your team and their everyday lives.</p></a><a class="world-card magazine-card" href="#/magazine"><span class="card-no">NAMIBIA’S ONLY HEALTH + WELLNESS MAGAZINE</span><span class="round-arrow" aria-hidden="true">↗</span><div class="card-art mini-covers">${['01','04','06','08'].map(id => `<img class="mini-book" src="${magazines.find(m => m.id === id).cover}" alt="" loading="lazy">`).join('')}</div><h3>Credible information.<br>Local perspectives.</h3><p>Explore the issues, stories and experts behind InVision Wellness Magazine.</p></a><a class="world-card vault-card" href="#/vault"><span class="card-no">UNIQUE LEARNING TOOLS</span><span class="round-arrow" aria-hidden="true">↗</span><div class="card-art image-art"><img src="assets/nourish.png" alt="Colourful food and everyday wellness" loading="lazy"><span class="image-art-label"><img src="assets/vault-phone.svg" alt="VA(u)LT"></span></div><h3>Small lessons.<br>Everyday possibility.</h3><p>Digestible, practical wellness learning through The VA(u)LT.</p></a><a class="world-card course-world-card" href="#/courses"><span class="card-no">ONLINE COURSES / PROFESSIONAL DEVELOPMENT</span><span class="round-arrow" aria-hidden="true">↗</span><div class="card-art image-art"><img src="assets/workplace.png" alt="Illustrative workplace wellness scene" loading="lazy"></div><h3>Learning for life.<br>Room for you.</h3><p>Build your skills with ten professional development course topics. Explore courses on Elev8tingCoaches.</p></a><a class="world-card bloom-world-card" href="#/bloom"><span class="card-no">BLOOM / PRENATAL + POSTPARTUM WELLNESS</span><span class="round-arrow" aria-hidden="true">↗</span><div class="card-art image-art"><img src="assets/bloom-couple.webp" alt="Illustrative expectant couple sharing a relaxed moment" loading="lazy"></div><h3>Your next chapter.<br>With support.</h3><p>Practical preparation for pregnancy, birth and postpartum in a six-week, in-person programme.</p></a><a class="world-card clinic-world-card" href="#/clinic"><span class="card-no">QUICK CARE CLINIC</span><span class="round-arrow" aria-hidden="true">↗</span><div class="card-art image-art"><img src="assets/quick-care-clinic.webp" alt="Illustration of a small clinic with a nurse and receptionist" loading="lazy"></div><h3>Healthcare.<br>Closer to you.</h3><p>Explore convenient on-site primary healthcare and preventative wellness for your workplace or institution.</p></a></div>${dimensionsSection()}</section><section class="magazine-section"><div class="wrap section"><div class="section-head"><div><span class="eyebrow">INVISION WELLNESS MAGAZINE / FROM OUR ARCHIVE</span><h2>Credible information.<br>Provided by <em>local experts.</em></h2></div><a class="text-link" href="#/magazine">Explore the magazine ↗</a></div><div class="magazine-grid five-issues">${magazines.map(magCard).join('')}</div><div class="mag-bottom"><p>A look back at the issues that started conversations + change. Preview the cover stories. Contribute an article. Ask about issue availability.</p><a class="text-link" href="#/magazine">Read. Share. Be inspired. ↗</a></div></div></section><section class="section wrap magazine-partners-home">${magazinePartners()}</section>${breath()}<section class="section wrap"><div class="bloom-panel"><div class="bloom-art bloom-photo"><img class="bloom-lifestyle" src="assets/bloom.png" alt="Illustrative pregnancy wellness scene: a couple sharing a relaxed moment at home" loading="lazy"><img class="bloom-photo-logo" src="assets/bloom-logo.jpg" alt="BLOOM prenatal &amp; postpartum wellness"></div><div class="bloom-copy"><span class="eyebrow">A NEW CHAPTER, TOGETHER</span><h2>A little more ready.<br>A lot more <em>supported.</em></h2><p>Meet BLOOM: our six-week, in-person pregnancy preparation course. Practical learning for pregnancy, birth and the weeks that follow — with space for your partner, too.</p><div class="pills"><span class="pill">6 weeks</span><span class="pill">In person</span><span class="pill">Medical aid claims available</span><span class="pill">Private pay available</span></div>${button('Discover BLOOM','#/bloom')}</div></div></section><section class="wrap city-home"><div class="city-strip"><span class="city-icon" aria-hidden="true">${brandStar}</span><div><span class="eyebrow">COMMUNITY CONNECTIONS. GOOD ENERGY.</span><h3>Wellness belongs out here.</h3><p>Attend, exhibit or sponsor Wellness in the City.</p></div>${button('Get involved','#/city')}</div></section><section class="closing wrap"><span class="eyebrow">YOUR NEXT CHAPTER STARTS WITH A CONVERSATION</span><h2>Let’s make room<br>for <em>feeling good.</em></h2>${button('Say hello','#/contact','purple')}</section>`;
}
function planner() {
  return `<aside class="planner"><span class="eyebrow">LET’S FIND YOUR STARTING POINT</span><h3>Your team. Your plan.</h3><p>A few details to spark a useful conversation. This is a programme idea, ready for the team to tailor with you.</p><form id="planner-form"><div class="field"><label for="team-size">How big is your team?</label><select id="team-size"><option>Under 25 people</option><option>25–100 people</option><option>More than 100 people</option></select></div><div class="field"><label for="team-goal">What would you like to focus on?</label><select id="team-goal"><option value="balance">Stress & balance</option><option value="movement">Movement & connection</option><option value="awareness">Health awareness</option></select></div><button class="button dark" type="submit">Shape my starting point ${arrow}</button></form><div class="planner-result hidden" id="planner-result" role="status"></div></aside>`;
}
function corporate() {
  const services = [['Health awareness & screening','Health talks and workplace screening, with confidential individual results and an overview + recommendations to help guide future wellness activities.'],['Movement & team connection','Group fitness, team-building activities, ergonomics discussions and practical ways to bring movement into the workday.'],['Everyday wellbeing','Nutrition, stress management, women’s and men’s health, HIV/AIDS workplace management and individual wellness coaching.'],['Learning that keeps going','Magazine content and The VA(u)LT can support your programme between sessions, making learning easier to share.']];
  return heading('Corporate wellness','A healthier team.<br>A stronger <em>company.</em>','Wellness works best when it fits the people behind the job titles. Build a programme around your team’s needs, interests and working lives.') + `<section class="wrap content-section two-col corporate-layout"><div><span class="eyebrow">PEOPLE BEFORE PROGRAMMES</span><h2>More than a<br>once-a-year talk.</h2><p>We pair education with practical activities and follow-through. From a focused wellness day to an ongoing programme, the starting point is understanding your workplace.</p><div class="service-list">${services.map((s,i) => `<div class="service-item"><span>0${i+1}</span><div><h3>${s[0]}</h3><p>${s[1]}</p></div></div>`).join('')}</div></div><div class="corporate-aside">${planner()}<article class="qcc-card"><span class="eyebrow">OUR NEWEST SERVICE</span><h3>Quick Care Clinic</h3><p>Bring essential primary healthcare and preventative wellness services into your workplace or institution.</p><ul><li>Help decrease time spent away from work to seek medical attention.</li><li>Support lower absenteeism and greater productivity.</li><li>Build employee trust and loyalty.</li></ul><p class="qcc-promise">You provide the space.<br>We provide the experts.</p>${button('Explore Quick Care Clinic','#/clinic')}</article></div></section><section class="wrap section-end"><div class="callout"><div><h3>Let’s build something that fits.</h3><p>Tell us what you have in mind and we’ll discuss programme options, scheduling and a tailored quotation.</p></div>${inquiry('Corporate wellness','Talk to the team')}</div></section>`;
}
function filteredMagazines() {
  const list = magazines.filter(m => (magFilter === 'All' || magFilter === 'Saved' && saved.includes(m.id) || m.year === magFilter) && [m.title,m.topic,m.articleTitle,m.date,...m.tags].join(' ').toLowerCase().includes(magSearch.toLowerCase()));
  return list.length ? list.map(magCard).join('') : '<p class="empty">No issues here yet. Try another topic, or save an issue using its heart button.</p>';
}
function magazine() {
  return heading('The magazine','A good read.<br>A fresh <em>outlook.</em>','Namibian voices. Professional perspectives. Everyday wellness, from movement and nutrition to mental, family and financial wellbeing.','magazine-title') + `<section class="wrap content-section magazine-archive"><div class="section-head"><div><span class="eyebrow">THE ISSUE ARCHIVE</span><h2>Take a closer look.</h2></div><p>Explore five issues from our archive. Save a favourite to this browser or preview an article in detail.</p></div><div class="filters" aria-label="Filter magazine issues">${['All','2019','2018','2017','Saved'].map(x => `<button class="filter ${magFilter === x ? 'active' : ''}" data-filter="${x}" aria-pressed="${magFilter === x}">${x === 'All' ? 'All issues' : x === 'Saved' ? 'Saved ♡' : x}</button>`).join('')}<input class="search" type="search" id="mag-search" aria-label="Search issue titles and articles" placeholder="Find a topic…" value="${escapeHtml(magSearch)}"></div><div class="magazine-grid five-issues" id="magazine-results">${filteredMagazines()}</div><p class="archive-note">Cover and article previews only. Ask us about full issue availability in print or digital format.</p>${magazinePartners()}</section>`;
}
function vault() {
  return heading('The VA(u)LT','A small lesson.<br>A new <em>possibility.</em>','Video-assisted unique learning tools. Short, practical, digestible wellness content created to bring learning into your busy, everyday life.','vault-title') + `<section class="wrap content-section"><div class="vault-feature"><div class="vault-symbol vault-photo"><img src="assets/nourish.png" alt="Fresh food, colour and everyday wellness" loading="lazy"><div class="vault-photo-brand"><img class="vault-logo" src="assets/vault-phone.svg" alt="The VA(u)LT logo with a phone inside the U"><p>VIDEO-ASSISTED UNIQUE LEARNING TOOLS</p></div></div><div><span class="eyebrow">LEARN IT. TRY IT. LIVE IT.</span><h2>Expert perspectives.<br>Everyday application.</h2><p>The VA(u)LT brings 5–10 minute wellness videos together with supporting magazine content and practical behaviour-change tools. Designed for teams of different sizes, including those without a dedicated wellness officer.</p>${inquiry('The VA(u)LT — company interest','Explore a package')}</div></div><div class="facts"><div class="fact"><h3>Short by design</h3><p>Bite-sized learning that’s easier to make space for, with practical ideas to put into action.</p></div><div class="fact"><h3>Local perspectives</h3><p>Content featuring professionals in Namibia’s health, fitness, mental wellbeing and financial wellness fields.</p></div><div class="fact"><h3>Shared more easily</h3><p>Packages for small, medium and large enterprises, with content that can be shared by your designated staff member.</p></div></div><div class="callout vault-contributor"><div><h3>Have something worth sharing?</h3><p>We’d love to hear from professionals interested in contributing to The VA(u)LT. Video access and package details are available from the team.</p></div>${inquiry('The VA(u)LT — contributor','Become a contributor')}</div></section>${breath()}`;
}
const bloomTopics = [['Pregnancy, with perspective','Understand the clinical journey and the questions to bring to your care team, alongside practical learning about nutrition, movement and everyday wellbeing.'],['Preparing for birth','Use information and demonstrations to become more familiar with delivery and the transition into the postpartum period.'],['Your wellbeing matters, too','Make space for mental and emotional wellbeing during pregnancy and after birth, alongside physical preparation.'],['Practical skills for a new chapter','The course includes exercises appropriate for expecting mothers, as well as infant CPR demonstrations, and a closer look at healthy product choices.'],['Bring your partner into the picture','A partner masterclass creates space to learn together and talk about practical support during this new chapter.']];
const learningSite = 'https://www.elev8tingcoaches.com/challenges';
const courseTopics = [
  ['Behavior Change Theory & Principles','Explore the science behind human behavior and learn evidence-based strategies to help individuals overcome barriers, strengthen motivation, and make meaningful, sustainable lifestyle changes.'],
  ['Exercise & Physical Activity','Explore the science of exercise and learn practical coaching strategies to help individuals become more active, improve physical fitness, and build sustainable movement habits.'],
  ['Diabetes Management','Gain the knowledge and coaching skills to support individuals living with diabetes through healthier lifestyle choices, improved self-management, and sustainable behavior change.'],
  ['Stress Management','Learn to recognize the effects of stress on physical and mental well-being and equip individuals with practical strategies to manage stress, build resilience, and improve their quality of life.'],
  ['Tobacco Cessation','Understand nicotine dependence and develop evidence-based coaching skills to help individuals overcome barriers, navigate cravings, and work toward a tobacco-free lifestyle.'],
  ['Sleep Health','Discover the science behind restorative sleep and learn how to help individuals identify unhealthy sleep patterns, improve sleep habits, and support their overall well-being.'],
  ['Heart Health','Build your understanding of cardiovascular health, including blood pressure and cholesterol, while learning coaching strategies that support heart-healthy habits and long-term wellness.'],
  ['Suicide Prevention','Develop the awareness and practical skills to recognize potential suicide warning signs, respond with compassion, and connect individuals with appropriate professional and emergency support.'],
  ['Motivation & Inspiration','Master techniques that help individuals discover their own motivation, overcome barriers to change, and build the confidence needed to achieve meaningful personal and wellness goals.'],
  ['Nutrition Science','Explore the fundamentals of nutrition and learn how to translate scientific knowledge into practical coaching strategies that support healthier eating habits and informed food choices.']
];
function learningButton(label = 'Explore on Elev8tingCoaches', topic = '') {
  return '<a class="button dark" href="'+learningSite+'" target="_blank" rel="noopener noreferrer"'+(topic ? ' aria-label="Explore '+escapeHtml(topic)+' on Elev8tingCoaches (opens in a new tab)"' : '')+'>'+label+arrow+'</a>';
}
function courses() {
  return heading('Online courses','Professional Development<br><em>Workshops.</em>','Expand Your Knowledge. Strengthen Your Skills. Elevate Your Impact.','courses-title') + '<section class="wrap content-section"><div class="learning-intro"><div><span class="eyebrow">FOR WELLNESS PROFESSIONALS + RECENT GRADUATES</span><h2>Build your knowledge.<br>Elevate your <em>impact.</em></h2></div><div><p>Our professional development workshops are designed for wellness professionals working in corporate wellness and recent graduates looking to strengthen their expertise and advance their careers. Through evidence-based education, practical applications, and real-world scenarios, participants gain the knowledge and skills needed to confidently support individuals in achieving better health and well-being.</p><p>Whether you\'re an experienced wellness professional or just beginning your career, our workshops provide opportunities to sharpen your skills, expand your capabilities, and become a more effective wellness professional.</p></div></div><div class="callout learning-platform"><div><span class="eyebrow">YOUR LEARNING DESTINATION</span><h3>Learn with Elev8tingCoaches.</h3><p>Visit Elev8tingCoaches for course availability, purchase, participation and access to your learning.</p></div>'+learningButton('Visit Elev8tingCoaches')+'</div><div class="course-topic-grid">'+courseTopics.map(([name,description])=>'<article class="course-topic"><h2>'+escapeHtml(name)+'</h2><p>'+description+'</p>'+learningButton('Explore on Elev8tingCoaches',name)+'</article>').join('')+'</div><div class="callout bloom-course-link"><div><h3>Preparing for a new chapter?</h3><p>BLOOM is our separate in-person prenatal and postpartum wellness programme.</p></div>'+button('Discover BLOOM','#/bloom')+'</div></section>';
}
function bloom() {
  return heading('BLOOM: prenatal + postpartum wellness','Growing a family.<br>Growing <em>your confidence.</em>','Pregnancy preparation with practical learning, thoughtful support and space to ask questions.','courses-title') + '<section class="wrap content-section"><div class="bloom-hero"><div class="bloom-course-photo"><img class="bloom-lifestyle" src="assets/bloom.png" alt="Illustrative expectant couple at home" loading="eager"><img class="bloom-photo-logo" src="assets/bloom-logo.jpg" alt="BLOOM prenatal &amp; postpartum wellness"></div><div><span class="eyebrow">BLOOM / PRENATAL + POSTPARTUM WELLNESS</span><h2>Your next chapter,<br>with support.</h2><p>A six-week in-person course combining information with demonstrations to help you prepare for pregnancy, delivery and postpartum.</p><div class="pills"><span class="pill">6-week course</span><span class="pill">Twice weekly</span><span class="pill">45-minute sessions</span><span class="pill">In person</span></div><div class="payment-options"><span>Medical aid claims available</span><span>Private pay available</span></div><p>Required exercise equipment included. Confirm medical aid eligibility and benefits with the team and your provider.</p>'+inquiry('BLOOM — registration interest','Enquire about joining')+'</div></div><div class="two-col bloom-details"><div><span class="eyebrow">MAKE ROOM FOR THE QUESTIONS</span><h2>Information meets<br><em>demonstration.</em></h2><p>Learning what to expect is one part of preparation. Seeing and practising how is another. BLOOM brings both into the room, with a partner masterclass included in the programme.</p><p class="small-note">Contact us for the next course dates, venue, availability and registration process.</p><figure class="bloom-support-photo"><img src="assets/bloom-couple.webp" alt="Illustrative white expectant couple sharing a supportive moment at home" loading="lazy" width="1536" height="1024"></figure></div><div class="accordion">'+bloomTopics.map((s,i)=>'<details '+(i===0?'open':'')+'><summary>'+s[0]+'</summary><p>'+s[1]+'</p></details>').join('')+'</div></div></section>';
}
function myCourses() {
  return heading('My learning','Your courses.<br>Your next <em>step.</em>','Continue your learning on Elev8tingCoaches.')+'<section class="wrap content-section"><div class="callout"><div><h2>Your learning has a home.</h2><p>Course purchases and participation take place on Elev8tingCoaches. Visit the learning website to sign in and access your courses.</p></div>'+learningButton('Go to Elev8tingCoaches')+'</div>'+button('Explore online courses','#/courses','light')+'</section>';
}
function clinic() {
  const services = ['Basic medical care, wound care, and first aid','Blood pressure, blood glucose, and cholesterol screenings','HIV testing and counseling','Pregnancy testing and family planning services','Vaccinations and preventive healthcare','Mental health screenings and referrals','Health and wellness coaching','IV Services','Health education and wellness promotion','Referrals for specialized medical care'];
  return heading('Quick Care Clinic','Bringing Healthcare<br><em>Closer to You.</em>','Quality healthcare should be convenient, accessible, and part of everyday life.')+'<section class="wrap content-section"><div class="clinic-intro"><figure class="clinic-photo"><img src="assets/quick-care-clinic.webp" alt="Illustrative small on-site clinic with a nurse and receptionist, reception desk and examination room" width="1536" height="1024"><figcaption>An illustration of the Quick Care Clinic model.</figcaption></figure><div><span class="eyebrow">PRIMARY HEALTHCARE + PREVENTATIVE WELLNESS</span><h2>Everyday healthcare.<br>In a familiar <em>place.</em></h2><p>The Quick Care Clinic Model by InVision Wellness Consultancy brings essential primary healthcare and preventative wellness services directly into workplaces, educational institutions, and other organizations.</p><p>Our model is designed to make it easier for employees and students to access routine health screenings, basic medical care, preventive services, and wellness support without the inconvenience of traveling to an external healthcare facility.</p><p>By integrating healthcare into familiar environments, we help organizations take a proactive approach to health, encourage early intervention, and support the overall well-being of the people they serve.</p>'+inquiry('Quick Care Clinic — workplace interest','Explore a clinic for your organization')+'</div></div><section class="clinic-services"><span class="eyebrow">WHAT WE OFFER</span><h2>Essential care.<br><em>Practical support.</em></h2><p>Our clinics are designed to provide a range of essential healthcare and wellness services, including:</p><ul>'+services.map(s=>'<li>'+s+'</li>').join('')+'</ul><p class="clinic-scope">Services are tailored to each organization\'s needs and delivered within applicable clinical licensing and professional scope requirements.</p></section><section class="clinic-partnership two-col"><div><span class="eyebrow">A PARTNERSHIP THAT WORKS</span><h2>A shared commitment<br>to <em>healthier people.</em></h2></div><div><p>Our model allows organizations to offer convenient preventative and primary healthcare access without the responsibility of managing a medical facility.</p><p>InVision Wellness Consultancy oversees clinic operations, including qualified healthcare personnel, equipment, supplies, and day-to-day service delivery, while working with each organization to establish a suitable on-site healthcare space.</p><p>Together, we create an environment where accessing healthcare becomes simpler, more convenient, and more proactive.</p></div></section><div class="callout clinic-close"><div><h2>Better Access. Healthier People.<br>Stronger Organizations.</h2><p>Investing in accessible healthcare is an investment in the people who make your organization thrive.</p><p>Partner with InVision Wellness Consultancy to explore bringing a Quick Care Clinic to your workplace or institution.</p></div>'+inquiry('Quick Care Clinic — workplace interest','Partner with us')+'</div></section>';
}
function about() {
  return heading('Our story','A whole-person view.<br>A very human <em>approach.</em>','InVision Wellness brings health, education, fitness and behavioural science together to support healthier, happier and more productive lives in Namibia.') + `<section class="wrap content-section founders-top"><div class="section-head"><div><span class="eyebrow">THE FOUNDERS / THE PEOPLE BEHIND THE PERSPECTIVE</span><h2>Meet Hileni & Deidre.</h2></div><p>Different disciplines. A shared commitment to supporting the whole person.</p></div><div class="team-grid founder-grid"><article class="team-card founder-card"><img class="founder-photo" src="assets/hileni-phillips.jpg" alt="Hileni Ngishishange, MPH, RN" loading="eager" width="552" height="1080"><div class="founder-copy"><span class="eyebrow">CO-FOUNDER / CO-MANAGEMENT</span><h3>Hileni Ngishishange <span>MPH, RN</span></h3><p>Talk to Hileni about your individual or corporate wellness needs.</p><a class="button light" href="tel:+264812910252">+264 81 291 0252 ${arrow}</a></div></article><article class="team-card founder-card"><img class="founder-photo" src="assets/deidre-kwenani.jpeg" alt="Dr Deidre Kwenani, DBH, MSW" loading="eager" width="683" height="1024"><div class="founder-copy"><span class="eyebrow">CO-FOUNDER / CO-MANAGEMENT</span><h3>Dr Deidre Kwenani <span>DBH, MSW</span></h3><p>Connect with Deidre and explore what wellness could look like for you.</p><a class="button light" href="tel:+264812072700">+264 81 207 2700 ${arrow}</a></div></article></div></section><section class="wrap content-section two-col"><div><span class="eyebrow">IF YOU CAN SEE IT, THEN YOU CAN BE IT.</span><h2>Seeing possibility.<br>Supporting change.</h2></div><div><p>We believe wellness education is most useful when people can put it into practice. Our approach pairs information with movement, coaching and practical support that fits real life.</p><p>Co-managed by Hileni Ngishishange and Dr Deidre Kwenani, InVision Wellness draws on nursing, public health, social work and behavioural health expertise. Our multidisciplinary and holistic approach caters to individual needs and the wider wellbeing of workplaces and our shared community.</p><p>Our magazine, corporate programmes, learning tools, and online + in-person courses offer different ways into the same conversation: what would a healthier life look like for you, and how can we help you move towards it?</p><div class="values"><span class="value">Integrity</span><span class="value">Professionalism</span><span class="value">Excellence</span><span class="value">Transparency</span></div></div></section>`;
}
function city() {
  return heading('Wellness in the City','Community connections.<br><em>Good energy.</em>','Explore what products and services Namibia has to offer. Attend the event, bring your wellness offering into the community, or express your interest in sponsoring Wellness in the City.') + `<section class="wrap content-section"><div class="city-page-art"><img class="city-photo" src="assets/movement.webp" alt="Illustrative outdoor movement and community scene" loading="lazy"><div><span class="eyebrow">LET’S BRING WELLNESS CLOSER</span><h2>Meet.<br>Move.<br><em>Connect.</em></h2><p>Interested in being part of the next event? Let’s start a conversation. Dates, venue and participation details will be shared by the team when confirmed.</p></div><span aria-hidden="true">${brandStar}</span></div><div class="facts city-options"><div class="fact"><h3>Attend the event</h3><p>Come see what exciting new developments are happening in the Namibian health and wellness space.</p>${inquiry('Wellness in the City — attend the free event','Join the free Event')}<p class="small-note">Ask to join our event email list so we can share the details with you.</p></div><div class="fact"><h3>Bring your booth</h3><p>Introduce your business, products or wellness services to the community. Tell us what you would like to showcase.</p>${inquiry('Wellness in the City — exhibitor','Exhibit with us')}</div><div class="fact"><h3>Support the experience</h3><p>Explore sponsorship and partnership opportunities that help make community wellness possible.</p>${inquiry('Wellness in the City — sponsor','Become a sponsor')}</div></div></section>`;
}
const inquiryTypes = ['General enquiry','Corporate wellness','Quick Care Clinic — workplace interest','Magazine — distribution','Magazine — advertising','Magazine — contributor','The VA(u)LT — company interest','The VA(u)LT — contributor','BLOOM — registration interest','Wellness Workshops — course updates','Wellness in the City — attend the free event','Wellness in the City — exhibitor','Wellness in the City — sponsor','Course access & enrolment'];
function enquiryForm(type = 'General enquiry', modal = false) {
  const p = modal ? 'modal-' : 'contact-';
  return `<form class="enquiry-form" data-prefix="${p}"><div class="form-row"><div class="field"><label for="${p}name">Your name *</label><input id="${p}name" name="name" required maxlength="100" autocomplete="name"></div><div class="field"><label for="${p}email">Email address *</label><input id="${p}email" name="email" type="email" required maxlength="150" autocomplete="email"></div></div><div class="field"><label for="${p}org">Business / organisation</label><input id="${p}org" name="organisation" maxlength="150" autocomplete="organization"></div><div class="field"><label for="${p}interest">I’m interested in *</label><select id="${p}interest" name="interest">${inquiryTypes.map(x => `<option ${x === type ? 'selected' : ''}>${x}</option>`).join('')}</select></div><div class="field"><label for="${p}message">What do you have in mind? *</label><textarea id="${p}message" name="message" required maxlength="2000" placeholder="Tell us a little about your enquiry…">${type.includes('attend the free event') ? 'Please add me to the Wellness in the City event email list and send me the event details when available.' : type.includes('course updates') ? 'Please keep me informed about upcoming Wellness Workshop Courses.' : ''}</textarea></div><label class="consent"><input type="checkbox" required><span>I’m happy for InVision Wellness to use these details to respond to my enquiry${type.includes('attend the free event') ? ' and send me event email updates' : type.includes('course updates') ? ' and send me course announcements' : ''}.</span></label><p class="form-note">Please keep this to a general enquiry. For your privacy, do not include medical records, test results or sensitive health information.</p><button class="button dark" type="submit">Prepare my email ${arrow}</button><p class="form-note">This opens an email draft for you to review and send. Your enquiry is not submitted automatically.</p><div class="form-status" role="status"></div></form>`;
}
function contact() {
  return heading('Let’s connect','Good things start<br>with a <em>hello.</em>','A question, a partnership idea, or a programme for your team. We’d love to hear what you have in mind.') + `<section class="wrap content-section contact-grid"><div class="contact-details"><span class="eyebrow">WINDHOEK, NAMIBIA</span><h2>Let’s talk <em>wellness.</em></h2><a class="text-link" href="mailto:wellnessinvision@gmail.com">wellnessinvision@gmail.com ↗</a><div class="contact-person"><h3>Hileni Ngishishange, MPH, RN</h3><a href="tel:+264812910252">+264 81 291 0252 ↗</a></div><div class="contact-person"><h3>Dr Deidre Kwenani, DBH, MSW</h3><a href="tel:+264812072700">+264 81 207 2700 ↗</a></div><p class="business-address">HD InVision Wellness Consultancy cc<br>P.O. Box 27023, Windhoek<br>Namibia</p></div><div class="contact-form">${enquiryForm()}</div></section>`;
}
const pages = {'/':home,'/corporate':corporate,'/magazine':magazine,'/vault':vault,'/courses':courses,'/bloom':bloom,'/clinic':clinic,'/mycourses':myCourses,'/about':about,'/city':city,'/contact':contact};
const titles = {'/':'Body, mind & soul','/corporate':'Corporate wellness','/magazine':'The magazine','/vault':'The VA(u)LT','/courses':'Online courses','/bloom':'BLOOM: prenatal + postpartum wellness','/clinic':'Quick Care Clinic','/mycourses':'My learning','/about':'Our story','/city':'Wellness in the City','/contact':'Let’s connect'};
function enhancePhotography(route) {
  const art = {'/corporate':['workplace','WELLNESS THAT WORKS FOR YOUR PEOPLE.'],'/contact':['nourish','LET’S PUT SOMETHING GOOD INTO MOTION.']};
  if (!art[route]) return;
  const [src,caption] = art[route];
  const figure = document.createElement('figure'); figure.className = `page-photo-band wrap${route === '/corporate' ? ' full-photo' : ''}`;
  figure.innerHTML = `<div><img src="assets/${src}.png" alt="Illustrative wellness lifestyle image" loading="lazy"><figcaption>${caption}</figcaption></div>`;
  $('.page-title').after(figure);
}
const workplaceClip = 'https://resource2.heygen.ai/videos/b64517ee75f040ee96156c38af57d404/b64517ee75f040ee96156c38af57d404/01a1a962-8551-7ab2-83e3-0530ba593a68.mp4';
let activeScene = null;
function stopScene() {
  if (!activeScene) return;
  const scene = activeScene;
  activeScene = null;
  scene.observer?.disconnect();
  cancelAnimationFrame(scene.frame);
  if (scene.dispose) {
    scene.dispose();
    return;
  }
  scene.video.pause();
  scene.video.removeAttribute('src');
  scene.video.load();
}

function updateScenePlayback() {
  if (!activeScene) return;
  const scene = activeScene;
  if (scene.update) {
    scene.update();
    return;
  }
  if (document.hidden || !scene.visible || scene.userPaused) {
    scene.video.pause();
    return;
  }
  scene.play();
}

// The hero artwork has a fixed 1536 × 1024 composition. Each region moves independently.
function createHeroRenderer(canvas, image) {
  const gl = canvas.getContext('webgl', {alpha:false, antialias:false, preserveDrawingBuffer:true});
  if (!gl) return null;

  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader,source);
    gl.compileShader(shader);
    return gl.getShaderParameter(shader,gl.COMPILE_STATUS) ? shader : null;
  }

  const vertex = compile(gl.VERTEX_SHADER,`
    attribute vec2 position;
    varying vec2 uv;
    void main() {
      uv = position * vec2(.5, -.5) + .5;
      gl_Position = vec4(position, 0., 1.);
    }
  `);
  const fragment = compile(gl.FRAGMENT_SHADER,`
    precision highp float;
    uniform sampler2D photo;
    uniform float phase;
    varying vec2 uv;

    float influence(vec2 p, vec2 centre, vec2 radii) {
      return 1. - smoothstep(.38, 1., length((p - centre) / radii));
    }

    void main() {
      vec2 size = vec2(1536., 1024.);
      vec2 p = uv * size;

      // A small nod from the woman holding the water bottle.
      float nod = sin(phase);
      float left = influence(p, vec2(417., 161.), vec2(172., 200.));
      vec2 offset = left * vec2(4., 12.) * nod;

      // The woman in the centre shifts her shoulders as she laughs.
      float shift = sin(phase + 2.1);
      float middle = influence(p, vec2(815., 318.), vec2(198., 205.));
      offset += middle * vec2(11., -11.) * shift;

      // The woman holding the towel tilts her head about the neck.
      float tilt = .085 * sin(phase + 3.8);
      float right = influence(p, vec2(1263., 245.), vec2(188., 170.));
      vec2 neck = p - vec2(1284., 355.);
      offset += right * tilt * vec2(-neck.y, neck.x);

      gl_FragColor = texture2D(photo, (p - offset) / size);
    }
  `);

  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;
  gl.attachShader(program,vertex);
  gl.attachShader(program,fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program,gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1, 1,-1, -1,1, 1,1]),gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program,'position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D,texture);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);
  if (gl.getError() !== gl.NO_ERROR) return null;

  gl.viewport(0,0,canvas.width,canvas.height);
  const phase = gl.getUniformLocation(program,'phase');
  return {
    draw(elapsed) {
      gl.uniform1f(phase,(elapsed % 5400) * Math.PI * 2 / 5400);
      gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    },
    dispose() {
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    }
  };
}

function enhanceHomeMotion() {
  const image = $('#hero-scene');
  if (!image) return;

  const host = image.parentElement;
  const control = document.createElement('button');
  const canvas = document.createElement('canvas');
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const scene = {
    visible: !('IntersectionObserver' in window),
    userPaused: media.matches || navigator.connection?.saveData === true,
    frame: 0
  };
  let renderer, elapsed = 0, lastFrame = null, unavailable = false;
  canvas.width = 960;
  canvas.height = 640;
  canvas.className = 'scene-motion';
  canvas.setAttribute('aria-hidden','true');
  control.type = 'button';
  control.className = 'scene-toggle';
  host.classList.add('motion-scene');
  canvas.style.objectPosition = getComputedStyle(image).objectPosition;
  image.after(canvas);
  host.appendChild(control);

  function showStill() {
    unavailable = true;
    cancelAnimationFrame(scene.frame);
    host.classList.remove('scene-loaded');
    control.hidden = true;
  }

  function draw(now) {
    if (lastFrame !== null) elapsed += now - lastFrame;
    lastFrame = now;
    renderer.draw(elapsed);
    scene.frame = requestAnimationFrame(draw);
  }

  scene.update = () => {
    if (activeScene !== scene || unavailable) return;
    const playing = scene.visible && !document.hidden && !scene.userPaused;
    control.textContent = scene.userPaused ? 'Play animation' : 'Pause animation';
    if (!playing) {
      cancelAnimationFrame(scene.frame);
      scene.frame = 0;
      lastFrame = null;
      if (media.matches) host.classList.remove('scene-loaded');
      return;
    }
    if (!image.naturalWidth || scene.frame) return;
    try {
      renderer ??= createHeroRenderer(canvas,image);
    } catch {
      showStill();
      return;
    }
    if (!renderer) {
      showStill();
      return;
    }
    renderer.draw(elapsed);
    host.classList.add('scene-loaded');
    scene.frame = requestAnimationFrame(draw);
  };

  const onPreferenceChange = () => {
    scene.userPaused = media.matches || navigator.connection?.saveData === true;
    scene.update();
  };
  scene.dispose = () => {
    media.removeEventListener('change',onPreferenceChange);
    renderer?.dispose();
  };
  activeScene = scene;
  canvas.addEventListener('webglcontextlost',showStill);
  image.addEventListener('load',scene.update,{once:true});
  image.addEventListener('error',showStill,{once:true});
  media.addEventListener('change',onPreferenceChange);
  control.addEventListener('click',() => {
    scene.userPaused = !scene.userPaused;
    scene.update();
  });
  if ('IntersectionObserver' in window) {
    scene.observer = new IntersectionObserver(([entry]) => {
      scene.visible = entry.isIntersecting;
      scene.update();
    },{threshold:.1});
    scene.observer.observe(host);
  }
  scene.update();
}
function enhanceMotion(route) {
  if (route === '/') { enhanceHomeMotion(); return; }
  const image = route === '/corporate' ? $('.page-photo-band img') : null;
  if (!image) return;
  const source = workplaceClip;
  const host = image.parentElement, video = document.createElement('video'), control = document.createElement('button');
  video.className = 'scene-motion'; video.muted = true; video.defaultMuted = true; video.loop = true; video.playsInline = true; video.preload = 'metadata'; video.poster = image.src; video.setAttribute('muted',''); video.setAttribute('playsinline',''); video.setAttribute('aria-hidden','true'); video.setAttribute('disablepictureinpicture','');
  control.type = 'button'; control.className = 'scene-toggle'; control.textContent = 'Play animation';
  image.after(video); host.appendChild(control); host.classList.add('motion-scene');
  const scene = {video,control,host,visible:false,userPaused:matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData === true,frame:0,observer:null,play:null};
  activeScene = scene;
  const updateControl = () => { control.textContent = video.paused ? 'Play animation' : 'Pause animation'; control.setAttribute('aria-label',control.textContent); };
  scene.play = async () => { if (activeScene !== scene) return; if (!video.getAttribute('src')) video.src = source; try { await video.play(); if (activeScene !== scene || document.hidden || !scene.visible || scene.userPaused) video.pause(); } catch { updateControl(); } };
  const keepFiveSecondLoop = () => { if (activeScene !== scene || video.paused) return; if (video.currentTime >= 5) video.currentTime = 0; scene.frame = requestAnimationFrame(keepFiveSecondLoop); };
  video.addEventListener('playing',() => { host.classList.add('scene-loaded'); updateControl(); cancelAnimationFrame(scene.frame); scene.frame = requestAnimationFrame(keepFiveSecondLoop); });
  video.addEventListener('pause',() => { cancelAnimationFrame(scene.frame); updateControl(); });
  video.addEventListener('error',() => { host.classList.remove('scene-loaded'); cancelAnimationFrame(scene.frame); control.textContent = 'Retry animation'; control.setAttribute('aria-label','Retry animation'); });
  control.addEventListener('click',() => { if (video.paused) { scene.userPaused = false; scene.visible = true; if (video.error) { video.removeAttribute('src'); video.load(); } scene.play(); } else { scene.userPaused = true; video.pause(); } });
  if ('IntersectionObserver' in window) { scene.observer = new IntersectionObserver(entries => { if (activeScene !== scene) return; scene.visible = entries[0].isIntersecting; updateScenePlayback(); },{threshold:.1}); scene.observer.observe(host); }
  else { scene.visible = true; updateScenePlayback(); }
}
function render() {
  stopScene();
  stopBreath(false);
  const route = location.hash.replace(/^#/,'') || '/';
  $('#main').innerHTML = pages[route] ? pages[route]() : heading('Page not found','Let’s find your way <em>back.</em>') + `<section class="wrap content-section">${button('Back to our world','#/')}</section>`;
  enhancePhotography(route); enhanceMotion(route); document.title = `${titles[route] || 'Page not found'} | InVision Wellness`;
  document.querySelectorAll('nav a').forEach(a => a.getAttribute('href') === '#' + route ? a.setAttribute('aria-current','page') : a.removeAttribute('aria-current'));
  $('nav').classList.remove('open'); $('.menu-toggle').setAttribute('aria-expanded','false'); $('.menu-toggle').setAttribute('aria-label','Open menu'); $('.nav-drop').open = false;
  if ($('#modal').open) $('#modal').close(); $('#modal').classList.remove('issue-dialog');
  window.scrollTo(0,0);
}
function escapeHtml(s) { return String(s).replace(/[&<>"']/g,c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function showModal(content, issue = false) { $('#modal').classList.toggle('issue-dialog',issue); $('#modal-content').innerHTML = content; const title = $('#modal-content h2'); if (title) { title.id = 'dialog-title'; $('#modal').setAttribute('aria-labelledby',title.id); } else $('#modal').removeAttribute('aria-labelledby'); if (!$('#modal').open) $('#modal').showModal(); $('#modal').scrollTop = 0; }
function toast(msg) { $('.toast').textContent = msg; $('.toast').classList.add('show'); clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => $('.toast').classList.remove('show'),2600); }
function openIssue(id) {
  const m = magazines.find(x => x.id === id); if (!m) return;
  showModal(`<span class="eyebrow">ARCHIVE · ISSUE ${m.id} · ${m.date}</span><div class="issue-reader"><aside class="issue-cover"><img src="${m.cover}" alt="${m.alt}"><div class="modal-tags">${m.tags.map(x => `<span class="pill">${x}</span>`).join('')}</div>${inquiry('Magazine — distribution','Ask about this issue')}</aside><div class="issue-article"><h2>${m.articleTitle}</h2><p class="archive-context">Original article pages from the ${m.date} issue. Cover and article previews only.</p><div class="reader-toolbar"><label for="article-zoom">Article zoom</label><select id="article-zoom"><option value="100">100%</option><option value="150">150%</option><option value="200">200%</option><option value="300">300%</option></select><span>Scroll to read each page.</span></div><div class="article-scroll" tabindex="0" aria-label="Original magazine article pages"><div class="article-sheets" id="article-sheets">${m.pages.map((p,i) => `<figure><img src="assets/articles/${p}" alt="${m.pageTitles[i]}, original magazine page" loading="eager"><figcaption>${m.pageTitles[i]} · <a href="assets/articles/${p}" target="_blank" rel="noopener">Open original page ↗</a></figcaption></figure>`).join('')}</div></div></div></div>`,true);
}
function updateMusicControl() {
  const control = $('.music-toggle');
  if (!control) return;
  const playing = sound?.playing === true;
  control.setAttribute('aria-pressed',String(playing));
  control.innerHTML = `<span aria-hidden="true">♫</span> ${playing ? 'Pause gentle music' : sound ? 'Starting music…' : 'Play gentle music'}`;
}

function makeAmbientLoop(context) {
  const chords = [[48,55,60,64,67],[45,52,57,60,64],[41,48,53,57,64],[43,50,55,59,62]];
  const rate = 22050;
  const step = 4 * rate;
  const buffer = context.createBuffer(1,step * chords.length,rate);
  const samples = buffer.getChannelData(0);

  // Let each chord ring into the next, including across the loop boundary.
  chords.forEach((notes,index) => {
    notes.forEach((note, voice) => {
      const frequency = 440 * 2 ** ((note - 69) / 12);
      const pitch = 2 * Math.PI * frequency / rate;
      const delay = Math.round(voice * .13 * rate);
      const length = 5 * rate;
      for (let i = 0; i < length; i++) {
        const envelope = Math.sin(Math.PI * i / length) ** 2;
        const sample = (index * step + delay + i) % samples.length;
        samples[sample] += envelope * (.026 * Math.sin(pitch * i) + .004 * Math.sin(2 * pitch * i));
      }
    });
  });
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.connect(context.destination);
  return source;
}

function startMusic() {
  const audio = $('#gentle-audio');
  if (sound || !audio) return;
  const request = {audio, events:new AbortController(), timer:null, context:null, source:null, playing:false, fallback:false};
  sound = request;
  updateMusicControl();

  function markPlaying() {
    if (sound !== request) return;
    clearTimeout(request.timer);
    request.timer = null;
    request.playing = true;
    updateMusicControl();
    $('#breath-status').textContent = breathTimer ? 'Gentle music is playing with your breathing break.' : 'Gentle music is playing. Start your minute whenever you’re ready.';
  }

  function fail() {
    if (sound !== request) return;
    stopMusic();
    $('#breath-status').textContent = 'Music could not start. Tap Play gentle music to try again.';
  }

  async function playFallback() {
    if (sound !== request || request.fallback) return;
    clearTimeout(request.timer);
    request.fallback = true;
    request.playing = false;
    request.events.abort();
    audio.pause();
    updateMusicControl();

    if (!request.context) {
      fail();
      return;
    }
    request.timer = setTimeout(fail,2500);
    try {
      await request.ready;
      if (sound !== request) return;
      if (request.context.state !== 'running') {
        fail();
        return;
      }
      request.source = makeAmbientLoop(request.context);
      request.source.start();
      markPlaying();
    } catch {
      fail();
    }
  }

  // Unlock the fallback during the visitor’s click so it can play if the file stalls.
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      request.context = new AudioContext();
      request.ready = request.context.resume().catch(() => {});
    }
  } catch {
    // The original soundtrack can still play through the audio element.
  }

  const events = {signal:request.events.signal};
  const watchForStall = () => {
    if (request.timer === null) request.timer = setTimeout(playFallback,4000);
  };
  audio.addEventListener('playing',markPlaying,events);
  audio.addEventListener('waiting',watchForStall,events);
  audio.addEventListener('stalled',watchForStall,events);
  audio.addEventListener('error',playFallback,events);
  audio.volume = .65;
  if (audio.error) audio.load();
  watchForStall();
  audio.play().catch(playFallback);
}

function stopMusic() {
  const previous = sound;
  sound = null;
  if (previous) {
    clearTimeout(previous.timer);
    previous.events.abort();
    previous.audio.pause();
    previous.audio.currentTime = 0;
    previous.source?.stop();
    previous.context?.close().catch(() => {});
  }
  updateMusicControl();
}
function startBreath() {
  if (breathTimer) { stopBreath(); return; }
  breathStart = Date.now(); $('#breath-button').innerHTML = 'Finish my pause <span aria-hidden="true">×</span>'; $('#breath-status').textContent = 'Follow along, or choose your own comfortable rhythm.';
  let lastPhase = -1;
  const update = () => { const elapsed = (Date.now() - breathStart) / 1000; if (elapsed >= 60) { stopBreath(false); $('#breath-label').textContent = 'Lovely.'; $('#breath-count').textContent = 'ONE MINUTE, JUST FOR YOU'; $('#breath-status').textContent = 'Take that little moment of space into your day.'; return; } const phase = Math.floor(elapsed / 5) % 2; if (phase !== lastPhase) { lastPhase = phase; $('#breath-circle').classList.toggle('expand',phase === 0); $('#breath-label').textContent = phase === 0 ? 'Breathe in.' : 'Breathe out.'; } $('#breath-count').textContent = `${60 - Math.floor(elapsed)} SECONDS OF SPACE`; };
  update(); breathTimer = setInterval(update,200);
}
function stopBreath(update = true) { if (breathTimer) clearInterval(breathTimer); breathTimer = null; stopMusic(); $('#breath-circle')?.classList.remove('expand'); if ($('#breath-button')) $('#breath-button').innerHTML = 'Start my minute <span aria-hidden="true">↗</span>'; if (update && $('#breath-label')) { $('#breath-label').textContent = 'Just be.'; $('#breath-count').textContent = 'YOUR ONE-MINUTE RESET'; $('#breath-status').textContent = 'Whenever you’re ready, start again.'; } }

document.addEventListener('click',e => {
  const target = e.target.closest('button,[data-action]');
  if (target?.matches('.menu-toggle')) { const open = $('nav').classList.toggle('open'); target.setAttribute('aria-expanded',String(open)); target.setAttribute('aria-label',open ? 'Close menu' : 'Open menu'); }
  if (target?.matches('.modal-close')) $('#modal').close();
  if (target?.dataset.inquiry) showModal(`<span class="eyebrow">LET’S MAKE A CONNECTION</span><h2>${target.dataset.inquiry.startsWith('BLOOM') ? 'Let’s grow together.' : target.dataset.inquiry.includes('attend the free event') ? 'Join the community.' : 'Tell us a little more.'}</h2>${enquiryForm(target.dataset.inquiry,true)}`);
  if (target?.dataset.mag) openIssue(target.dataset.mag);
  if (target?.dataset.save) { const id = target.dataset.save; saved = saved.includes(id) ? saved.filter(x => x !== id) : [...saved,id]; try { localStorage.setItem('invision-saved',JSON.stringify(saved)); } catch { /* The current visit still supports saving. */ } target.classList.toggle('saved',saved.includes(id)); target.setAttribute('aria-pressed',String(saved.includes(id))); target.setAttribute('aria-label',`${saved.includes(id) ? 'Unsave' : 'Save'} issue ${id}`); target.textContent = saved.includes(id) ? '♥' : '♡'; toast(saved.includes(id) ? 'Saved to your issue collection.' : 'Removed from your saved issues.'); if (magFilter === 'Saved' && $('#magazine-results')) $('#magazine-results').innerHTML = filteredMagazines(); }
  if (target?.dataset.filter) { magFilter = target.dataset.filter; document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('active',b.dataset.filter === magFilter); b.setAttribute('aria-pressed',String(b.dataset.filter === magFilter)); }); $('#magazine-results').innerHTML = filteredMagazines(); }
  if (target?.dataset.dimension !== undefined) { const index = Number(target.dataset.dimension); document.querySelectorAll('[data-dimension]').forEach(b => { b.classList.toggle('active',b === target); b.setAttribute('aria-pressed',String(b === target)); }); $('#dimension-detail').innerHTML = `<strong>${dimensions[index][0]} wellness.</strong> ${dimensions[index][1]}`; }
  if (target?.dataset.action === 'pause') { $('.pause-section').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',block:'center'}); $('#breath-button').focus({preventScroll:true}); }
  if (target?.dataset.action === 'breathe') startBreath();
  if (target?.dataset.action === 'music') {
    if (sound) {
      stopMusic();
      $('#breath-status').textContent = breathTimer ? 'Your breathing break continues without music.' : 'Music paused. Start again whenever you’re ready.';
    } else {
      startMusic();
    }
  }
  if (target?.dataset.action === 'ticker') { const paused = $('.testimonial-ticker').classList.toggle('paused'); target.setAttribute('aria-pressed',String(paused)); target.innerHTML = paused ? 'Play testimonials <span aria-hidden="true">▶</span>' : 'Pause testimonials <span aria-hidden="true">Ⅱ</span>'; }
  if (target?.dataset.action === 'portal') showModal(`<span class="eyebrow">QUICK CARE CLINIC</span><h2>Patient portal<br>is being prepared.</h2><p>Secure sign-in, intake forms and test-result access are not active yet.</p><p>Please do not send test results or medical records through the website’s general enquiry form.</p>${button('Contact the team','#/contact')}`);
  if (target?.dataset.action === 'privacy') showModal('<span class="eyebrow">YOUR DETAILS, WITH CARE</span><h2>Privacy & enquiries.</h2><p>The enquiry form prepares an email on your device. Nothing is sent until you review and send it through your email app. This site does not store enquiry form responses.</p><p>Saved magazine issues are stored only in this browser. Use the heart buttons to remove them, or clear your browser’s site data.</p><p>We do not collect patient information or display medical records on this website. For questions about your details, contact wellnessinvision@gmail.com.</p><p>Typography may be loaded from Google Fonts. If it is unavailable, your device’s fonts are used.</p>');
  if (target?.dataset.action === 'image-credit') showModal('<span class="eyebrow">THE PICTURES</span><h2>A little creative perspective.</h2><p>The InVision and BLOOM logos, founders’ portraits, VA(u)LT artwork, magazine covers and article pages were supplied for this website. The VA(u)LT U includes a new phone detail.</p><p>The movement, workplace, pregnancy, clinic and food scenes were created with AI for this website. They are illustrative lifestyle imagery, rather than photographs of InVision staff, clients or events.</p>');
  if (!e.target.closest('.nav-drop')) $('.nav-drop').open = false;
});
$('#modal').addEventListener('click',e => { if (e.target !== $('#modal')) return; const r = $('#modal').getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) $('#modal').close(); });
document.addEventListener('input',e => { if (e.target.id === 'mag-search') { magSearch = e.target.value; $('#magazine-results').innerHTML = filteredMagazines(); } });
document.addEventListener('change',e => { if (e.target.id === 'article-zoom') $('#article-sheets').style.width = e.target.value + '%'; });
document.addEventListener('submit',e => {
  if (e.target.id === 'planner-form') { e.preventDefault(); const goal = $('#team-goal').value, size = $('#team-size').value; const plans = {balance:['Make space for balance',['A facilitated stress-awareness conversation','A practical break or gentle group movement session','Follow-up learning through magazine content or The VA(u)LT']],movement:['Bring the team together',['A group fitness or team-building session','A discussion about ergonomics and everyday movement','A simple follow-up activity plan for your workplace']],awareness:['Start with awareness',['A conversation about your team’s health priorities','Discuss appropriate workplace screening with our professionals','A health education session and next-step guidance']]}; const p = plans[goal]; $('#planner-result').innerHTML = `<span class="eyebrow">A STARTING POINT · ${size.toUpperCase()}</span><h4>${p[0]}</h4><ul>${p[1].map(x => `<li>${x}</li>`).join('')}</ul><p>We’ll confirm the scope, availability and cost with you.</p>${inquiry('Corporate wellness','Discuss this idea')}`; $('#planner-result').classList.remove('hidden'); }
  if (!e.target.matches('.enquiry-form')) return;
  e.preventDefault(); const form = e.target, data = new FormData(form); const subject = `Website enquiry: ${data.get('interest')}`; const body = `Hello InVision Wellness,\n\n${data.get('message')}\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nOrganisation: ${data.get('organisation') || 'Not supplied'}\nInterest: ${data.get('interest')}\n\nI consent to being contacted about this enquiry.`;
  const url = `mailto:wellnessinvision@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; const status = form.querySelector('.form-status'); status.innerHTML = '<strong>Your email draft is ready.</strong><p>Open it in your email app, review your message, then send.</p>';
  const link = document.createElement('a'); link.className = 'button purple'; link.href = url; link.textContent = 'Open my email draft ↗'; status.appendChild(link);
  const copy = document.createElement('button'); copy.type = 'button'; copy.className = 'text-link copy-enquiry'; copy.textContent = 'Copy enquiry'; copy.onclick = async () => { const text = `To: wellnessinvision@gmail.com\nSubject: ${subject}\n\n${body}`; try { await navigator.clipboard.writeText(text); toast('Enquiry copied. Paste it into your email app.'); } catch { const fallback = document.createElement('textarea'); fallback.value = text; fallback.readOnly = true; fallback.setAttribute('aria-label','Prepared enquiry text'); status.appendChild(fallback); fallback.select(); toast('Select and copy your enquiry below.'); } }; status.appendChild(copy); link.focus();
});
document.addEventListener('visibilitychange',() => { if (document.hidden) { if (breathTimer) stopBreath(); else stopMusic(); } updateScenePlayback(); });
$('.skip').addEventListener('click',e => { e.preventDefault(); $('#main').focus(); $('#main').scrollIntoView(); });
window.addEventListener('hashchange',render); $('#year').textContent = new Date().getFullYear(); render();
