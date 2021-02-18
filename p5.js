function setup() {
  var canvas = createCanvas(50, 50, WEBGL);
  canvas.parent('myContainer');
}

function draw() {
  frameRate(10);

  normalMaterial();
  push();
  rotateX(frameCount * Math.random());
  rotateY(frameCount * Math.random());
  rotateZ(frameCount * Math.random());
  torus(50, 1);
  pop();

}
