let charX = 215;
let charY = 315;
let currentScene = 0;
let backgrounds = [];
let sceneNames = ["Home", "Home", "NYUSH", "Quad", "The Bund", "White House", "Oval Office", "Banana Museum", "Banana Museum", "Storage Room", "Home"];
let startBtn;
let monkey;
let monkey1;
let fallingMonkey;
let imgMonkeyBody, imgMonkeyBody1, imgMonkeyHead, imgMonkeyHead1, imgMonkeyLeftArm, imgMonkeyRightArm, imgMonkeyRightArm1;
let imgMonkeyLeftLeg, imgMonkeyRightLeg, imgMonkeyTail;
let imgTricycle, imgFrontWheel, imgRightWheel, imgLeftWheel;
let imgMetal, imgPedal, imgBanana, imgMonkeyFalling, imgPortal;
let imgBox;
let angleFrontWheel = 0;
let angleRightWheel = 0;
let angleLeftWheel = 0;
let angleMetal = 0;
let anglePedal = 0;
let notePicked = false;
let bananaLeanAngle = 0;
let bananaTargetLean = 0;
let bananaLeanVelocity = 0;
const bananaFriction = 0.9;
const bananaSpringStrength = 0.05;
let showPortal = false;
let portalShowTimer = 0;
const portalShowDuration = 120;
let showMonkey = true;
let isStarted = false;
let isFalling = false;
let isFading = false;
let countAfterFall = 0;

// Scene 9 items
let showItemsScreen = false;
let selectedItem = null;
let boxVisible = true;

// Scene 10 variables
let imgKeyChain, imgIceCream, imgQilin, imgPaper;
let itemSlotPositions = [
  { x: 200, y: 200 },
  { x: 300, y: 200 },
  { x: 200, y: 350 },
  { x: 300, y: 350 }
];
let pickableItemIndex = 3;
let itemWidth = 100;
let itemHeight = 160;

// Scene 10 fade
let scene10StartTime = 0;
let isFadingFromScene10 = false;
const scene10FadeDelay = 5000;
const scene10FadeDuration = 5000;

// Fade from Scene 9 to Scene 10
let isFadingFromScene9 = false;
let scene9FadeStartTime = 0;
const scene9FadeDelay = 2000;
const scene9FadeDuration = 3000;

// AUDIO
let audioClips = [];
let currentAudio = null;
let previousScene = -1;
let notePickSound;
let fadeOutSound;
let monkeySound;

function preload() {
  imgMonkeyBody = loadImage('assets/monkey-body.png');
  imgMonkeyBody1 = loadImage('assets/MonkeyBody1.png');
  imgMonkeyHead = loadImage('assets/monkey-head.png');
  imgMonkeyLeftArm = loadImage('assets/monkey-left-arm.png');
  imgMonkeyRightArm = loadImage('assets/monkey-right-arm.png');
  imgMonkeyRightArm1 = loadImage('assets/MonkeyRightArm1.png');
  imgMonkeyLeftLeg = loadImage('assets/monkey-left-leg.png');
  imgMonkeyRightLeg = loadImage('assets/monkey-right-leg.png');
  imgMonkeyTail = loadImage('assets/monkey-tail.png');
  imgTricycle = loadImage('assets/trice.png');
  imgFrontWheel = loadImage('assets/FrontWheel.png');
  imgRightWheel = loadImage('assets/RightWheel.png');
  imgLeftWheel = loadImage('assets/LeftWheel.png');
  imgRod = loadImage('assets/Rod.png');
  imgBanana = loadImage('assets/banana.png');
  imgMetal = loadImage('assets/metal.png');
  imgPedal = loadImage('assets/pedal.png');
  imgMonkeyFalling = loadImage('assets/monkey-falling.png');
  imgPortal = loadImage('assets/Portal.png');
  imgBox = loadImage('assets/Box.png');
  imgMonkeyHead1 = loadImage('assets/MonkeyHead1.png');

  backgrounds[0] = loadImage('assets/Home.png');
  backgrounds[1] = loadImage('assets/Home1.png');
  backgrounds[2] = loadImage('assets/NYUSH.png');
  backgrounds[3] = loadImage('assets/Quad.png');
  backgrounds[4] = loadImage('assets/TheBund.png');
  backgrounds[5] = loadImage('assets/WhiteHouse.png');
  backgrounds[6] = loadImage('assets/OvalOffice.png');
  backgrounds[7] = loadImage('assets/Museum.png');
  backgrounds[8] = loadImage('assets/BananaMuseum.png');
  backgrounds[9] = loadImage('assets/StorageRoom.png');
  backgrounds[10] = loadImage('assets/Home1.png');

  imgKeyChain = loadImage('assets/Keychain.png');
  imgIceCream = loadImage('assets/IceCream.png');
  imgQilin = loadImage('assets/Qilin.png');
  imgPaper = loadImage('assets/Paper.png');


  audioClips[0] = loadSound('assets/audio/jungle.mp3');      // Scene 0
  audioClips[1] = loadSound('assets/audio/sports-mode.mp3'); // Scene 1
  audioClips[2] = loadSound('assets/audio/exhaust.mp3');     // Scene 2
  audioClips[3] = loadSound('assets/audio/graduation.mp3');  // Scene 3
  audioClips[4] = loadSound('assets/audio/bund.mp3');        // Scene 4
  audioClips[5] = loadSound('assets/audio/president.mp3');   // Scene 5
  audioClips[6] = loadSound('assets/audio/calm.mp3');     // Scene 6
  audioClips[7] = loadSound('assets/audio/hawaii.mp3');     // Scene 7
  audioClips[8] = loadSound('assets/audio/heaven.mp3');     // Scene 8
  audioClips[9] = loadSound('assets/audio/monkey.mp3');      // Scene 9
  audioClips[10] = loadSound('assets/audio/jungle.mp3');  // scene 10

  notePickSound = loadSound('assets/audio/paper.mp3');
  fadeOutSound = loadSound('assets/audio/jungle.mp3');
  monkeySound = loadSound('assets/audio/monkey.mp3');

}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  startBtn = createButton('Start');
  startBtn.position(520, 450);
  startBtn.mousePressed(startStory);
  monkey = new Monkey(width / 2, 380);
  monkey1 = new Monkey1(300, 390);
  fallingMonkey = new FallingMonkey(width / 2, -10);
}

function draw() {
  if (!isFading && !isFadingFromScene10 && !isFadingFromScene9) {
    imageMode(CORNER);
    image(backgrounds[currentScene], 0, 0, width, height);

    if (currentScene !== 0 && showPortal && currentScene !== 9 && currentScene !== 10) {
      let floatOffset = sin(frameCount * 0.05) * 8;
      let portalX = 415;
      let portalY = 170 + floatOffset;
      imageMode(CENTER);
      image(imgPortal, portalX, portalY, imgPortal.width * 1.2, imgPortal.height * 1.3);
    }

    fill(255);
    textSize(16);
    text("Location: " + sceneNames[currentScene], 110, 30);
  }

  // Scene 0 Part 1
  if (currentScene === 0 && !isFalling && !isFading) {
    imageMode(CENTER);
    let sway = map(sin(frameCount * 0.05), -1, 1, -10, 10);
    image(imgMonkeyFalling, width / 2 + sway, 80);
    textAlign(CENTER);
    fill(255);
    textSize(32);
    text("Let him fall!", 420, height - 100);
  }

  // Scene 0 Part 2
  if (currentScene === 0 && isFalling && !isFading) {
    fallingMonkey.update();
    fallingMonkey.display();
    if (fallingMonkey.y > 200) {
      isFading = true;
      startBtn.hide();
    }
  }

  if (isStarted && !isFading && !isFadingFromScene10 && showMonkey) {
    if (currentScene === 10) {
      monkey1.display();
    } else {
      monkey.display();
    }
  }

  if (isStarted && keyIsPressed) {
    const rotationStep = 0.1;
    let leanInput = 0;
    if (keyCode === LEFT_ARROW) {
      monkey.move(-10);
      angleFrontWheel += rotationStep;
      angleRightWheel += rotationStep;
      angleLeftWheel += rotationStep;
      angleMetal += rotationStep;
      anglePedal += rotationStep;
      monkey.x -= 2;
      leanInput = -1;
      if (monkey.x <= -100) monkey.x = 50;
      if (currentScene !== 10) {
        showPortal = true;
        portalShowTimer = portalShowDuration;
      }
    } else if (keyCode === RIGHT_ARROW) {
      monkey.move(10);
      angleFrontWheel += rotationStep;
      angleRightWheel += rotationStep;
      angleLeftWheel += rotationStep;
      angleMetal += rotationStep;
      anglePedal += rotationStep;
      monkey.x += 2;
      leanInput = 1;
      if (monkey.x >= 650 && currentScene < 9) {
        currentScene = Math.min(backgrounds.length - 1, currentScene + 1);
        monkey.x = 50;
      }
      if (currentScene !== 10) {
        showPortal = true;
        portalShowTimer = portalShowDuration;
      }
    }
    bananaTargetLean = leanInput * 0.3;
  } else {
    bananaTargetLean = 0;
  }

  // Banana physics
  let bananaLeanDiff = bananaTargetLean - bananaLeanAngle;
  bananaLeanVelocity += bananaLeanDiff * 0.1;
  bananaLeanVelocity *= bananaFriction;
  bananaLeanAngle += bananaLeanVelocity;

  // Portal timer
  if (portalShowTimer > 0) {
    portalShowTimer--;
  } else {
    showPortal = false;
  }

  // Scene 9 transition
  if (currentScene === 9) {
    if (!showItemsScreen && boxVisible) {
      image(imgBox, 300, 200, 200, 200); // draw el box
    }
  }

  // show items
  if (showItemsScreen) {
    fill(0, 180);
    rect(0, 0, width, height);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    let itemImages = [imgKeyChain, imgIceCream, imgQilin, imgPaper];
    let labels = ["Keychain", "Ice Cream", "Qilin", "Note"];
    text("Choose Correctly", 500, 280);
    textAlign(CENTER);
    textSize(19);
    fill(255);
    for (let i = 0; i < itemSlotPositions.length; i++) {
      let pos = itemSlotPositions[i];
      let size = 500;
      let imgX = pos.x;
      let imgY = pos.y + 1;
      push();
      if (i !== pickableItemIndex) tint(150);
      imageMode(CENTER);
      image(itemImages[i], imgX, imgY, size, size);
      noTint();
      text(labels[i], imgX, imgY + size / 2 + 20 - 200);
      pop();
    }
  }

  // dandle fade from Scene 9 to Scene 10
  if (isFadingFromScene9 && currentScene === 9) {
    let elapsed = millis() - scene9FadeStartTime;
    if (elapsed < scene9FadeDelay) {
      imageMode(CORNER);
      image(backgrounds[currentScene], 0, 0, width, height);
    } else {
      let alpha = map(elapsed - scene9FadeDelay, 0, scene9FadeDuration, 0, 255);
      alpha = constrain(alpha, 0, 255);

      imageMode(CORNER);
      image(backgrounds[currentScene], 0, 0, width, height);
      fill(0, alpha);
      noStroke();
      rect(0, 0, width, height);

      if (alpha >= 255) {
        currentScene = 10;
        isFadingFromScene9 = false;
        scene10StartTime = millis(); //scene 10 fade timer
        showPortal = false;

        // end credit music
        if (audioClips[10]) {
          if (currentAudio && currentAudio.isPlaying()) currentAudio.stop();
          currentAudio = audioClips[10];
          currentAudio.play();
        }
      }
    }
  }

  // fade transiton
  if (isFading) {
    countAfterFall++;
    let alpha = map(countAfterFall, 0, 240, 0, 255);
    alpha = constrain(alpha, 0, 255);
    fill(0, alpha);
    noStroke();
    rect(0, 0, width, height);
    if (countAfterFall > 60) {
      currentScene = 1;
      isFading = false;
      isStarted = true;
      countAfterFall = 0;
      monkey.x = width / 2;
      monkey.y = 380;
    }
  }

  // Fade to black after Scene 10
  if (currentScene === 10 && !isFadingFromScene10 && scene10StartTime > 0) {
    if (millis() - scene10StartTime > scene10FadeDelay) {
      isFadingFromScene10 = true;
    }
  }

  if (isFadingFromScene10) {
    let elapsed = millis() - (scene10StartTime + scene10FadeDelay);
    let alpha = map(elapsed, 0, scene10FadeDuration, 0, 255);
    alpha = constrain(alpha, 0, 255);
    fill(0, alpha);
    noStroke();
    rect(0, 0, width, height);
    fill(255);
    text("Mission Complete", 400, 100);
    text("Special Thank You to", 400, 140);
    text("Alex & Moon", 400, 160);
  }

  // autoplay
  if (currentScene !== previousScene) {
    previousScene = currentScene;

    if (currentAudio && currentAudio.isPlaying()) {
      currentAudio.stop();
    }

    if (audioClips[currentScene]) {
      currentAudio = audioClips[currentScene];
      currentAudio.play();
      currentAudio.setVolume(0.5);
    }
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW && currentScene === 0 && !isFalling) {
    startStory();
  }
}

function startStory() { //start button music
  if (currentScene === 0 && !isFalling) {
    isFalling = true;

    if (monkeySound && !monkeySound.isPlaying()) {
      monkeySound.play();
    }
  }
}

function mousePressed() {
  if (currentScene === 9 && !showItemsScreen &&
    mouseX > 300 && mouseX < 500 &&
    mouseY > 200 && mouseY < 350) {
    showItemsScreen = true;
    return;
  }

  if (showItemsScreen && !selectedItem) {
    for (let i = 0; i < itemSlotPositions.length; i++) {
      let pos = itemSlotPositions[i];
      let imgX = pos.x;
      let imgY = pos.y;
      if (
        mouseX > imgX - itemWidth / 2 &&
        mouseX < imgX + itemWidth / 2 &&
        mouseY > imgY - itemHeight / 2 &&
        mouseY < imgY + itemHeight / 2
      ) {
        if (i === pickableItemIndex) {
          selectedItem = i + 1;
          alert("You picked: Note");
          notePickSound.play();
          showItemsScreen = false;
          notePicked = true;
          boxVisible = false;
          scene9FadeStartTime = millis();
          isFadingFromScene9 = true;

          // Stop current audio and play fade out
          if (currentAudio && currentAudio.isPlaying()) currentAudio.stop();
          fadeOutSound.play();
        } else {
          alert("You cannot choose that.");
        }
        break;
      }
    }
  }
}

class Monkey {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.direction = 1;
  }
  move(xStep) {
    this.x += xStep;
    this.direction = xStep < 0 ? -1 : 1;
  }
  display() {
    push();
    translate(this.x, this.y);
    scale(this.direction, 1);

    let angleLeftLeg = map(sin(frameCount * 0.02), -1, 1, radians(20), radians(30));
    this.drawLeftLeg(25, 12, angleLeftLeg);

    let angleLeftArm = map(sin(frameCount * 0.05), -1, 1, radians(0), radians(20));
    this.drawLeftArm(20, -15, angleLeftArm);

    this.drawLeftWheel(-10, 70, angleLeftWheel);
    this.drawFrontWheel(105, 90, angleFrontWheel);
    this.drawRightWheel(-50, 75, angleRightWheel);
    this.drawTricycle(60, 40);
    this.drawMetal(10, 80, angleLeftWheel);
    this.drawPedal(10, 80, angleLeftWheel);

    let angleRightLeg = map(sin(frameCount * 0.02), -1, 1, radians(40), radians(70));
    this.drawRightLeg(-10, 28, angleRightLeg);

    let angleTail = map(sin(frameCount * 0.05), -1, 1, radians(40), radians(70));
    this.drawTail(-30, 10, angleTail);

    this.drawBody(5, 0, 0);

    let angleHead = sin(frameCount * 0.08) * Math.PI / 28;
    this.drawHead(0, -32, angleHead);

    let angleRightArm = map(sin(frameCount * 0.05), -1, 1, radians(60), radians(100));
    this.drawRightArm(-23, -12, angleRightArm);

    this.drawRod(60, 40);
    this.drawBanana(205, -160, bananaLeanAngle);

    pop();
  }

  drawHead(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgMonkeyHead, 0, -25);
    pop();
  }
  drawBody(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgMonkeyBody, -10, -10);
    pop();
  }
  drawLeftArm(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgMonkeyLeftArm, 35, -2);
    pop();
  }
  drawRightArm(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgMonkeyRightArm, 32, 3);
    pop();
  }
  drawLeftLeg(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgMonkeyLeftLeg, 30, -3);
    pop();
  }
  drawRightLeg(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgMonkeyRightLeg, 10, 0);
    pop();
  }
  drawTail(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgMonkeyTail, -47, 0);
    pop();
  }
  drawTricycle(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgTricycle, -20, 0);
    pop();
  }
  drawFrontWheel(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgFrontWheel, -83, 0);
    pop();
  }
  drawRightWheel(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgRightWheel, 25, 0);
    pop();
  }
  drawLeftWheel(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgLeftWheel, 1, 0);
    pop();
  }
  drawMetal(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgMetal, 3, 5);
    pop();
  }
  drawPedal(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgPedal, -3, 8);
    pop();
  }
  drawRod(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgRod, -20, 0);
    pop();
  }
  drawBanana(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgBanana, -150, 180);
    pop();
  }
}

class FallingMonkey {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = 0;
  }
  update() {
    this.vy += 0.01;
    this.y += this.vy;
  }
  display() {
    imageMode(CENTER);
    image(imgMonkeyFalling, this.x, this.y);
  }
}

class Monkey1 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.direction = 1;
  }
  move(xStep) {
    this.x += xStep;
    this.direction = xStep < 0 ? -1 : 1;
  }
  display() {
    push();
    translate(this.x, this.y);
    scale(this.direction, 1);

    let angleLeftLeg = map(sin(frameCount * 0.02), -1, 1, radians(90), radians(80));
    this.drawLeftLeg(25, 12, angleLeftLeg);

    let angleLeftArm = map(sin(frameCount * 0.05), -1, 1, radians(0), radians(20));
    this.drawLeftArm(20, -15, angleLeftArm);

    let angleRightLeg = map(sin(frameCount * 0.02), -1, 1, radians(95), radians(110));
    this.drawRightLeg(-10, 33, angleRightLeg);

    let angleTail = map(sin(frameCount * 0.05), -1, 1, radians(40), radians(70));
    this.drawTail(-30, 10, angleTail);

    let angleRightArm1 = map(sin(frameCount * 0.05), -1, 1, radians(-30), radians(-10));
    this.drawRightArm1(-25, -5, angleRightArm1);

    this.drawBody1(15, -50, 0);

    let angleHead = sin(frameCount * 0.08) * Math.PI / 28;
    this.drawHead1(0, -32, angleHead);

    pop();
  }

  drawHead1(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgMonkeyHead1, 0, -25);
    pop();
  }

  drawBody1(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgMonkeyBody1, -10, -10);
    pop();
  }

  drawRightArm1(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgMonkeyRightArm1, 35, -55);
    pop();
  }

  drawLeftArm(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgMonkeyLeftArm, 35, -2);
    pop();
  }

  drawLeftLeg(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgMonkeyLeftLeg, 30, -3);
    pop();
  }

  drawRightLeg(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgMonkeyRightLeg, 10, 0);
    pop();
  }

  drawTail(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(imgMonkeyTail, -47, 0);
    pop();
  }
}