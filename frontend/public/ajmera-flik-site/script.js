/* =============================================
   FLIK × FLIK — script.js
   Interactions, animations, and utility logic
   ============================================= */

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});
mobileClose.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
});
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== HERO LOAD ANIMATION =====
window.addEventListener('load', () => {
  document.querySelector('.hero').classList.add('loaded');
});

// ===== REVEAL ON SCROLL =====
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// ===== GALLERY TABS =====
const tabs = document.querySelectorAll('.gallery-tab');
const panels = document.querySelectorAll('.gallery-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetTab = tab.getAttribute('data-tab');
    
    // Update tabs
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    // Update panels with fade
    panels.forEach(panel => {
      if (panel.id === `panel-${targetTab}`) {
        panel.style.opacity = '0';
        panel.classList.add('active');
        setTimeout(() => {
          panel.style.transition = 'opacity 0.4s ease';
          panel.style.opacity = '1';
        }, 10);
      } else {
        panel.classList.remove('active');
        panel.style.opacity = '';
        panel.style.transition = '';
      }
    });
  });
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * eased);
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const proofStats = document.querySelectorAll('.proof-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

proofStats.forEach(stat => counterObserver.observe(stat));

// ===== FORM SUBMIT =====
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('form-submit-btn');
  const success = document.getElementById('form-success');
  
  // Simulate loading
  btn.style.opacity = '0.7';
  btn.querySelector('span').textContent = 'Sending...';
  
  setTimeout(() => {
    btn.style.opacity = '1';
    btn.querySelector('span').textContent = 'Request Walk-Through';
    success.classList.add('show');
    document.getElementById('contact-form').reset();
    
    // Hide after 6 seconds
    setTimeout(() => {
      success.classList.remove('show');
    }, 6000);
  }, 1500);
}

// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active-link');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

// ===== PARALLAX ON HERO =====
const heroBg = document.querySelector('.hero-bg-img');
window.addEventListener('scroll', () => {
  if (window.scrollY < window.innerHeight) {
    const parallax = window.scrollY * 0.3;
    if (heroBg) heroBg.style.transform = `scale(1) translateY(${parallax}px)`;
  }
}, { passive: true });

// ===== AMENITY CARD ENTRANCE STAGGER =====
const amenityCards = document.querySelectorAll('.amenity-card');
const amenityObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    amenityCards.forEach((card, i) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 70);
    });
    amenityObserver.disconnect();
  }
}, { threshold: 0.1 });

amenityCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

const amenitySection = document.getElementById('amenities');
if (amenitySection) amenityObserver.observe(amenitySection);

// ===== NAVBAR ACTIVE LINK STYLE =====
const style = document.createElement('style');
style.textContent = `
  .nav-links a.active-link {
    color: var(--gold) !important;
  }
`;
document.head.appendChild(style);
