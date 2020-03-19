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
