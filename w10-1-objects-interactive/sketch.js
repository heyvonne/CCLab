let img;


function preload() {
  img = loadImage("assets/colorful.jpg");
}


function setup() {
  let canvas = createCanvas(500, 281);
  canvas.parent("p5-canvas-container");
}


function draw() {
  background(220);


  //image( imgVar, x, y, (w), (h));
  //imageMode(CENTER);




  let b = map(mouseX, 0, width, 0, 255);


  //tint(255, 255, b);
  tint(255, 50); // make it translucent
  image(img, 0, 0, width, height);
}



