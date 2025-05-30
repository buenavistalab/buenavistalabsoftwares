// script.js
const eyes   = document.querySelectorAll('.eye');
const pupils = document.querySelectorAll('.pupil');

document.addEventListener('mousemove', e => {
  pupils.forEach(pupil => {
    const eye = pupil.parentElement;
    const rect = eye.getBoundingClientRect();
    const eyeX = rect.left + rect.width / 2;
    const eyeY = rect.top  + rect.height / 2;

    const dx = e.clientX - eyeX;
    const dy = e.clientY - eyeY;
    const angle = Math.atan2(dy, dx);

    // distancia máxima que a pupila pode ir (1/4 do diâmetro do olho)
    const maxDist = rect.width / 4;
    const dist = Math.min(maxDist, Math.hypot(dx, dy) / 10);

    const x = Math.cos(angle) * dist;
    const y = Math.sin(angle) * dist;

    pupil.style.transform = `translate(${x}px, ${y}px)`;
  });
});

document.addEventListener('click', () => {
  eyes.forEach(eye => {
    eye.classList.add('blink');
    // remove a classe após a animação
    eye.addEventListener('animationend', () => {
      eye.classList.remove('blink');
    }, { once: true });
  });
});
