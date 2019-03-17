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
  background(0);

  translate(0, -zoom * 5, 0);

  scale(zoom);

  rotateX(PI / 3);

  ambientLight(255);
  ambientMaterial(255);
  sphere(0);

  pointLight(255, 255, 255, 0, 0, 0);

  board.hexes.forEach(hex => {
    const c = colors[hex.resource];
    ambientMaterial(c);
    noStroke();

    // beginShape();
    // for (let i = 0; i < 6; ++i) {
    //   vertex(
    //     hex.x() + cos((PI / 3) * i + PI / 2) * hexRadius,
    //     hex.y() + sin((PI / 3) * i + PI / 2) * hexRadius,
    //     0
    //   );
    // }
    // endShape(CLOSE);

    stroke(255);

    function subdivide(divisions, x, y, angle, radius, division) {
      if (!division) division = 1;
      // console.log(division)
      if (division >= divisions) {
        beginShape();
        // console.log("x: " + x, "y: " + y);
        vertex(x, y);
        vertex(
          x + (cos(angle + (2 * PI) / 3) * radius) / 2,
          y + (sin(angle + (2 * PI) / 3) * radius) / 2
        );
        vertex(
          x + (cos(angle + PI / 3) * radius) / 2,
          y + (sin(angle + PI / 3) * radius) / 2
        );
        endShape();

        beginShape();
        vertex(
          x + (cos(angle + (2 * PI) / 3) * radius) / 2,
          y + (sin(angle + (2 * PI) / 3) * radius) / 2
        );
        vertex(
          x + cos(angle + (2 * PI) / 3) * radius,
          y + sin(angle + (2 * PI) / 3) * radius
        );
        vertex(
          x +
            (cos(angle + (2 * PI) / 3) * radius) / 2 +
            (cos(angle + PI / 3) * radius) / 2,
          y +
            (sin(angle + (2 * PI) / 3) * radius) / 2 +
            (sin(angle + PI / 3) * radius) / 2
        );
        endShape();

        beginShape();
        vertex(
          x + (cos(angle + (2 * PI) / 3) * radius) / 2,
          y + (sin(angle + (2 * PI) / 3) * radius) / 2
        );
        vertex(
          x +
            (cos(angle + (2 * PI) / 3) * radius) / 2 +
            (cos(angle + PI / 3) * radius) / 2,
          y +
            (sin(angle + (2 * PI) / 3) * radius) / 2 +
            (sin(angle + PI / 3) * radius) / 2
        );
        vertex(
          x + (cos(angle + PI / 3) * radius) / 2,
          y + (sin(angle + PI / 3) * radius) / 2
        );
        endShape();

        beginShape();
        vertex(
          x +
            (cos(angle + (2 * PI) / 3) * radius) / 2 +
            (cos(angle + PI / 3) * radius) / 2,
          y +
            (sin(angle + (2 * PI) / 3) * radius) / 2 +
            (sin(angle + PI / 3) * radius) / 2
        );
        vertex(
          x + (cos(angle + PI / 3) * radius) / 2,
          y + (sin(angle + PI / 3) * radius) / 2
        );
        vertex(
          x + cos(angle + PI / 3) * radius,
          y + sin(angle + PI / 3) * radius
        );
        endShape();
        return;
      }
      subdivide(divisions, x, y, angle, radius / 2, division + 1);
      subdivide(
        divisions,
        x + (cos(angle + (2 * PI) / 3) * radius) / 2,
        y + (sin(angle + (2 * PI) / 3) * radius) / 2,
        angle,
        radius / 2,
        division + 1
      );
      subdivide(
        divisions,
        x + (cos(angle + PI / 3) * radius) / 2,
        y + (sin(angle + PI / 3) * radius) / 2,
        angle,
        radius / 2,
        division + 1
      );
      subdivide(
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
    }

    for (let a = 0; a < TWO_PI; a += PI / 3) {
      subdivide(3, hex.x(), hex.y(), a + PI / 2, hexRadius);
    }
  });

  const gaussian = makeGaussian(1, 0, 0, 1, 1);
  for (let i = -4; i < 4; i += 0.5) console.log(gaussian(i, 0));
}

// ---------------------------

function draw() {}
