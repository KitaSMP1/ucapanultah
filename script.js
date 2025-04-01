window.addEventListener("resize", resizeCanvas, false);
window.addEventListener("DOMContentLoaded", function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    resizeCanvas();
});

document.getElementById("openLetter").addEventListener("click", function () {
    document.getElementById("letterContainer").style.display = "none"; 
    document.getElementById("messageContainer").style.display = "flex"; 

    let bgMusic = document.getElementById("bgMusic");
    bgMusic.volume = 1.0; 
    bgMusic.play().catch(error => console.log("Autoplay dicegah: ", error)); 

    startFireworks(); 
});

window.requestAnimationFrame = 
    window.requestAnimationFrame || 
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

var canvas, ctx, w, h, particles = [],
    probability = 0.04,
    xPoint, yPoint;

function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

function startFireworks() {
    window.requestAnimationFrame(updateWorld);
}

function updateWorld() {
    update();
    paint();
    window.requestAnimationFrame(updateWorld);
}

function update() {
    if (particles.length < 500 && Math.random() < probability) {
        createFirework();
    }
    var alive = [];
    for (var i = 0; i < particles.length; i++) {
        if (particles[i].move()) {
            alive.push(particles[i]);
        }
    }
    particles = alive;
}

function paint() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    for (var i = 0; i < particles.length; i++) {
        particles[i].draw(ctx);
    }
}

function createFirework() {
    xPoint = Math.random() * (w - 200) + 100;
    yPoint = Math.random() * (h - 200) + 100;
    var nFire = Math.random() * 50 + 100;
    var c = "rgb(" + (~~(Math.random() * 200 + 55)) + ","
        + (~~(Math.random() * 200 + 55)) + "," + (~~(Math.random() * 200 + 55)) + ")";
    for (var i = 0; i < nFire; i++) {
        var particle = new Particle();
        particle.color = c;
        particles.push(particle);
    }
}

function Particle() {
    this.w = this.h = Math.random() * 4 + 1;
    this.x = xPoint - this.w / 2;
    this.y = yPoint - this.h / 2;
    this.vx = (Math.random() - 0.5) * 10;
    this.vy = (Math.random() - 0.5) * 10;
    this.alpha = Math.random() * .5 + .5;
    this.color;
}

Particle.prototype.move = function () {
    this.x += this.vx;
    this.vy += 0.05;
    this.y += this.vy;
    this.alpha -= 0.01;
    return this.alpha > 0;
};

Particle.prototype.draw = function (c) {
    c.globalAlpha = this.alpha;
    c.fillStyle = this.color;
    c.beginPath();
    c.arc(this.x, this.y, this.w, 0, Math.PI * 2);
    c.fill();
};
