// scroll-reveal animation
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.15});
revealEls.forEach(el => revealObserver.observe(el));

// sales process funnel (only present on index.html, harmless elsewhere)
const stops = Array.from(document.querySelectorAll('.route-stop'));
const readoutMeta = document.getElementById('readoutMeta');
const readoutTitle = document.getElementById('readoutTitle');
const readoutDesc = document.getElementById('readoutDesc');

function selectStop(stop){
  stops.forEach(s => { s.classList.remove('active'); s.setAttribute('aria-pressed','false'); });
  stop.classList.add('active');
  stop.setAttribute('aria-pressed','true');
  if(readoutMeta){
    readoutMeta.textContent = 'STAGE ' + stop.dataset.stage + ' / ' + String(stops.length).padStart(2,'0');
    readoutTitle.textContent = stop.dataset.title;
    readoutDesc.textContent = stop.dataset.desc;
  }
}

stops.forEach(stop => {
  stop.addEventListener('click', () => selectStop(stop));
});

document.addEventListener('keydown', (e) => {
  const active = document.activeElement;
  if(!stops.includes(active)) return;
  const idx = stops.indexOf(active);
  if(e.key === 'ArrowRight' && stops[idx+1]){ stops[idx+1].focus(); selectStop(stops[idx+1]); }
  if(e.key === 'ArrowLeft' && stops[idx-1]){ stops[idx-1].focus(); selectStop(stops[idx-1]); }
});
