/* ============================================================
   XEN EDUCATION — BANNER SCROLL (RESPONSIVE)
   ============================================================ */

(function () {

  var wrapper = document.querySelector('.xen-banner-slider-wrapper');
  if (!wrapper) return;

  var slides    = Array.from(wrapper.querySelectorAll('.xen-slide'));
  var numSlides = slides.length;
  if (numSlides === 0) return;

  /* Below this width the sticky/parallax effect is disabled */
  var BREAKPOINT = 992;

  function isSmallScreen() {
    return window.innerWidth < BREAKPOINT;
  }

  /* ── Remove all inline styles applied by the effect ── */
  function resetSlides() {
    slides.forEach(function (slide) {
      var section = slide.querySelector('section');
      if (!section) return;
      section.style.transform    = '';
      section.style.filter       = '';
      section.style.borderRadius = '';
    });
    /* Let content height determine the wrapper size */
    wrapper.style.height = '';
    /* Remove sticky so slides stack naturally */
    slides.forEach(function (slide) {
      slide.style.position = '';
      slide.style.top      = '';
      slide.style.height   = '';
    });
  }

  /* ── Apply sticky + parallax on desktop ── */
  function setupDesktop() {
    wrapper.style.height = (numSlides * 100) + 'vh';
    slides.forEach(function (slide) {
      slide.style.position = 'sticky';
      slide.style.top      = '0';
      slide.style.height   = '100vh';
    });
    onScroll();
  }

  /* ── Parallax scroll handler ── */
  function onScroll() {
    if (isSmallScreen()) return;

    var wrapperTop  = wrapper.getBoundingClientRect().top;
    var viewportH   = window.innerHeight;
    var scrolled    = -wrapperTop;
    var slideHeight = viewportH;

    slides.forEach(function (slide, i) {
      var section = slide.querySelector('section');
      if (!section) return;

      var progress = (scrolled - i * slideHeight) / slideHeight;
      progress = Math.min(1, Math.max(0, progress));

      section.style.transform    = 'scale(' + (1 - progress * 0.06) + ')';
      section.style.filter       = 'brightness(' + (1 - progress * 0.25) + ')';
      section.style.borderRadius = (progress * 20) + 'px';
    });
  }

  /* ── Main setup (runs on load + resize) ── */
  function setup() {
    if (isSmallScreen()) {
      resetSlides();
    } else {
      setupDesktop();
    }
  }

  window.addEventListener('resize', setup, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Run immediately */
  setup();

})();