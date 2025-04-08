let sound;

function preload() {
  sound = loadSound("assets/song.mp3")
  song.play()


}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

}

function draw() {
  background(220)

  let volValue = map(mouseY, 0, height, 1.0, 0.0, true)
  sound.setVolume(volValue)

  let panValue = map(mouseX, 0, width, -1.0, 1.0, true)

  let rateValue = map(mouseX, 0, width, 3.0, 0.10, true)
  sound.rate(2.0)

}

function mousePressed() {
  if (sound.isPlaying)

    sound.pause()
  else {
    sound.loop()
  }
}