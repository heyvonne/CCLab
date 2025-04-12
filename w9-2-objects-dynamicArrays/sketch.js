let particles = []; // empty array


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");


  // generate particle!
  particles.push(new Particle(width / 2, height / 2, 30));
}


function draw() {
  background(220);


  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.display();
  }


}


class Particle {
  constructor(x, y, dia) {
    this.x = x;
    this.y = y;
    this.dia = dia;
  }
  display() {
    push();
    translate(this.x, this.y);


    circle(0, 0, this.dia);


    pop();
  }
}
