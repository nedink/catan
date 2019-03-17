function makeGaussian(amplitude, x0, y0, sigmaX, sigmaY) {
  return function(amplitude, x0, y0, sigmaX, sigmaY, x, y) {
    var exponent = -(
      Math.pow(x - x0, 2) / (2 * Math.pow(sigmaX, 2)) +
      Math.pow(y - y0, 2) / (2 * Math.pow(sigmaY, 2))
    );
    return amplitude * Math.pow(Math.E, exponent);
  }.bind(null, amplitude, x0, y0, sigmaX, sigmaY);
}

// USAGE
var gaussian = makeGaussian(1, 0, 0, length / 6, 1);
