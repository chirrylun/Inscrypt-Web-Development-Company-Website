document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.webslide');
    const counters = document.querySelectorAll('.counter')


    let currentSlide = 0;
    let currentCounter = 0;

    function toggleCounter (index) {
        counters.forEach((counter, i) => {
            if(i === index) {
                counter.classList.add('active')
                
                
            } else {
                counter.classList.remove('active')
               
            }
        })

        currentCounter = index;
    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
                slide.classList.remove('prev');
                slide.style.transform = 'translateX(0)';
                slide.style.zIndex = '1';
            } else {
                slide.classList.remove('active');
                slide.classList.add('prev');
                slide.style.transform = i < index ? 'translateX(-100%)' : 'translateX(100%)';
                slide.style.zIndex = '0';
            }
        });
        
        currentSlide = index;
    }



    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function nextCounter() {
        let next = (currentCounter + 1) % counters.length;
        toggleCounter(next)
    }

    function prevSlide() {
        let prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    // Auto-slide every 3 seconds
    setInterval(nextSlide, 5000);
    setInterval(nextCounter, 5000);
   
    
    // Initialize the first slide
    showSlide(0);
    toggleCounter(0);
});