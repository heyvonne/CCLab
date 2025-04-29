let wheel1;
let wheel2;
let wheel3;

let charX = 215;
let charY = 315;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // Wheel 1
  wheel1 = new Wheel(200, 280);
  // Wheel 2
  wheel2 = new Wheel(160, 300);
  //wheel 3 outwards
  wheel3 = new Wheel(270, 300);
}

function draw() {
  background(144, 238, 120);
  fill(144, 200, 100);
  rect(-10, 320, 820, 200);

  // Update and display both wheels
  drawCharacter(charX, charY);
}

//class Monkey {
//constructor(x, y) {
//this.wheel1 = new Wheel(200, 280);
//
//}
//}


function drawCharacter(x, y) {
  push();
  translate(x, y);

  fill(255, 0, 0);
  circle(0, 0, 5); // origin

  // the monkey character
  translate(-215, -315);

  wheel1.update();
  wheel1.display();

  wheel3.update();
  wheel3.display();

  drawBikeSeat(200, 260);
  drawBikeHandlebars(255, 250);
  drawBikefloor(215, 300);

  wheel2.update();
  wheel2.display();

  drawRod();
  drawMonkey();
  pop();
}

function keyPressed() {
  const rotationStep = 0.1; // radians per key press
  if (keyCode === LEFT_ARROW) {
    wheel1.angle -= rotationStep;
    wheel2.angle -= rotationStep;
    wheel3.angle -= rotationStep;
    charX -= 2;
  } else if (keyCode === RIGHT_ARROW) {
    wheel1.angle += rotationStep;
    wheel2.angle += rotationStep;
    wheel3.angle += rotationStep;
    charX += 2;
  }
}

// Wheel class
class Wheel {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
  }

  update() {
    // You can add easing or animation here later
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);

    // Draw wheel
    strokeWeight(3);
    fill(144, 238, 120);
    ellipse(0, 0, 60, 60);

    fill(0);
    // Spokes
    for (let i = 0; i < 16; i++) {
      push();
      rotate((TWO_PI / 16) * i);
      line(0, 0, 0, 30);
      pop();
    }

    // Center hub
    fill(40);
    ellipse(0, 0, 20, 20);
    pop();
  }
}

// Function to draw a bike seat
function drawBikeSeat(x, y) {
  push();
  stroke(50);
  strokeWeight(3);
  fill(0); // Purple-ish color for the seat

  // Top part of the seat (a trapezoid shape)
  beginShape();
  vertex(x - 30, y); // Left
  vertex(x + 30, y); // Right
  vertex(x + 20, y - 10); // Top-right
  vertex(x - 20, y - 10); // Top-left
  endShape(CLOSE);

  // Seat post going down
  line(x, y, x + 20, y + 40);

  pop();
}
function drawBikefloor(x, y) {
  push();
  stroke(5);
  strokeWeight(7);
  fill(0);

  beginShape();
  vertex(x - 50, y); // Left
  vertex(x + 50, y); // Right
  vertex(x + 40, y - 10); // Top-right
  vertex(x - 17, y - 20); // Top-left
  endShape(CLOSE);

  pop();
}

function drawBikeHandlebars(x, y) {
  push();
  stroke(4);
  strokeWeight(3);
  fill(0);
  beginShape();
  vertex(x - 20, y); // Left
  vertex(x + 20, y); // Right
  vertex(x + 17, y - 5); // Top-right
  vertex(x - 17, y - 5); // Top-left
  endShape(CLOSE);

  // Seat post going down
  line(x, y, x, y + 43);
  pop();
}
function drawRod(x, y) {
  strokeWeight(3);
  line(255, 250, 350, 180);
  textSize(54);
  text("🍌", 335, 230);
}

function drawMonkey(x, y) {
  fill(139, 69, 42);
  quad(208, 256, 227, 258, 238, 289, 223, 288); //leg behind the body
  quad(218, 219, 221, 233, 256, 245, 266, 238); //arm behind the body
  square(182, 170, 41); //head
  rect(180, 210, 45, 45); //body

  quad(183, 259, 195, 256, 216, 288, 197, 295); //leg

  quad(180, 221, 176, 235, 231, 252, 235, 244); // firstarm
}
