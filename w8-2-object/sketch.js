let creatureA, creatureB;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  creatureA = new Creature(200, 250, 50)
  creatureB = new Creature(600, 250, 300)
}

function draw() {
  background(220);

  creatureA.display()
  creatureA.drawArm()
  creatureB.display()
  creatureB.drawArm()
}

class Creature {
  constructor(tempX, tempY, dia) {
    this.x = tempX;
    this.y = tempY;
    this.dia = dia;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);

  }
  display() {
    fill(this.r, this.g, this.b)
    circle(this.x, this.y, this.dia)
  }
  drawArm() {
    ellipse(100, 250, 200);
  }
}

