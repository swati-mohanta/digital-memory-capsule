/* script.js  –  MemoryCapsule Landing Page
   Requires: jQuery 3.x, Bootstrap 5 */

$(document).ready(function () {

  /* 1. FEATURE CARDS – cursor pointer on hover
        (jQuery example: could add more logic here
        e.g. tooltip, ripple effect, etc.) */
  $('.feature-card').on('mouseenter', function () {
    $(this).css('cursor', 'pointer');
  });

  /* 2. STEP REVEAL – animate steps into view
        when the How It Works section scrolls in
        (Vanilla JS IntersectionObserver) */
  const steps = document.querySelectorAll('.step');

  // Set initial hidden state
  steps.forEach(function (s) {
    s.style.opacity = '0';
    s.style.transform = 'translateY(20px)';
    s.style.transition = 'opacity .5s ease, transform .5s ease';
  });

  // Observe and reveal with stagger
  const stepObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        steps.forEach(function (s, i) {
          setTimeout(function () {
            s.style.opacity = '1';
            s.style.transform = 'translateY(0)';
          }, i * 160);
        });
        stepObserver.disconnect(); // run once
      }
    });
  }, { threshold: 0.3 });

  const howSection = document.querySelector('.how-section');
  if (howSection) {
    stepObserver.observe(howSection);
  }

  /* 3. BUTTON RIPPLE EFFECT
        Adds a quick ripple on all primary buttons
        when clicked for tactile feedback */
  $('.btn-capsule, .btn-cta-big').on('click', function (e) {
    const $btn = $(this);
    const offset = $btn.offset();
    const x = e.pageX - offset.left;
    const y = e.pageY - offset.top;

    const $ripple = $('<span class="btn-ripple"></span>').css({
      position: 'absolute',
      borderRadius: '50%',
      width: '10px',
      height: '10px',
      left: x - 5,
      top: y - 5,
      background: 'rgba(255,255,255,0.5)',
      pointerEvents: 'none',
      transform: 'scale(0)',
      transition: 'transform .4s ease, opacity .4s ease',
      opacity: '1'
    });

    // Button must be relative for ripple positioning
    $btn.css('position', 'relative').css('overflow', 'hidden').append($ripple);

    // Trigger animation on next tick
    setTimeout(function () {
      $ripple.css({ transform: 'scale(30)', opacity: '0' });
    }, 10);

    // Remove ripple element after animation completes
    setTimeout(function () {
      $ripple.remove();
    }, 450);
  });

  /* 4. SMOOTH SCROLL
        If any in-page anchor links are added later,
        this handles smooth scrolling automatically */
  $('a[href^="#"]').on('click', function (e) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 20
      }, 600);
    }
  });

});