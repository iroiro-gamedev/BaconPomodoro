'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const siteNav   = document.getElementById('siteNav');
  if (!hamburger || !siteNav) return;

  function openNav() {
    siteNav.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    siteNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', e => {
    e.stopPropagation();
    siteNav.classList.contains('open') ? closeNav() : openNav();
  });

  // Close when clicking outside the nav/hamburger
  document.addEventListener('click', e => {
    if (!siteNav.contains(e.target) && !hamburger.contains(e.target)) {
      closeNav();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNav();
  });

  // Close when a nav link is clicked (page transition)
  siteNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
});
