function setup() {
  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('myCanvas');
  background(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function randomNumber(min, max) { 
  return Math.random() * (max - min) + min;
} 
function randomNumber2(min, max) { 
  return Math.random() * (max - min) + min;
} 

function draw() {
  frameRate(3);

  normalMaterial();
  push();
  rotateX(frameCount * Math.random());
  rotateY(frameCount * Math.random());
  rotateZ(frameCount * Math.random());
  torus(randomNumber(1, 900), randomNumber2(1, 100));
  pop();

}
