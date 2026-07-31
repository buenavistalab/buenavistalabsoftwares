function shuffleChildren(containerSelector) {
  const wrapper = document.querySelector(containerSelector);
  if (!wrapper) return;

  const slides = Array.from(wrapper.children);

  for (let i = slides.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [slides[i], slides[j]] = [slides[j], slides[i]];
  }

  slides.forEach(slide => wrapper.appendChild(slide));
}

document.addEventListener('DOMContentLoaded', () => {
  shuffleChildren('.work-stack');

  window.addEventListener('load', () => {
    const clientsLogosEl = document.querySelector('.swiper-clients-logos');
    if (clientsLogosEl && clientsLogosEl.swiper) {
      clientsLogosEl.swiper.update();
    }
  });
});
