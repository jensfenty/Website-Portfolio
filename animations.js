(function () {
  'use strict';

  // Selectors to animate upward (fade + slide up)
  var UP = [
    '.hero-subtitle',
    '.hero-title-wrapper',
    '.hero-cta',
    '.project-card',
    '.why-card',
    '.timeline-heading',
    '.timeline-item',
    '.skills-row',
    '.resume-row',
    '.section-separator',
    '.blog-page-title',
    '.blog-page-sub',
    '.blog-filters',
    '.blog-featured',
    '.blog-card',
    '.article-header',
    '.article-lead',
    '.article-body h2',
    '.article-footer',
    '.toc-sidebar',
    '.contact-heading',
    '.contact-subtext',
    '.contact-info-item',
    '.contact-social-icon',
    '.form-group',
    '.help-check',
    '.submit-btn',
    '.form-success',
    '.home-stage-kicker',
    '.home-stage-name',
    '.home-stage-roles',
    '.home-stage-intro'
  ];

  // Slide from left
  var LEFT = ['.about-hero-left', '.contact-left'];

  // Slide from right
  var RIGHT = ['.about-hero-right', '.contact-right'];

  function markElements(selectors, dir) {
    selectors.forEach(function (sel) {
      var els = Array.from(document.querySelectorAll(sel));
      if (!els.length) return;

      // Group by parent to stagger siblings
      var parentMap = new Map();
      els.forEach(function (el) {
        var p = el.parentElement || document.body;
        if (!parentMap.has(p)) parentMap.set(p, []);
        parentMap.get(p).push(el);
      });

      parentMap.forEach(function (group) {
        group.forEach(function (el, i) {
          el.classList.add('reveal', 'reveal-' + dir);
          el.style.transitionDelay = (i * 0.1) + 's';
        });
      });
    });
  }

  function observe() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  function initMobileNav() {
    var navContainer = document.querySelector('.nav-container');
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');

    if (!navContainer || !navToggle || !navLinks) return;

    function setOpen(isOpen) {
      navContainer.classList.toggle('nav-open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    navToggle.addEventListener('click', function () {
      setOpen(!navContainer.classList.contains('nav-open'));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        setOpen(false);
      }
    });
  }

  function init() {
    initMobileNav();
    markElements(UP, 'up');
    markElements(LEFT, 'left');
    markElements(RIGHT, 'right');
    observe();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
