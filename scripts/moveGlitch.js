const canvasTag = document.getElementById('move-glitch');

canvasTag.width = window.innerWidth * 2;
canvasTag.height = window.innerHeight * 2;

canvasTag.style.width = window.innerWidth + 'px';
canvasTag.style.height = window.innerHeight + 'px';

const context = canvasTag.getContext('2d');
context.scale(2, 2);

let aimX = null;
let aimY = null;
let currentX = null;
let currentY = null;

let i = 0;

const images = [
  '/assets/torus-img.png',
  '/assets/t1.png',
  '/assets/t2.png',
  '/assets/t3.png',
  '/assets/t4.png',
  '/assets/t5.png',
  '/assets/t6.png',
].map(source => {
  const image = document.createElement('img');
  image.src = source;
  return image;
});

['mousemove', 'touchmove'].forEach(function(e) {
  document.addEventListener(e, function(event) {
    aimX = event.clientX;
    aimY = event.clientY;
    if (currentX === null) {
      currentX = event.clientX;
      currentY = event.clientY;
    }
  });
});

canvasTag.addEventListener('click', function() {
  i = i + 1;
  if (i >= images.length) {
    i = 0;
  }
});

const draw = () => {
  if (currentX) {
    if (images[i].complete) {
      context.drawImage(images[i], currentX - 500, currentY - 250);
    }

    currentX = currentX + (aimX - currentX) * 0.1;
    currentY = currentY + (aimY - currentY) * 0.1;
  }

  requestAnimationFrame(draw);
};

draw();

// mouse text on hover
const currentMousePos = { x: -1, y: -1 };
    $(document).mousemove(function(event) {
    currentMousePos.x = event.pageX;
    currentMousePos.y = event.pageY;
    $('div.click-me').css('top', currentMousePos.y);
    $('div.click-me').css('left', currentMousePos.x);
});