function setup() {
  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('myContainer');
  background(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  frameRate(5);

  normalMaterial();
  push();
  rotateX(frameCount * Math.random());
  rotateY(frameCount * Math.random());
  rotateZ(frameCount * Math.random());
  torus(50, 1);
  pop();

}
