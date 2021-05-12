let particles = [],
    WIDTH,
    HEIGHT;

const n = 150,
    minVel = 2,
    maxVel = 4;

const canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

function init() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    canvas.setAttribute("width", WIDTH);
    canvas.setAttribute("height", HEIGHT);

    for (let i = 0; i < n; i++) {
        const pos = new Vector(random(WIDTH), random(HEIGHT));
        const vel = Vector.random().setMag(random(minVel, maxVel));
        particles.push(new Particle(pos, vel));
    }

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.closePath();

    ani();
}

function ani() {
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for (const p of particles) {
        p.update();
        p.borders(1);
        p.show();
    }

    requestAnimationFrame(ani);
}

init();
