/**
 * MODE / ATLAS — Main Application Logic
 * Navigation, Mobile Menu, Form Handlers, Micro-Animations & Core UI State
 */

(function () {
  'use strict';

  // 1. Mobile Menu Drawer Toggle
  function initMobileMenu() {
    const toggleBtn = document.getElementById('mobileNavToggle');
    const drawer = document.getElementById('mobileNavDrawer');
    const backdrop = document.getElementById('mobileNavBackdrop');
    const closeBtn = document.getElementById('mobileNavClose');

    if (!toggleBtn || !drawer) return;

    function openMobileNav() {
      toggleBtn.classList.add('is-active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      drawer.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
      toggleBtn.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('is-open');
      if (isOpen) closeMobileNav();
      else openMobileNav();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeMobileNav);
    if (backdrop) backdrop.addEventListener('click', closeMobileNav);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeMobileNav();
      }
    });

    // Mobile Dropdown Accordion Toggle
    const mobileDropdownToggles = document.querySelectorAll('[data-action="toggle-mobile-dropdown"]');
    mobileDropdownToggles.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const content = btn.nextElementSibling;
        if (content && content.classList.contains('mobile-dropdown-accordion-content')) {
          content.classList.toggle('is-open');
          const icon = btn.querySelector('.dropdown-chevron');
          if (icon) {
            icon.style.transform = content.classList.contains('is-open') ? 'rotate(180deg)' : 'rotate(0deg)';
          }
        }
      });
    });
  }

  // 2. Header Scroll Effect
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
      } else {
        header.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  // 3. Form Handling (Contact, Auth, Newsletter)
  function initForms() {
    // Newsletter form
    const newsletterForms = document.querySelectorAll('[data-form="newsletter"]');
    newsletterForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
          if (window.ModeAtlasBookmarks) {
            window.ModeAtlasBookmarks.showToast('Subscribed to MODE / ATLAS Global Fashion Dispatches');
          }
          emailInput.value = '';
        }
      });
    });

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        if (btn) {
          btn.innerHTML = 'Sending Message...';
          btn.disabled = true;
          setTimeout(() => {
            btn.innerHTML = '✓ Message Dispatched';
            if (window.ModeAtlasBookmarks) {
              window.ModeAtlasBookmarks.showToast('Your message has reached our editorial & creator desk.');
            }
            contactForm.reset();
            setTimeout(() => {
              btn.innerHTML = 'Send Message';
              btn.disabled = false;
            }, 3000);
          }, 800);
        }
      });
    }

    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = loginForm.querySelector('button[type="submit"]');
        if (btn) {
          btn.innerHTML = 'Signing In...';
          btn.disabled = true;
          setTimeout(() => {
            if (window.ModeAtlasBookmarks) {
              window.ModeAtlasBookmarks.showToast('Welcome back to MODE / ATLAS.');
            }
            window.location.href = 'discover.html';
          }, 700);
        }
      });
    }

    // Signup Form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = signupForm.querySelector('button[type="submit"]');
        if (btn) {
          btn.innerHTML = 'Creating Discovery Profile...';
          btn.disabled = true;
          setTimeout(() => {
            if (window.ModeAtlasBookmarks) {
              window.ModeAtlasBookmarks.showToast('Account created. Start exploring fashion!');
            }
            window.location.href = 'discover.html';
          }, 700);
        }
      });
    }

    // Forgot Password Form
    const forgotForm = document.getElementById('forgotPasswordForm');
    if (forgotForm) {
      forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = forgotForm.querySelector('button[type="submit"]');
        const feedback = document.getElementById('forgotPasswordFeedback');
        if (btn) {
          btn.innerHTML = 'Sending Link...';
          btn.disabled = true;
          setTimeout(() => {
            btn.innerHTML = '✓ Link Dispatched';
            if (feedback) feedback.style.display = 'block';
            if (window.ModeAtlasBookmarks) {
              window.ModeAtlasBookmarks.showToast('Password recovery instructions sent to your email');
            }
          }, 800);
        }
      });
    }
  }

  // 4. Subtle Scroll Reveal Observer
  function initScrollReveals() {
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      document.querySelectorAll('.apparel-card, .story-card, .curator-card, .featured-hero-card, .article-layout')
        .forEach(el => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(16px)';
          el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
          observer.observe(el);
        });
    }
  }

  // 5. Back to Top Floating Button Handler
  function initBackToTop() {
    let btn = document.getElementById('backToTopBtn');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'backToTopBtn';
      btn.className = 'back-to-top-btn';
      btn.setAttribute('aria-label', 'Back to top');
      btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>`;
      document.body.appendChild(btn);
    }

    function handleScroll() {
      if (window.scrollY > 300) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 6. Password Visibility Toggle (Eye Icon)
  function initPasswordToggles() {
    const toggleBtns = document.querySelectorAll('.password-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const wrapper = btn.closest('.password-field-wrap') || btn.parentElement;
        const input = wrapper ? wrapper.querySelector('input') : null;
        if (!input) return;

        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        btn.innerHTML = isPassword ?
          `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>` :
          `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initHeaderScroll();
    initForms();
    initScrollReveals();
    initBackToTop();
    initPasswordToggles();
  });
})();

