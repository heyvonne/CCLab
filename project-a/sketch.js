/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas
*/



let x, y;
let blob = 50;
let blobsize = 20;
let r = 255;
let g = 255;
let b = 255;
let squareX, squareY;
let squareSize = 25;

let spaceshipX1 = 0, spaceshipX2 = 0, spaceshipX3 = 0; //spaceship variables


let squaresEaten = 0; // tracks how many squares eaten

let isSkeleton = false; // tracks if the astronaut has turned into a skeleton


function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
    background(0);

    x = 400;
    y = 250;
    spawnSquare(); // sopawnns the first square
}

function draw() {
    background(0);


    drawStars(); //draws the background

    // spaceships in the background
    let fluct1 = map(sin(frameCount * 0.2), -1, 1, -0.1, 0.1);
    drawSpaceship(spaceshipX1 + frameCount * 1, 150, fluct1, "yellow", "👨‍🚀");

    let fluct2 = map(sin(frameCount * 0.1), -1, 1, -0.1, 0.1);
    drawSpaceship(spaceshipX2 + frameCount * 0.7, 250, fluct2, "orange", "👩‍🚀");

    let fluct3 = map(sin(frameCount * 0.15), -1, 1, -0.1, 0.1);
    drawSpaceship(spaceshipX3 + frameCount * 0.8, 350, fluct3, "cyan", "");


    if (!isSkeleton) { // update blob position if astronaut is not a skeleton
        x = lerp(x, mouseX, 0.06);
        y = lerp(y, mouseY, 0.06);
    }

    blob = lerp(blob, blobsize, 0.1);


    let dista = dist(x, y, squareX, squareY);   // checks the collision with square
    if (dista < blob / 2 + squareSize / 2 && blobsize < 1500) {
        blobsize += 20;

        r = random(255);
        g = random(255);
        b = random(255);
        squaresEaten++; // increment the count of squares eaten

        if (squaresEaten < 60) {
            spawnSquare(); // spawns new squares if not all squares are eaten
        } else {
            squareX = -100; // if requirement met, squares are moved off screen
            squareY = -100;
        }
    }


    drawSquare();   // draw blobby, square
    drawBlob();

    if (blobsize > 50) {   // draw arms only if the blob has started growing, step 1 of morphing

        drawArms();
    }


    drawAstronautMessage(); //text messages in the beginnign

    if (!isSkeleton &&   // checks if all spaceships have reached x = 700
        //thank you Moon
        spaceshipX1 + frameCount * 1 >= 700 &&
        spaceshipX2 + frameCount * 0.7 >= 700 &&
        spaceshipX3 + frameCount * 0.8 >= 700) {
        if (squaresEaten < 10) {
            isSkeleton = true; // player dies
        }
    }

    if (isSkeleton) {   // draw a death screen if astronaut doesn't eat

        drawDeathScreen();
    }

    // draws the "You're on your own!" message when the spaceship crosses 1/3 of the screen
    if (!isSkeleton) {
        if (spaceshipX1 + frameCount * 1 > width / 3) {
            drawSpaceshipMessage(spaceshipX1 + frameCount * 1, 150);
        } else if (spaceshipX2 + frameCount * 0.7 > width / 3) {
            drawSpaceshipMessage(spaceshipX2 + frameCount * 0.7, 250);
        } else if (spaceshipX3 + frameCount * 0.8 > width / 3) {
            drawSpaceshipMessage(spaceshipX3 + frameCount * 0.8, 350);
        }
    }
}

function spawnSquare() {
    squareX = random(15, 385);
    squareY = random(15, 235);
}

function drawSpaceship(x, y, angle, colorName, rider) {
    push();
    translate(x, y);


    if (blobsize >= 1500) {   // checks if the blob has reached maximum size, stops moving and draws exploding emoji
        angle = 0; // no rotation
        textSize(40);
        fill("red");
        text("💥", -20, 0);
    } else {

        rotate(angle);
        textSize(40);
        fill(colorName);
        text("🚀", -20, 0);


        fill(0);
        textSize(20);
        text(rider, -3, -15);
    }
    pop();
}

function drawBlob() {
    push();
    noStroke();

    // if the blob is still small, draw the astronaut or skeleton emoji
    if (blobsize <= 70) {
        textSize(40);
        fill(255);
        if (isSkeleton) {
            text("💀", x - 25, y + 15);
        } else {
            text("👨‍🚀", x - 25, y + 15);
        }
    }
    // Otherwise, draw the blob
    else {
        fill(r, g, b, 200);
        ellipse(x, y, blob, blob);
    }
    pop();
}

function drawSquare() {
    if (squaresEaten < 75) {
        push();
        noStroke();
        fill(255, 0, 0);
        rect(squareX, squareY, squareSize, squareSize);
        pop();
    }
}

function drawStars() { //background codes
    fill(255);
    noStroke();
    for (let i = 0; i < 10; i++) {
        let starX = random(width);
        let starY = random(height);
        let starSize = random(1, 3);
        ellipse(starX, starY, starSize, starSize);
    }
}

function drawArms() {
    let armLength = blob * 0.6;
    let armWidth = blob * 0.1;
    let rotSpeed = map(blob, 50, 1500, 0.001, 0.012);
    let swingAngle = sin(frameCount * rotSpeed) * 45;

    push();
    translate(x - blob / 2, y);
    rotate(-swingAngle);
    fill(r, g, b, 200);
    noStroke();
    rect(0, -armWidth / 2, armLength, armWidth);
    pop();

    push();
    translate(x + blob / 2, y);
    rotate(swingAngle);
    fill(r, g, b, 200);
    noStroke();
    rect(0, -armWidth / 2, armLength, armWidth);
    pop();
}

function drawDeathScreen() {
    push();
    fill(255, 0, 0, 150);
    rect(0, 0, width, height);


    textAlign(CENTER, CENTER);
    textSize(60);
    fill(255);
    text("Creature Suffocated", width / 2, height / 2);
    pop();
}

function drawSpaceshipMessage(x, y) {
    push();
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(255);
    text("You're on your own, Chris!", x, y - 50); // positions above the spaceship
    pop();
}

function drawAstronautMessage() {
    push();
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(255);

    if (squaresEaten === 0 || squaresEaten === 1) {
        text("I'm hungry, hopeless, and lost...", x, y - 50); // first message
    } else if (squaresEaten === 2) {
        text("What's happening to me?", x, y - 50); // transformation begins
    } else if (squaresEaten === 5) {
        text("An eye for an eye?", 350, 450);
    } else if (squaresEaten === 8)
        text("Or let them live?", 350, 450);
    else if (squaresEaten > 60)
        text("Chris has taken revenge and continues to grow.", 350, 450);



    pop();
}
