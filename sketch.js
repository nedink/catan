board.hexes.forEach(hex => {
  resources.sort(() => Math.random() - 0.5);
  hex.resource = resources.pop();

  if (hex.resource === "desert") return;
  rolls.sort(() => Math.random() - 0.5);
  hex.roll = rolls.pop();
});

// ---------------------------

function setup() {
  setColors();

  createCanvas(innerWidth, innerHeight, WEBGL);
  noLoop();
}

// ---------------------------

let rotationZ = 0;

function draw() {
  background(0);

  translate(0, -zoom * 5, 0);

  scale(zoom);

  rotateX(PI / 3);
  rotateZ(rotationZ);

  ambientLight(255);
  ambientMaterial(255);
  sphere(0);

  pointLight(255, 255, 255, 0, 0, 0);

  board.hexes.forEach(hex => {
    const c = colors[hex.resource];
    ambientMaterial(c);
    noStroke();

    // stroke(255, 20);

    const gaussian = makeGaussian(5, 0, 0, 3, 1);

    function subdivide(hex, divisions, x, y, angle, radius, division) {
      if (!division) division = 1;

      if (division < divisions) {
        subdivide(hex, divisions, x, y, angle, radius / 2, division + 1);
        subdivide(hex,
          divisions,
          x + (cos(angle + (2 * PI) / 3) * radius) / 2,
          y + (sin(angle + (2 * PI) / 3) * radius) / 2,
          angle,
          radius / 2,
          division + 1
        );
        subdivide(hex, 
          divisions,
          x + (cos(angle + PI / 3) * radius) / 2,
          y + (sin(angle + PI / 3) * radius) / 2,
          angle,
          radius / 2,
          division + 1
        );
        subdivide(hex,
          divisions,
          x +
            (cos(angle + (2 * PI) / 3) * radius) / 2 +
            (cos(angle + PI / 3) * -radius) / 2,
          y +
            (sin(angle + (2 * PI) / 3) * radius) / 2 +
            (sin(angle + PI / 3) * -radius) / 2,
          angle,
          radius / 2,
          division + 1
        );
        return;
      }

      let vertx, verty;
      function vertz() {
        return gaussian(sqrt(pow(vertx - hex.x(), 2) + pow(verty - hex.y(), 2)), 0) * noise(vertx, verty);
        // return sqrt(pow(vertx - hex.x(), 2) + pow(verty - hex.y(), 2));
      }

      beginShape();
      vertx = x;
      verty = y;
      vertex(vertx, verty, vertz());
      vertx = x + (cos(angle + (2 * PI) / 3) * radius) / 2;
      verty = y + (sin(angle + (2 * PI) / 3) * radius) / 2;
      vertex(vertx, verty, vertz());
      vertx = x + (cos(angle + PI / 3) * radius) / 2;
      verty = y + (sin(angle + PI / 3) * radius) / 2;
      vertex(vertx, verty, vertz());
      endShape();

      beginShape();
      vertx = x + (cos(angle + (2 * PI) / 3) * radius) / 2;
      verty = y + (sin(angle + (2 * PI) / 3) * radius) / 2;
      vertex(vertx, verty, vertz());
      vertx = x + cos(angle + (2 * PI) / 3) * radius;
      verty = y + sin(angle + (2 * PI) / 3) * radius;
      vertex(vertx, verty, vertz());
      vertx =
        x +
        (cos(angle + (2 * PI) / 3) * radius) / 2 +
        (cos(angle + PI / 3) * radius) / 2;
      verty =
        y +
        (sin(angle + (2 * PI) / 3) * radius) / 2 +
        (sin(angle + PI / 3) * radius) / 2;
      vertex(vertx, verty, vertz());
      endShape();

      beginShape();
      vertx = x + (cos(angle + (2 * PI) / 3) * radius) / 2;
      verty = y + (sin(angle + (2 * PI) / 3) * radius) / 2;
      vertex(vertx, verty, vertz());
      vertx =
        x +
        (cos(angle + (2 * PI) / 3) * radius) / 2 +
        (cos(angle + PI / 3) * radius) / 2;
      verty =
        y +
        (sin(angle + (2 * PI) / 3) * radius) / 2 +
        (sin(angle + PI / 3) * radius) / 2;
      vertex(vertx, verty, vertz());
      vertx = x + (cos(angle + PI / 3) * radius) / 2;
      verty = y + (sin(angle + PI / 3) * radius) / 2;
      vertex(vertx, verty, vertz());
      endShape();

      beginShape();
      vertx =
        x +
        (cos(angle + (2 * PI) / 3) * radius) / 2 +
        (cos(angle + PI / 3) * radius) / 2;
      verty =
        y +
        (sin(angle + (2 * PI) / 3) * radius) / 2 +
        (sin(angle + PI / 3) * radius) / 2;
      vertex(vertx, verty, vertz());
      vertx = x + (cos(angle + PI / 3) * radius) / 2;
      verty = y + (sin(angle + PI / 3) * radius) / 2;
      vertex(vertx, verty, vertz());
      vertx = x + cos(angle + PI / 3) * radius;
      verty = y + sin(angle + PI / 3) * radius;
      vertex(vertx, verty, vertz());
      endShape();
    }

    for (let a = 0; a < TWO_PI; a += PI / 3) {
      subdivide(hex, 3, hex.x(), hex.y(), a + PI / 2, hexRadius);
    }
  });
}

// function keyPressed() {
//   if (key === "ArrowLeft") {
//     rotationZ -= PI/12
//   }
//   if (key === "ArrowRight") {
//     rotationZ += PI/12
//   }
//   redraw();
// }

function inputLoop() {
  setTimeout(() => {
    if (keyIsDown(LEFT_ARROW)) {
      rotationZ -= PI / 24;
      redraw();
    } else if (keyIsDown(RIGHT_ARROW)) {
      rotationZ += PI / 24;
      redraw();
    }
    inputLoop();
  }, 100);
}
inputLoop();
