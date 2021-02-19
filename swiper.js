const swiper = new Swiper('.swiper-products', {
  // Optional parameters
  loop: true,
  slidesPerView: 1,
  loop: true,
  mousewheel: true,
  hashNavigation: {
    watchState: true,
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});

const swiper2 = new Swiper('.swiper-clients', {
  // Optional parameters
  loop: true,
  slidesPerView: 1,
  loop: true,
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
