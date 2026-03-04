const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
//sky 
ctx.fillStyle = "blue";
ctx.fillRect(0,0, canvas.width, canvas.height);
//ground
ctx.fillStyle = "green";
ctx.fillRect(0,280, canvas.width, 120);
// Sun
ctx.beginPath();
ctx.arc(480, 60, 40, 0, Math.PI * 2); // full circle
ctx.fillStyle = "yellow";
ctx.fill();
ctx.stroke();

// main body
ctx.fillStyle = "red";
ctx.fillRect(200, 170, 200, 140);
ctx.strokeRect(200, 170, 200, 140);

// 6) Roof
ctx.beginPath();
ctx.moveTo(190, 170);
ctx.lineTo(300, 90);
ctx.lineTo(410, 170);
ctx.closePath();
ctx.fillStyle = "brown";
ctx.fill();
ctx.stroke();

//Door
ctx.fillStyle = "brown";
ctx.fillRect(285, 230, 40, 80);
ctx.strokeRect(285, 230, 40, 80);

// Window
ctx.fillStyle = "white";
ctx.fillRect(225, 210, 40, 40);
ctx.fillRect(335, 210, 40, 40);
ctx.strokeRect(225, 210, 40, 40);
ctx.strokeRect(335, 210, 40, 40);

//filler caption for assignment
ctx.fillStyle = "black";
ctx.font = "18px Arial";
ctx.fillText("David's Cartoon", 200, 30);

//translate
for (let i = 0; i < 11; i++) {
    ctx.save();
    ctx.translate(i * 55, 300);
    
    // Fence post
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 10, 30);
    ctx.strokeRect(0, 0, 10, 30);
    
    ctx.restore();
}

// Horizontal rail across all posts
ctx.fillStyle = "white";
ctx.fillRect(0, 268, canvas.width, 5);

