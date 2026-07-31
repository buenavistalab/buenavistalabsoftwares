const swiperProductsEl = document.querySelector('.swiper-products');
if (swiperProductsEl) {
  new Swiper('.swiper-products', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    mousewheel: false,
    hashNavigation: {
      watchState: true,
    }
  });
}

const swiperClientsEl = document.querySelector('.swiper-clients');
if (swiperClientsEl) {
  new Swiper('.swiper-clients', {
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
}

const swiperHomeEl = document.querySelector('.swiper-home');
if (swiperHomeEl) {
  new Swiper('.swiper-home', {
    loop: true
  });
}

const swiperClientsLogosEl = document.querySelector('.swiper-clients-logos');
if (swiperClientsLogosEl) {
  new Swiper('.swiper-clients-logos', {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 48,
    centeredSlides: false,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
    speed: 5000,
    allowTouchMove: true,
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 56,
      },
      900: {
        slidesPerView: 4,
        spaceBetween: 64,
      },
    }
  });
}
