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

let rotationX = Math.PI/4;
let rotationZ = 0;

function draw() {
  background(0);

  scale(zoom);

  translate(0, -7, 0);
  rotateX(rotationX);
  rotateZ(rotationZ);
  // directionalLight(255, 255, 255, 0, 0, 0.5);
  // pointLight(255, 255, 255, 10, 10, 10);

  // ambientLight(255);
  // ambientMaterial(255);
  // sphere(0);

  // pointLight(255, 255, 255, 0, 0, 0);

  // pointLight(255, 255, 255, 10, 10, 10);

  board.hexes.forEach(hex => {
    const c = colors[hex.resource];
    // fill(
    //   `hsb(${parseInt(c.h)}, ${parseInt(c.s)}%, ${parseInt(c.v) *
    //     random(0.9, 1.1)}%)`
    // );
    fill(c.color);
    noStroke();

    function subdivide(hex, divisions, x, y, angle, radius, division) {
      if (!division) division = 1;

      if (division < divisions) {
        subdivide(hex, divisions, x, y, angle, radius / 2, division + 1);
        subdivide(
          hex,
          divisions,
          x + (cos(angle + (2 * PI) / 3) * radius) / 2,
          y + (sin(angle + (2 * PI) / 3) * radius) / 2,
          angle,
          radius / 2,
          division + 1
        );
        subdivide(
          hex,
          divisions,
          x + (cos(angle + PI / 3) * radius) / 2,
          y + (sin(angle + PI / 3) * radius) / 2,
          angle,
          radius / 2,
          division + 1
        );
        subdivide(
          hex,
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

      let vert1, vert2, vert3;
      function vertavg() {
        return createVector(
          (vert1.x + vert2.x + vert3.x) / 3,
          (vert1.y, vert2.y, vert3.y) / 3
        );
      }
      function vertz(vert) {
        let gaussian = makeGaussian(5, 0, 0, 3, 1);
        
        // console.log(p5.Vector.dist(hex.pos(), vertavg()));
        // console.log(vertavg().dist(hex.pos()))
        // console.log(dist(hex.pos().x, hex.pos().y, vertavg().x, vertavg().y))
        // console.log(hex.x())
        
        switch (hex.resource) {
          //         colors.desert = {color: color(255, 238, 160)}
          // colors.wood = {color: color(87, 126, 108)}
          // colors.brick = {color: color(198, 99, 79)}
          // colors.wheat = {color: color(255, 222, 67)}
          // colors.sheep = {color: color(144, 207, 124)}
          // colors.ore = {color: color(107, 96, 124)}
          case "desert":
            gaussian = makeGaussian(3, 0, 0, 3, 1);
            return (
              gaussian(hex.pos().dist(vert), 0) *
              noise(100 + vert.x * 0.5, 100 + vert.y * 0.5)
            );
          case "wood":
            gaussian = makeGaussian(2, 0, 0, 3, 2);
            return (
              gaussian(hex.pos().dist(vert), 0) *
              noise(100 + vert.x, 100 + vert.y) *
              2
            );
          case "brick":
            gaussian = makeGaussian(3, 0, 0, 4, 2);
            return (
              gaussian(hex.pos().dist(vert), 0) *
              noise(100 + vert.x * 0.1, 100 + vert.y * 0.1)
            );
          case "wheat":
            gaussian = makeGaussian(3, 0, 0, 4, 2);
            return gaussian(hex.pos().dist(vert), 0) - 0.5;
          case "sheep":
            gaussian = makeGaussian(3, 0, 0, 4, 2);
            return gaussian(hex.pos().dist(vert), 0) - 0.5;
          case "ore":
            gaussian = makeGaussian(10, 0, 0, 3, 2);
            return (
              gaussian(hex.pos().dist(vert), 0) *
                noise(100 + vert.x, 100 + vert.y) -
              0.25
            );
          default:
            return gaussian(hex.pos().dist(vert), 1);
        }
      }
      function radialFill(vert) {
        // stroke(255)
        // strokeWeight(3)
        // point(vert.x, vert.y, 4);
        // fill(
        //   `hsb(${parseInt(c.h)}, ${parseInt(c.s)}%, ${c.v  + 10 - abs(hex.pos().dist(vert)) * 2}%)`
        // );
      }

      vert1 = createVector(x, y);
      vert2 = createVector(
        x + (cos(angle + (2 * PI) / 3) * radius) / 2,
        y + (sin(angle + (2 * PI) / 3) * radius) / 2
      );
      vert3 = createVector(
        x + (cos(angle + PI / 3) * radius) / 2,
        y + (sin(angle + PI / 3) * radius) / 2
      );
      radialFill(vertavg())
      beginShape(TRIANGLES);
      vertex(vert1.x, vert1.y, vertz(vert1));
      vertex(vert2.x, vert2.y, vertz(vert2));
      vertex(vert3.x, vert3.y, vertz(vert3));
      endShape(CLOSE);

      // fill(
      //   `hsb(${parseInt(c.h)}, ${parseInt(c.s)}%, ${parseInt(c.v) *
      //     random(0.9, 1.1)}%)`
      // );
      vert1 = createVector(
        x + (cos(angle + (2 * PI) / 3) * radius) / 2,
        y + (sin(angle + (2 * PI) / 3) * radius) / 2
      );
      vert2 = createVector(
        x + cos(angle + (2 * PI) / 3) * radius,
        y + sin(angle + (2 * PI) / 3) * radius
      );
      vert3 = createVector(
        x +
          (cos(angle + (2 * PI) / 3) * radius) / 2 +
          (cos(angle + PI / 3) * radius) / 2,
        y +
          (sin(angle + (2 * PI) / 3) * radius) / 2 +
          (sin(angle + PI / 3) * radius) / 2
      );
      radialFill(vertavg());
      beginShape(TRIANGLES);
      vertex(vert1.x, vert1.y, vertz(vert1));
      vertex(vert2.x, vert2.y, vertz(vert2));
      vertex(vert3.x, vert3.y, vertz(vert3));
      endShape(CLOSE);

      // fill(
      //   `hsb(${parseInt(c.h)}, ${parseInt(c.s)}%, ${parseInt(c.v) *
      //     random(0.9, 1.1)}%)`
      // );
      vert1 = createVector(
        x + (cos(angle + (2 * PI) / 3) * radius) / 2,
        y + (sin(angle + (2 * PI) / 3) * radius) / 2
      );
      vert2 = createVector(
        x +
          (cos(angle + (2 * PI) / 3) * radius) / 2 +
          (cos(angle + PI / 3) * radius) / 2,
        y +
          (sin(angle + (2 * PI) / 3) * radius) / 2 +
          (sin(angle + PI / 3) * radius) / 2
      );
      vert3 = createVector(
        x + (cos(angle + PI / 3) * radius) / 2,
        y + (sin(angle + PI / 3) * radius) / 2
      );
      radialFill(vertavg());
      beginShape(TRIANGLES);
      vertex(vert1.x, vert1.y, vertz(vert1));
      vertex(vert2.x, vert2.y, vertz(vert2));
      vertex(vert3.x, vert3.y, vertz(vert3));
      endShape(CLOSE);

      // fill(
      //   `hsb(${parseInt(c.h)}, ${parseInt(c.s)}%, ${parseInt(c.v) *
      //     random(0.9, 1.1)}%)`
      // );
      vert1 = createVector(
        x +
          (cos(angle + (2 * PI) / 3) * radius) / 2 +
          (cos(angle + PI / 3) * radius) / 2,
        y +
          (sin(angle + (2 * PI) / 3) * radius) / 2 +
          (sin(angle + PI / 3) * radius) / 2
      );
      vert2 = createVector(
        x + (cos(angle + PI / 3) * radius) / 2,
        y + (sin(angle + PI / 3) * radius) / 2
      );
      vert3 = createVector(
        x + cos(angle + PI / 3) * radius,
        y + sin(angle + PI / 3) * radius
      );
      radialFill(vertavg());
      beginShape(TRIANGLES);
      vertex(vert1.x, vert1.y, vertz(vert1));
      vertex(vert2.x, vert2.y, vertz(vert2));
      vertex(vert3.x, vert3.y, vertz(vert3));
      endShape(CLOSE);
    }

    for (let a = 0; a < TWO_PI; a += PI / 3) {
      subdivide(hex, 2, hex.x(), hex.y(), a + PI / 2, hexRadius);
    }
  });
}

function inputLoop() {
  setTimeout(() => {
    if (keyIsDown(DOWN_ARROW)) {
      rotationX -= PI / 24;
      redraw();
    } else if (keyIsDown(UP_ARROW)) {
      rotationX += PI / 24;
      redraw();
    }
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
