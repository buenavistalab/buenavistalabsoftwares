class Blob {

  constructor(x, y) {
      this.x = x;
      this.y = y;
      let angle = random(0, 2*PI);
      this.xspeed = random(-30, 15)*Math.cos(angle);
      this.yspeed = random(-30, 15)*Math.sin(angle);
      this.r = random(60, 200);
  }

  update() {
      this.x += this.xspeed;
      this.y += this.yspeed;
      if(this.x > width || this.x < 0) this.xspeed *= -1;
      if(this.y > height || this.y < 0) this.yspeed *= -1;
  }

  show() {
      ellipse(this.x, this.y, this.r*1, this.r*1);
  }
}

var blobs = []
var slider;
var slider2;
var slider3;
var mask;

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('myContainer');
    colorMode(HSB);
    for(i = 0; i < 10; i++) blobs.push(new Blob(random(0, width), random(0, height)));
    slider = createSlider(-200, 200, 0, 0.01);
    slider.parent('myInputs');
    slider.class('inputs');
    slider2 = createSlider(-100, 100, 50, 0.01);
    slider2.parent('myInputs');
    slider2.class('inputs');
    slider3 = createSlider(-100, 100, 10, 0.01);
    slider3.parent('myInputs');
    slider3.class('inputs');
  }
  
function draw() {
    var val = slider.value();
    var val2 = slider2.value();
    var val3 = slider3.value();

    loadPixels();
    for(x = 0; x < width; x++) {
        for(y = 0; y < height; y++) {
            let sum = val;
            for(i = 0; i < blobs.length; i++) {
                let xdif = x - blobs[i].x;
                let ydif = y - blobs[i].y;
                let d = sqrt((xdif*xdif) + (ydif*ydif));
                sum += random(val2, val3) * blobs[i].r/d;
            }
            set(x, y, color(sum, 255, 255));
        }
    }
    updatePixels();

    for(i = 0; i < blobs.length; i++) {
        blobs[i].update();
    }

}

$(document).ready(function() {
    $("button").click(function() {
      $("span").toggle();
    })
  })
  