/**
 * ANIMATIONS MODULE - P2613 Project Web
 * GSAP ScrollTrigger animations for scroll-based reveals
 */

(function() {
  'use strict';

  // Reusable timeline animation — called from app.js after renderConclusions()
  function initTimelineAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length === 0) return;

    timelineItems.forEach((item, index) => {
      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      // Animate the number badge
      const badge = item.querySelector('.timeline-badge');
      if (badge) {
        gsap.from(badge, {
          scale: 0,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }
    });
  }

  // Expose to app.js
  window.initTimelineAnimations = initTimelineAnimations;

  // Wait for GSAP to be available
  function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(initAnimations, 100);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // ============ HERO ANIMATIONS ============
    const heroItems = document.querySelectorAll('.gsap-hero-item');
    gsap.to(heroItems, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.2
    });

    // ============ SECTION HEADERS ============
    const sections = document.querySelectorAll('.gsap-section');
    sections.forEach(section => {
      gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // ============ CARDS STAGGER ============
    const cardContainers = [
      '#resumen .gsap-card',
      '#equipos .equipment-card',
      '#analisis .gsap-card'
    ];

    cardContainers.forEach(selector => {
      const cards = document.querySelectorAll(selector);
      if (cards.length === 0) return;

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cards[0].parentElement,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });

    // ============ TIMELINE ITEMS ============
    // Called again from app.js after renderConclusions() injects DOM
    initTimelineAnimations();

    // ============ COUNTER ANIMATIONS ============
    function animateCounter(element, target, suffix = '', duration = 2) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: duration,
        ease: 'power2.out',
        onUpdate: () => {
          if (Number.isInteger(target)) {
            element.textContent = Math.round(obj.val) + suffix;
          } else {
            element.textContent = obj.val.toFixed(2) + suffix;
          }
        }
      });
    }

    // Trigger counters when stats section is visible
    const statsSection = document.querySelector('#escenarios .flex.justify-center');
    if (statsSection) {
      ScrollTrigger.create({
        trigger: statsSection,
        start: 'top 85%',
        onEnter: () => {
          animateCounter(document.getElementById('stat-total'), 17, '');
          animateCounter(document.getElementById('stat-cumple'), 2, '');
          animateCounter(document.getElementById('stat-cumples'), 3, '');
          animateCounter(document.getElementById('stat-nocumple'), 11, '');
          animateCounter(document.getElementById('stat-propuesta'), 1, '');
        },
        once: true
      });
    }

    // ============ PARALLAX EFFECTS ============
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      gsap.to(heroSection.querySelector('.absolute.inset-0'), {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // ============ NAVBAR ACTIVE STATE ============
    const navSections = ['hero', 'resumen', 'escenarios', 'equipos', 'analisis', 'documentos', 'conclusiones'];
    navSections.forEach(id => {
      const section = document.getElementById(id);
      if (!section) return;

      ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setActiveNav(id),
        onEnterBack: () => setActiveNav(id)
      });
    });

    function setActiveNav(id) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }

    console.log('[Animations] GSAP ScrollTrigger initialized');
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
})();
