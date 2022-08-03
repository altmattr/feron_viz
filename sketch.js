var us = [0];
var xs = [math.matrix([[0],[0]])];
var ys = [0];
x = xs[0];

var pos;

function setup() {
  canvas = createCanvas(800,800);
  canvas.parent("sketch");
  pos = new p5.Vector(200,180);
}

function draw() {
  background(255);
  stroke(0);
  fill(255);
  circle(pos.x, pos.y, 10);
  if(mouseIsPressed){
    pos.x = mouseX;
    pos.y = mouseY;
  }
  stroke(0,255,0);
  circle(width/2, height/2, 10);
  controller();
  graph_it(ys, 0, 500, "input");
  graph_it(xs.map(x => x.subset(math.index(0,0))), 0, 600, "state a");
  graph_it(xs.map(x => x.subset(math.index(1,0))), 0, 700, "state b");
  graph_it(us, 0, 800, "output");
}

// controller on time step i
function controller(){
  var y = read();
  var u = g(x, y);
  send(u);
  xs.push(x);  // I was able to hide the others :)
  x = f(x,y);
}

function g(x, y){
  var c = math.matrix([[564.4, 0]]);
  var front = math.multiply(c, x);
  return math.squeeze(math.subtract(front, 1280 * sat(y)));
}

function f(x, y){
  var a = math.matrix([[0.4990, -0.0500],[0.0100, 1.00]]);
  var front = math.multiply(a, x);
  var b = math.matrix([[1],[0]]);
  var back = math.multiply(b, sat(y))
  return math.add(front, back);
}

function sat(y){
  return constrain(y, -1, 1);
}

function read(){
  var res = dist(width/2, height/2, pos.x, pos.y)/100;
  ys.push(res);
  return res;
}

function send(y){
  us.push(y);
}

function graph_it(arr, x, y, title){
  var max = Math.max(...arr);
  var min = Math.min(...arr);
  var gap = max - min;
  var normalised = arr.slice(-800).map((v) => {
    return (v - min) * (100/gap);
  });
  stroke(0);
  fill(255);
  normalised.forEach(function(val,i) {
    point(x + i, y-val);
  });
  fill(0);
  text(title, x+30,y-70);
  text(nf(min, 3, 0), x, y-10);
  text(nf(max, 3, 0), x, y-100);
}