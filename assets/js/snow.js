const canvas = document.getElementById("snow-canvas");
const ctx = canvas.getContext("2d");

let width, height;
let snowflakes = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/* Create snowflakes */
function createSnowflakes(count = 150) {
  snowflakes = [];
  for (let i = 0; i < count; i++) {
    snowflakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1,
      speed: Math.random() * 1 + 0.5,
      wind: Math.random() * 0.5 - 0.25,
      opacity: Math.random() * 0.6 + 0.4,
    });
  }
}
createSnowflakes();

/* Draw snow */
function drawSnowflakes() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "white";

  snowflakes.forEach(flake => {
    ctx.beginPath();
    ctx.globalAlpha = flake.opacity;
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.globalAlpha = 1;
}

/* Update snow */
function updateSnowflakes() {
  snowflakes.forEach(flake => {
    flake.y += flake.speed;
    flake.x += flake.wind;

    if (flake.y > height) {
      flake.y = -flake.radius;
      flake.x = Math.random() * width;
    }

    if (flake.x > width || flake.x < 0) {
      flake.x = Math.random() * width;
    }
  });
}

/* Animate */
function animateSnow() {
  drawSnowflakes();
  updateSnowflakes();
  requestAnimationFrame(animateSnow);
}

animateSnow();
    