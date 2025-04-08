let dancer;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  dancer = new Stickdancer(width / 2, height / 2);
}

function draw() {
  background(0);
  drawFloor();

  dancer.update();
  dancer.display();
}

class Stickdancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.movement = 0;
    this.movementTarget = 0;
  }

  update() {
    let remainder = frameCount % 30;
    if (remainder === 0) {
      this.movementTarget += random(-15, 15);
    }
    this.movement = lerp(this.movement, this.movementTarget, 0.1);
  }

  display() {
    push();
    translate(this.x, this.y);
    this.drawArms();
    this.drawBody();
    this.drawHead();


    this.drawLegs();


    pop();
  }

  drawHead() {
    fill(255, 224, 189);
    noStroke();

    let headX = sin(frameCount * 0.1) * 5;
    circle(0, -120 + this.movement / 2, 40);

    //bun
    fill(139, 69, 19);
    noStroke();


    ellipse(0, -145 + this.movement / 2, 38, 20);
  }

  drawBody() {
    stroke(255, 192, 203);
    strokeWeight(20);


    line(0, -100 + this.movement / 2, 0, -20 + this.movement);
  }

  drawLegs() {

    stroke(255, 224, 189);
    strokeWeight(20);

    push();
    translate(-5, -20 + this.movement);
    rotate(sin(frameCount * 0.05) * PI / 30); // left leg
    line(0, 0, 0, 80);
    pop();


    push();
    translate(5, -20 + this.movement);
    rotate(-sin(frameCount * 0.05) * PI / 30); //right leg
    line(0, 0, 0, 80);
    pop();

    fill(255, 182, 193);
    noStroke();
    quad(-13, -40 + this.movement, 13, -40 + this.movement, 20, 20 + this.movement, -20, 20 + this.movement); //skirt
    stroke(255, 224, 189);
    strokeWeight(20);
  }

  drawArms() {
    stroke(255, 224, 189);
    strokeWeight(15);

    let t = frameCount * 0.05;

    // left Arm
    push();
    translate(-10, -70 + this.movement / 2);
    rotate(map(sin(t), -1, 1, -PI / 3, -PI / 6));
    line(0, 0, 0, -40);
    line(0, -40, 20, -80);
    pop();

    // right Arm
    push();
    translate(10, -70 + this.movement / 2);
    rotate(map(cos(t), -1, 1, PI / -4.8, -PI / 1.2));
    line(0, 0, 0, 60);
    pop();
  }
}