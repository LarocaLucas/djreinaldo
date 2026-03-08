// Cursor
const cursor = document.getElementById('cursor');
if (window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
} else {
  cursor.style.display = 'none';
}

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
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// Mobile menu
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '100%';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = 'rgba(8,8,8,0.98)';
  navLinks.style.padding = '1.5rem';
  navLinks.style.borderBottom = '1px solid rgba(201,168,76,0.15)';
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => { navLinks.style.display = 'none'; });
});
