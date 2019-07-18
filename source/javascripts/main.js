import Vector2 from './vector2';
import ConfettiCannon from './confettiCannon';

var getElementCenterVector = function(element) {
  var rect = element.getBoundingClientRect();
  return new Vector2(
    rect.left + (rect.width  / 2),
    rect.top  + (rect.height / 2),
  );
};

var containerElement = document.querySelector('.container');
var triggerElement = document.querySelector('.triggerButton');

var confettiCannon = new ConfettiCannon({
  parentElement: containerElement,
  resolutionMultiplier: 2,

  colorChoices: ['#80EAFF', '#FF0055', '#00FFAA', '#FFFF00'],
  widthRange: [2, 10],
  heightRange: [2, 10],
  lifeSpanRange: [100, 250],

  // Cannon Settings
  firePosition: getElementCenterVector(triggerElement),
  numberOfConfetti: 500,

  delay: 200,
  // angle: Math.PI,
  // angle: Math.PI + Math.PI / 4,
  angle: 3 * Math.PI / 2,
  // angle: Math.PI * 2 - Math.PI / 4,
  // angle: 0,
  blastArc: Math.PI / 3,

  // Power Ranger
  powerRange: [10, 50],

  gravity: 1,
  // Please don't set this higher or equal to gravity value.
  frictionCoefficient: 0.9,
  // Keep this zero.
  dragCoefficient: 0,

  // Simplex lateral entropy settings.
  simplexZoomMultiplierRange: [80, 120],
  simplexOffsetMultiplier: 100,

  beforeFire: function() {
    triggerElement.classList.add('triggerButton--disabled');
    triggerElement.textContent = 'Steady...';
  },
  onFire: function() {
    triggerElement.textContent = 'Reloading...';
  },
  onComplete: function() {
    triggerElement.classList.remove('triggerButton--disabled');
    triggerElement.textContent = 'Fire!';
  },
});

triggerElement.addEventListener('click', function() {
  confettiCannon.fire();
}.bind(this));

window.addEventListener('resize', function() {
  confettiCannon.config.firePosition.equals(getElementCenterVector(triggerElement));
}.bind(this));