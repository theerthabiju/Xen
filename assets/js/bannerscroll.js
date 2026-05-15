

(function () {

    var wrapper = document.querySelector('.xen-banner-slider-wrapper');
    if (!wrapper) return;

    var slides = Array.from(wrapper.querySelectorAll('.xen-slide'));
    var numSlides = slides.length;
    if (numSlides === 0) return;

    

    wrapper.style.height = (numSlides * 100) + 'vh';

    function onScroll() {
        var wrapperTop = wrapper.getBoundingClientRect().top;
        var viewportH = window.innerHeight;
        var scrolled = -wrapperTop;   
        var slideHeight = viewportH;

        slides.forEach(function (slide, i) {
            var section = slide.querySelector('section');
            if (!section) return;

            var enterStart = i * slideHeight;         
            var enterEnd = (i + 1) * slideHeight;     

            var progress = (scrolled - enterStart) / slideHeight;
            progress = Math.min(1, Math.max(0, progress));

            
            var scale = 1 - (progress * 0.06);   
            var brightness = 1 - (progress * 0.25); 

            section.style.transform = 'scale(' + scale + ')';
            section.style.filter = 'brightness(' + brightness + ')';
            section.style.borderRadius = (progress * 20) + 'px'; 
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); 

})();