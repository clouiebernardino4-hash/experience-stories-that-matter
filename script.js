const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
$('#year').textContent = new Date().getFullYear();
const menuToggle = $('#menuToggle'), nav = $('#mainNav');
menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.textContent = open ? '×' : '☰'; });
$$('.nav-link').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); menuToggle.textContent='☰'; }));
const toast = msg => { const t=$('#toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>t.classList.remove('show'),2600); };
const likeBtn=$('#likeBtn'), bookmarkBtn=$('#bookmarkBtn');
function restoreToggle(btn,key,label,onText,offText,iconOn,iconOff){let on=localStorage.getItem(key)==='true';const render=()=>{btn.setAttribute('aria-pressed',String(on));btn.innerHTML=`${on?iconOn:iconOff} <span>${on?onText:offText}</span>`};render();btn.addEventListener('click',()=>{on=!on;localStorage.setItem(key,String(on));render();toast(on?`${label} saved in this browser.`:`${label} removed.`)});}
restoreToggle(likeBtn,'experience-story-liked','Like','Liked','Like this story','♥','♡');
restoreToggle(bookmarkBtn,'experience-story-bookmarked','Bookmark','Bookmarked','Bookmark','★','☆');
$('#shareBtn').addEventListener('click',async()=>{const shareData={title:'Our Learning Experience at Skill Power Institute',text:'Discover our NC II housekeeping and hospitality learning experience.',url:location.href};try{if(navigator.share)await navigator.share(shareData);else if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(location.href);toast('Story link copied.');}else toast('Use your browser menu to share this story.')}catch(e){if(e.name!=='AbortError')toast('Sharing is not available on this browser.')}});
const cards=$$('.activity-card'), search=$('#activitySearch'), filters=$$('.filter-btn');let activeFilter='all';
function applyFilters(){const q=search.value.trim().toLowerCase();let visible=0;cards.forEach(card=>{const matchesText=(card.dataset.search+' '+card.innerText).toLowerCase().includes(q);const matchesFilter=activeFilter==='all'||card.dataset.category===activeFilter;const show=matchesText&&matchesFilter;card.hidden=!show;if(show)visible++;});$('#noResults').hidden=visible>0;}
search.addEventListener('input',applyFilters);filters.forEach(btn=>btn.addEventListener('click',()=>{activeFilter=btn.dataset.filter;filters.forEach(b=>b.classList.toggle('selected',b===btn));applyFilters();}));
$$('.activity-card .text-link').forEach(a=>a.addEventListener('click',()=>{const target=document.querySelector(a.getAttribute('href'));if(target){target.classList.remove('section-highlight');void target.offsetWidth;target.classList.add('section-highlight');setTimeout(()=>target.classList.remove('section-highlight'),1200);}}));
const progress=$('#readingProgress'), backTop=$('#backTop');
function updateScroll(){const article=$('#article'),rect=article.getBoundingClientRect(),height=article.offsetHeight,view=window.innerHeight;const total=height-view;const passed=Math.max(0,Math.min(total,-rect.top));progress.style.width=(total>0?passed/total*100:0)+'%';backTop.classList.toggle('visible',window.scrollY>550);}
window.addEventListener('scroll',updateScroll,{passive:true});window.addEventListener('resize',updateScroll);updateScroll();
backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
const sections=$$('.article-section, .conclusion');const navLinks=$$('.toc a');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.style.color=a.hash==='#'+entry.target.id?'#314d3b':'');}}),{rootMargin:'-15% 0px -70% 0px'});sections.forEach(s=>observer.observe(s));
