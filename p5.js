function setup() {
  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('myContainer');
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
  torus(randomNumber(90, 900), randomNumber2(90, 900));
  pop();

}

console.log(randomNumber(90, 900))
console.log(randomNumber2(90, 900))