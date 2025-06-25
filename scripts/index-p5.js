// function setup() {
//   var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
//   canvas.parent('myCanvas');
//   background(0);
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

// function randomNumber(min, max) { 
//   return Math.random() * (max - min) + min;
// } 
// function randomNumber2(min, max) { 
//   return Math.random() * (max - min) + min;
// } 

// function draw() {
//   frameRate(3);

//   normalMaterial();
//   push();
//   rotateX(frameCount * Math.random());
//   rotateY(frameCount * Math.random());
//   rotateZ(frameCount * Math.random());
//   torus(randomNumber(1, 900), randomNumber2(1, 100));
//   pop();

// }

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('myCanvas');
  background(0);
  frameRate(100);
}

function draw() {
  let img = createImage(windowWidth, windowHeight);
  img.loadPixels();

  function writeColor(image, x, y, red, green, blue, alpha) {
    let index = (x + y * width) * 4;
    image.pixels[index] = red;
    image.pixels[index + 1] = green;
    image.pixels[index + 2] = blue;
    image.pixels[index + 3] = alpha;
  }

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let red = random(255);
      let green = random(255);
      let blue = random(255);
      let alpha = 255;
      writeColor(img, x, y, red, green, blue, alpha);
    }
  }

  img.updatePixels();
  background(0);
  image(img, 0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}