let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(0, 0, 50);

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.display();

    if (p.isDead()) {
      particles.splice(i, 1); // remove particles from the array
    }
  }
}

function mousePressed() {
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(mouseX, mouseY));
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.vx = random(-3, 3); // random horizontal velocity
    this.vy = random(-5, -2); // random vertical velocity
    this.dia = random(4, 10); // random size
    this.color = color(random(255), random(255), random(255)); // random color
    this.lifespan = 200; //fireworks opacity
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.1;
    this.lifespan -= 2.6;
  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), this.lifespan);
    circle(0, 0, this.dia); // draw the particle as a circle
    pop();
  }

  isDead() {
    return this.lifespan <= 0;
  }
}