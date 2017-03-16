var enola = document.getElementById('enola');
var next = document.getElementById('next');
var half = document.getElementById('halfspeed');
var double = document.getElementById('doublespeed');
var text = document.getElementById('text');
var stage = 0;
var stages = [
  time => type('Hello! Welcome to this interactive presentation about the Enola Gay.', time),
  time => type('The Enola Gay was the first plane to drop a nuclear bomb.', time),
  time => typeMovePlane('It was launched.', '40%', '50%', -30, time)
];
var speed = 1;
next.addEventListener('click', () => {
  stages[stage++](speed);
  if (stage >= stages.length) {
    next.disabled = true;
  }
});
half.addEventListener('click', () => speed *= 2);
double.addEventListener('click', () => speed /= 2);
function type(txt, time) {
  text.innerHTML = '';
  text.innerText = '';
  TweenMax.to(text, time, {text: txt, ease: Linear.easeNone});
}
function movePlane(x, y, rotate, time) {
  if (typeof time !== 'undefined') {
    TweenMax.to(enola, time / 4, {rotation: rotate, onComplete: function () {
      TweenMax.to(enola, time * 3 / 4, {left: x, top: y});
    }})
  } else {
    TweenMax.to(enola, rotate, {left: x, top: y});
  }
}
function typeMovePlane(txt, x, y, rotate, time) {
  if (typeof time === 'undefined') {
    time = rotate;
    type(txt, time);
    movePlane(x, y, time);
  } else {
    type(txt, time);
    movePlane(x, y, rotate, time);
  }
}