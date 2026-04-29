/* Alexander Vikov website — shared JS
   - Mobile nav toggle
   - Sticky nav scroll state
   - IntersectionObserver reveal animation
   - Booking form validation + fake submission UX
*/

(() => {
  'use strict';

  /* ----- Mobile nav toggle ----- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // Close on link click (mobile)
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----- Nav border on scroll ----- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ----- Reveal on scroll ----- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  /* ----- Booking form ----- */
  const form = document.querySelector('#booking-form');
  if (form) {
    const success = document.querySelector('#form-success');
    const required = ['fullName', 'email', 'goal', 'blocker', 'service'];

    const setError = (name, msg) => {
      const field = form.querySelector(`[data-field="${name}"]`);
      if (!field) return;
      field.classList.toggle('has-error', !!msg);
      const err = field.querySelector('.error-msg');
      if (err) err.textContent = msg || '';
    };

    const validate = () => {
      let ok = true;
      required.forEach(name => {
        const input = form.querySelector(`[name="${name}"]`);
        if (!input) return;
        const val = (input.value || '').trim();
        if (!val) { setError(name, 'This field is required.'); ok = false; }
        else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          setError(name, 'Please enter a valid email address.');
          ok = false;
        } else {
          setError(name, '');
        }
      });
      return ok;
    };

    // Clear errors on input
    form.querySelectorAll('input, textarea, select').forEach(el => {
      el.addEventListener('input', () => setError(el.name, ''));
      el.addEventListener('change', () => setError(el.name, ''));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) {
        const firstError = form.querySelector('.has-error input, .has-error textarea, .has-error select');
        if (firstError) firstError.focus();
        return;
      }
      // Simulate submit (no backend wired; replace with real endpoint or Formspree, etc.)
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Sending…';
      setTimeout(() => {
        form.style.display = 'none';
        if (success) {
          success.classList.add('is-visible');
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        btn.disabled = false;
        btn.textContent = original;
      }, 700);
    });
  }

  /* ----- Set active nav link by current page ----- */
  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const target = (a.getAttribute('href') || '').toLowerCase();
    if (target === here || (here === '' && target === 'index.html')) {
      a.classList.add('is-active');
    }
  });
})();
