let particles = [],
    c = 0,
    mouse,
    minDist,
    WIDTH,
    HEIGHT,
    n;

// Initial velocity
const minVel = 1,
    maxVel = 2,
    minR = 3,
    maxR = 5,
    boomStrength = 20,
    background = "#000",
    particleColor = "#fff";

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
    minDist = constrain(scale(WIDTH, 480, 1920, 100, 300), 100, 300);
    n = constrain(scale(WIDTH, 480, 1920, 400, 1000), 400, 1000);
    console.log(n);
    mouse = new Vector(WIDTH / 2, HEIGHT / 2);

    canvas.setAttribute("width", WIDTH);
    canvas.setAttribute("height", HEIGHT);

    for (let i = 0; i < n; i++) {
        const pos = new Vector(random(WIDTH), random(HEIGHT));
        const vel = Vector.random().setMag(random(minVel, maxVel));
        particles.push(new Particle(pos, vel, Math.floor(random(minR, maxR)), particleColor));
    }

    //
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("click", boom);

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.beginPath();
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.closePath();

    ani();
}

function ani() {
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for (const p of particles) {
        // Get distance to mouse
        if (mouse) {
            const dist = Vector.dist(p.pos, mouse);
            if (dist < minDist) {
                p.applyForce(Vector.sub(p.pos, mouse).setMag(scale(dist, 0, minDist, 0.2, 0.4)));
            }
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
        const dir = Vector.sub(p.pos, mouse).setMag(boomStrength);
        p.applyForce(dir);
    }
}

function handleMouseMove(e) {
    if (c % 10 === 0) {
        mouse.set(e.clientX, e.clientY);
    }
    c++;
}

function handleTouchMove(e) {
    if (c % 10 === 0) {
        const { clientX: x, clientY: y } = e.touches[e.touches.length - 1];
        mouse.set(x, y);
    }
}

init();
