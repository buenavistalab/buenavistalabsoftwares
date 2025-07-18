var cols, rows;
var scl = 20;
var w = 2500;
var h = 1000;
var flying = 0;
var terrain = [];

var sliderPI;
var sliderVelocidade;
var sliderOnda;
var sliderTamOndaMenos;
var sliderTamOndaMais;
var sliderStrokeW;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('myContainer');
  cols = w/scl;
  rows = h/scl;   
  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
  // slider pi
  sliderPI = createSlider(1, 4, 1, 0.001);
  sliderPI.parent('myInputs');
  sliderPI.class('inputs');
  let text1 = createP('PI');
  text1.parent('myTexts');
  text1.class('texts');
  // slider stroke weight
  sliderStrokeW = createSlider(0.01, 9, 9, 0.01);
  sliderStrokeW.parent('myInputs');
  sliderStrokeW.class('inputs');
  let text6 = createP('STROKE WEIGHT');
  text6.parent('myTexts');
  text6.class('texts');
  // slider velocidade
  sliderVelocidade = createSlider(0.01, 1, 0.01, 0.01);
  sliderVelocidade.parent('myInputs');
  sliderVelocidade.class('inputs');
  let text2 = createP('SPEED');
  text2.parent('myTexts');
  text2.class('texts');
  // slider onda
  sliderOnda = createSlider(0, 1, 0, 0.01);
  sliderOnda.parent('myInputs');
  sliderOnda.class('inputs');
  let text3 = createP('WAVE DEFORMITY');
  text3.parent('myTexts');
  text3.class('texts');
  // slider tamanho da onda mais
  sliderTamOndaMais = createSlider(10, 900, 10, 0.01);
  sliderTamOndaMais.parent('myInputs');
  sliderTamOndaMais.class('inputs');
  let text4 = createP('WAVE SIZE (+)');
  text4.parent('myTexts');
  text4.class('texts');
  // slider tamanho da onda menos
  sliderTamOndaMenos = createSlider(-200, 0, 0, 0.01);
  sliderTamOndaMenos.parent('myInputs');
  sliderTamOndaMenos.class('inputs');
  let text5 = createP('WAVE SIZE (-)');
  text5.parent('myTexts');
  text5.class('texts');
  saveButton = createButton('SAVE IMG');
  saveButton.mousePressed(saveImg);
  saveButton.parent('but');
}

function saveImg() {
  save('terrain.png');
}

function draw() {
//pi
var piPI = sliderPI.value();
//velocidade
var velo = sliderVelocidade.value();
//onda
var onda = sliderOnda.value();
//tamanho da onda menos
var ondaMenos = sliderTamOndaMenos.value();
//tamanho da onda mais
var ondaMais = sliderTamOndaMais.value();
//stroke weight
var sW = sliderStrokeW.value();

  flying -= velo; //velocidade
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, ondaMenos, ondaMais); //tamanho das ondas: -100, 100
      xoff += onda;
    }
    yoff += onda; //deformidade da onda, o valor inicial de xoff e yoff é +=0.1
  }
  
  background(0);
  //translate(0, 0, 0);
  //normalMaterial();
  //fill(random(255),random(255),random(255));
  fill(0);
  push();
  rotateX(PI/piPI);
  stroke(random(255),random(255),random(255));
  //stroke(255);
  strokeWeight(sW);
  translate(-w/2, -h/2);

  for (var y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
    }
    endShape();
  }
}

function mousePressed (){
  windowResized();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

$(document).ready(function() {
  $("button").click(function() {
    $("span").toggle();
  })
})