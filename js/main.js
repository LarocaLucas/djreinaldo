// Nav scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// Mobile menu
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? 'none' : 'flex';
  if (!open) {
    Object.assign(navLinks.style, {
      flexDirection: 'column',
      position: 'absolute',
      top: '100%', left: '0', right: '0',
      background: 'rgba(28,28,30,0.98)',
      padding: '1.5rem 1.5rem 2rem',
      borderBottom: '1px solid rgba(200,169,110,0.12)'
    });
  }
});
document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => { navLinks.style.display = 'none'; });
});
