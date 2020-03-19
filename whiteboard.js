const socket = io();
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let positionArr = [];
function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;
  positionArr.push([x,y]);
  // console.log("x: " + x + " y: " + y)
}
function mouseMove (event){
  getCursorPosition(canvas, event);
  setTimeout(100);
}
canvas.addEventListener('mousedown', (e) => {
  canvas.addEventListener("mousemove", mouseMove)
})

canvas.addEventListener('mouseup', (e) => {
  canvas.removeEventListener("mousemove", mouseMove);
  console.log(positionArr);
  ctx.beginPath();
  for (let i = 0; i < positionArr.length; i++) {
    const position = positionArr[i];
    if (i === 0) {
      ctx.moveTo(position[0], position[1]);
    }
    else {
      ctx.lineTo(position[0],position[1]);
    }
  }
  ctx.stroke();
  ctx.closePath();
  socket.emit("position", positionArr);
  positionArr = [];
})

socket.on("update", data => {
  ctx.beginPath();
  for (let i = 0; i < data.length; i++) {
    const position = data[i];
    if (i === 0) {
      ctx.moveTo(position[0], position[1]);
    }
    else {
      ctx.lineTo(position[0],position[1]);
    }
  }
  ctx.stroke();
  ctx.closePath();
})
// When true, moving the mouse draws on the canvas
// let isDrawing = false;
// let x = 0;
// let y = 0;

// // const myPics = document.getElementById('myPics');
// // const context = myPics.getContext('2d');

// // The x and y offset of the canvas from the edge of the page
// // const rect = canvas.getBoundingClientRect();
// // function  getMousePos(canvas, evt) {
// //   var rect = canvas.getBoundingClientRect(), // abs. size of element
// //       scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
// //       scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

// //   return {
// //     x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
// //     y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
// //   }
// // }
// // Add the event listeners for mousedown, mousemove, and mouseup
// canvas.addEventListener('mousedown', e => {
//   x = e.clientX - rect.left;
//   y = e.clientY - rect.top;
//   isDrawing = true;
// });

// canvas.addEventListener('mousemove', e => {
//   if (isDrawing === true) {
//     drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
//     x = e.clientX - rect.left;
//     y = e.clientY - rect.top;
//   }
// });

// window.addEventListener('mouseup', e => {
//   if (isDrawing === true) {
//     drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
//     x = 0;
//     y = 0;
//     isDrawing = false;
//   }
// });

// function drawLine(context, x1, y1, x2, y2) {
//   context.beginPath();
//   context.strokeStyle = 'black';
//   context.lineWidth = 1;
//   context.moveTo(x1, y1);
//   context.lineTo(x2, y2);
//   context.stroke();
//   context.closePath();
// }