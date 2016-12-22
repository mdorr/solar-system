const degToRad = function (deg) {
  return deg * (Math.PI / 180);
}

const radToDeg = function (rad) {
  return rad * (180 / Math.PI);
}

const auToUnits = function (au) {
  return au * 149597.8707;
}

const minorAxis = function (majorAxis, eccentricity) {
  return majorAxis * Math.sqrt(1 - Math.pow(eccentricity, 2));
}

module.exports = {
  degToRad: degToRad,
  radToDeg: radToDeg,
  auToUnits: auToUnits,
  minorAxis: minorAxis,
};
