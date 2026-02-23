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
    '.toc-sidebar'
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

  function init() {
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
