document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".webslide");
  const counters = document.querySelectorAll(".counter");
  const container = document.getElementById("image-container");
  const mainImage = container?.querySelector(".image-main");
  const secondaryImage = container?.querySelector(".image-secondary");

  let currentSlide = 0;
  let currentCounter = 0;

  function toggleCounter(index) {
    counters.forEach((counter, i) => {
      if (i === index) {
        counter.classList.add("active");
      } else {
        counter.classList.remove("active");
      }
    });

    currentCounter = index;
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
        slide.classList.remove("prev");
        slide.style.transform = "translateX(0)";
        slide.style.zIndex = "1";
      } else {
        slide.classList.remove("active");
        slide.classList.add("prev");
        slide.style.transform =
          i < index ? "translateX(-100%)" : "translateX(100%)";
        slide.style.zIndex = "0";
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
    toggleCounter(next);
  }

  function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  function animateImages() {
    // Create overlay divs for transition effect
    const mainOverlay = document.createElement("div");
    const secondaryOverlay = document.createElement("div");

    mainOverlay.className = "image-overlay";
    secondaryOverlay.className = "image-overlay";

    container?.appendChild(mainOverlay);
    container?.appendChild(secondaryOverlay);

    // Set initial styles
    mainOverlay.style.backgroundImage = `url(${mainImage.src})`;
    secondaryOverlay.style.backgroundImage = `url(${secondaryImage.src})`;

    // Animate
    mainImage.style.transition =
      "opacity 1.5s ease-in-out, transform 1.5s ease-in-out";

    mainOverlay.style.transition =
      "opacity 1.5s ease-in-out, transform 1.5s ease-in-out";

    // Fade out and zoom in current images
    mainImage.style.opacity = "0";
    mainImage.style.transform = "scale(1.1)";

    // Fade in and zoom out overlay images
    mainOverlay.style.opacity = "1";
    mainOverlay.style.transform = "scale(1)";

    // After animation, swap images and remove overlays
    setTimeout(() => {
      const tempSrc = mainImage.src;
      mainImage.src = secondaryImage.src;
      secondaryImage.src = tempSrc;

      mainImage.style.opacity = "1";
      mainImage.style.transform = "scale(1)";
      secondaryImage.style.opacity = "1";

      container.removeChild(mainOverlay);
      container.removeChild(secondaryOverlay);

      mainImage.style.transition = "";
      secondaryImage.style.transition = "";
    }, 1500);
  }

    // Initialize the first slide
    showSlide(0);
    toggleCounter(0);

  // Auto-slide every 3 seconds
  setInterval(nextSlide, 5000);
  setInterval(nextCounter, 5000);
  setInterval(animateImages, 5000);


});
