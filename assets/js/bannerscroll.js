(function () {

  var wrapper = document.querySelector('.xen-banner-slider-wrapper');
  if (!wrapper) return;

  var slides    = Array.from(wrapper.querySelectorAll('.xen-slide'));
  var numSlides = slides.length;
  if (numSlides === 0) return;

  /* ── Disable on small screens (tablets & mobile) ── */
  var BREAKPOINT = 992;   /* px — change to 768 if you want mobile-only disable */

  function isSmallScreen() {
    return window.innerWidth < BREAKPOINT;
  }

  function resetSlides() {
    /* Remove all inline styles so sections look normal */
    slides.forEach(function(slide) {
      var section = slide.querySelector('section');
      if (!section) return;
      section.style.transform   = '';
      section.style.filter      = '';
      section.style.borderRadius = '';
    });
    /* Also reset wrapper height so it doesn't leave dead scroll space */
    wrapper.style.height = '';
  }

  function onScroll() {
    if (isSmallScreen()) return;   /* bail on small screens */

    var wrapperTop  = wrapper.getBoundingClientRect().top;
    var viewportH   = window.innerHeight;
    var scrolled    = -wrapperTop;
    var slideHeight = viewportH;

    slides.forEach(function(slide, i) {
      var section = slide.querySelector('section');
      if (!section) return;

      var progress = (scrolled - i * slideHeight) / slideHeight;
      progress = Math.min(1, Math.max(0, progress));

      section.style.transform    = 'scale(' + (1 - progress * 0.06) + ')';
      section.style.filter       = 'brightness(' + (1 - progress * 0.25) + ')';
      section.style.borderRadius = (progress * 20) + 'px';
    });
  }

  function setup() {
    if (isSmallScreen()) {
      resetSlides();   /* clear everything if resized down */
    } else {
      wrapper.style.height = (numSlides * 100) + 'vh';
      onScroll();
    }
  }

  /* Re-check on resize (e.g. rotating phone, resizing browser) */
  window.addEventListener('resize', setup, { passive: true });

  window.addEventListener('scroll', onScroll, { passive: true });
  setup();   /* replaces the bare onScroll() call */

})();