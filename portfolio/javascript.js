
// Cursor glow
const glow=document.getElementById('cursorGlow');
if(window.matchMedia('(pointer:fine)').matches){
  document.addEventListener('mousemove',e=>{
    glow.style.left=e.clientX+'px';
    glow.style.top=e.clientY+'px';
  });
}else{glow.style.display='none'}

// Nav scroll
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>50);
});

// Mobile menu
function toggleMenu(){
  const h=document.getElementById('hamburger');
  const m=document.getElementById('mobileMenu');
  h.classList.toggle('open');
  m.classList.toggle('open');
}

// Intersection observer — reveals
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      if(e.target.classList.contains('exp-item')){
        // stagger
      }
      // Animate skill bars
      e.target.querySelectorAll('.skill-bar').forEach(bar=>{
        const w=bar.getAttribute('data-width');
        setTimeout(()=>{bar.style.width=w+'%'},200);
      });
    }
  });
},{threshold:.12});

document.querySelectorAll('.reveal,.exp-item').forEach(el=>observer.observe(el));

// Skill bars trigger when parent visible
const skillsSection=document.getElementById('skills');
const skillObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      document.querySelectorAll('.skill-bar').forEach(bar=>{
        const w=bar.getAttribute('data-width');
        setTimeout(()=>{bar.style.width=w+'%'},300);
      });
      skillObserver.disconnect();
    }
  });
},{threshold:.1});
skillObserver.observe(skillsSection);

// Contact form
function sendMessage(){
  const n=document.getElementById('cName').value.trim();
  const e=document.getElementById('cEmail').value.trim();
  const m=document.getElementById('cMessage').value.trim();
  if(!n||!e||!m){
    alert('Please fill in name, email, and message.');return;
  }
  const btn=document.querySelector('.send-btn');
  btn.disabled=true;
  document.getElementById('sendText').textContent='Sending...';
  setTimeout(()=>{
    btn.style.display='none';
    document.getElementById('successMsg').style.display='block';
    ['cName','cEmail','cSubject','cMessage'].forEach(id=>document.getElementById(id).value='');
  },1200);
}

// Smooth stagger for project cards
document.querySelectorAll('.project-card').forEach((card,i)=>{
  card.style.transitionDelay=(i*.08)+'s';
});