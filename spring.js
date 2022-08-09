var pos;
var vel;
var k;

function setup() {
  canvas = createCanvas(800,100);
  canvas.parent("spring");
  pos = 300;
  vel = 0;
  k = 0.001;
}

function draw() {
  background(30);
  fill(0,100,0);
  stroke(0,100,0);
  circle(width/2, height/2, 20);
  line(width/2, height/2, width/2 + pos, height/2);
  stroke(255);
  fill(255);
  circle(width/2 + pos, height/2, 10);
  pos = pos + vel;
  vel = vel - k*pos;
}

