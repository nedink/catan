function preload() {
  // opensans = loadFont("https://fonts.googleapis.com/css?family=Open+Sans");
}

let zoom = innerHeight / 50;
let gutter = 0.3;
let hexRadius = 6;

function edgeRadius(radius) {
  return (radius * Math.sqrt(3)) / 2;
}

// BOARD --------------------------------------------------------

const board = {
  hexes: [
    {
      aoff: (4 * Math.PI) / 3,
      roff: 2,
      vertices: [2, 3, 11, 10, 9, 1]
    },
    {
      aoff: (3 * Math.PI) / 2,
      roff: edgeRadius(2),
      vertices: [4, 5, 13, 12, 11, 3]
    },
    {
      aoff: (5 * Math.PI) / 3,
      roff: 2,
      vertices: [6, 7, 15, 14, 13, 5]
    },
    {
      aoff: (7 * Math.PI) / 6,
      roff: edgeRadius(2),
      vertices: [9, 10, 20, 19, 18, 8]
    },
    {
      aoff: (4 * Math.PI) / 3,
      roff: 1,
      vertices: [11, 12, 22, 21, 20, 10]
    },
    {
      aoff: (5 * Math.PI) / 3,
      roff: 1,
      vertices: [13, 14, 24, 23, 22, 12]
    },
    {
      aoff: (11 * Math.PI) / 6,
      roff: edgeRadius(2),
      vertices: [15, 16, 26, 25, 24, 14]
    },
    {
      aoff: Math.PI,
      roff: 2,
      vertices: [18, 19, 30, 29, 28, 17]
    },
    {
      aoff: Math.PI,
      roff: 1,
      vertices: [20, 21, 32, 31, 30, 19]
    },
    {
      aoff: 0,
      roff: 0,
      vertices: [22, 23, 34, 33, 32, 21]
    },
    {
      aoff: 0,
      roff: 1,
      vertices: [24, 25, 36, 35, 34, 23]
    },
    {
      aoff: 0,
      roff: 2,
      vertices: [26, 27, 38, 37, 36, 25]
    },
    {
      aoff: (5 * Math.PI) / 6,
      roff: edgeRadius(2),
      vertices: [30, 31, 41, 40, 39, 29]
    },
    {
      aoff: (2 * Math.PI) / 3,
      roff: 1,
      vertices: [32, 33, 43, 42, 41, 31]
    },
    {
      aoff: Math.PI / 3,
      roff: 1,
      vertices: [34, 35, 45, 44, 43, 33]
    },
    {
      aoff: Math.PI / 6,
      roff: edgeRadius(2),
      vertices: [36, 37, 47, 46, 45, 35]
    },
    {
      aoff: (2 * Math.PI) / 3,
      roff: 2,
      vertices: [41, 42, 50, 49, 48, 40]
    },
    {
      aoff: Math.PI / 2,
      roff: edgeRadius(2),
      vertices: [43, 44, 52, 51, 50, 42]
    },
    {
      aoff: Math.PI / 3,
      roff: 2,
      vertices: [45, 46, 54, 53, 52, 44]
    }
  ]
};

board.hexes.forEach((hex, hi) => {
  hex.x = function() {
    return cos(this.aoff) * this.roff * edgeRadius(hexRadius) * 2;
  };
  hex.y = function() {
    return sin(this.aoff) * this.roff * edgeRadius(hexRadius) * 2;
  };
  // subdivide into 6 triangles
  // for each triangle, subdivide twice
  hex.surface = [
    {
      a: 0,
      r: 0
    },
    {
      a: 0,
      r: 1
    },
    {
      a: Math.PI / 3,
      r: 1
    },
    {
      a: (2 * Math.PI) / 3,
      r: 1
    },
    {
      a: Math.PI,
      r: 1
    },
    {
      a: (4 * Math.PI) / 3,
      r: 1
    },
    {
      a: (5 * Math.PI) / 3,
      r: 1
    }
  ];
  for (const triangle of hex.surface) {
    // triangle.subds = [
    //   {
    //     a: 
    //   }
    // ]
  }
});


// --------------------------------------------------------

const colors = {};
function setColors() {
  colors.desert = color(255, 238, 160);
  colors.wood = color(87, 126, 108);
  colors.brick = color(198, 99, 79);
  colors.wheat = color(255, 222, 67);
  colors.sheep = color(144, 207, 124);
  colors.ore = color(107, 96, 124);

  colors.desertDark = color(162, 148, 90);
  colors.woodDark = color(63, 83, 78);
  colors.brickDark = color(119, 61, 61);
  colors.wheatDark = color(162, 135, 78);
  colors.sheepDark = color(98, 128, 97);
  colors.oreDark = color(70, 63, 82);

  colors.woodLight = color(124, 181, 155);
  colors.brickLight = color(244, 160, 144);
  colors.oreLight = color(154, 135, 183);

  colors.player1 = color(224, 26, 26);
  colors.player2 = color(247, 151, 8);
  colors.player3 = color(255, 255, 255);
  colors.player4 = color(31, 84, 255);
}

const resources = [];
for (let i = 0; i < 4; ++i) {
  if (i < 1) resources.push("desert");
  if (i < 3) resources.push("brick") && resources.push("ore");
  resources.push("wood") && resources.push("sheep") && resources.push("wheat");
}

const rolls = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];
