const swiper = new Swiper('.swiper-products', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  mousewheel: false,
  hashNavigation: {
    watchState: true,
  }
});

const swiper2 = new Swiper('.swiper-clients', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
    waitForTransition: true
  },
  speed: 4000,
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  }
});
