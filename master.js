let particles = [],
    c = 0,
    mouse = new Vector(-100, -100),
    WIDTH,
    HEIGHT,
    n;

// Initial velocity
const minVel = 1,
    maxVel = 2,
    minR = 3,
    maxR = 5,
    minDist = 300,
    color = "#f00";

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
    n = Math.round(WIDTH / 2);
    console.log(n);

    canvas.setAttribute("width", WIDTH);
    canvas.setAttribute("height", HEIGHT);

    for (let i = 0; i < n; i++) {
        const pos = new Vector(random(WIDTH), random(HEIGHT));
        const vel = Vector.random().setMag(random(minVel, maxVel));
        particles.push(new Particle(pos, vel, Math.floor(random(minR, maxR))));
    }

    window.onmousemove = e => {
        if (c % 10 === 0) {
            mouse.set(e.clientX, e.clientY);
        }
        c++;
    };

    canvas.addEventListener("click", boom);

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
        // Get distance to mouse
        const dist = Vector.dist(p.pos, mouse);
        if (dist < minDist) {
            p.applyForce(Vector.sub(p.pos, mouse).setMag(scale(dist, 0, minDist, 0.2, 0.4)));
        }
        // Add drag
        p.vel.setMag(p.vel.mag() * 0.99);
        p.update();
        const val = constrain(scale(p.vel.m, 0, 10, 0, 1), 0, 1);
        const rgb = HSVtoRGB(0, 0, val).map(el => Math.floor(el));
        p.c = rgbToHex(...rgb);
        p.borders(1);
        p.show();
    }

    requestAnimationFrame(ani);
}

function boom() {
    for (const p of particles) {
        const dir = Vector.sub(p.pos, mouse).setMag(20);
        p.applyForce(dir);
    }
}

init();
