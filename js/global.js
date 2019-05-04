// Utility functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFromRange(min, max) {
  return Math.random() * (max - min) + min;
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function removeItemFromArr(arr, item) {
    let i = arr.indexOf(item);
    i !== -1 && arr.splice(i, 1);
};


/*
let mouse = {
  x: canvasBackground.width / 2,
  y: canvasBackground.height / 2
}
// EventListener
window.addEventListener('mousemove', function(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
})
*/


