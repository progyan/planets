let colors = ['#FABC3C', '#94F489', '#9D6E1E', '#00B9FF', '#F8605C', '#BFA5A2', '#FFB7AC', '#00C2A8', '#3596B5', '#777777'];
let xs = [630, 630, 630, 630, 630, 630, 630, 630, 630, 630];
let ys = [310, 470, 390, 430, 510, 560, 640, 700, 750, 800];
let rads = [50, 11, 5, 9, 6, 35, 25, 20, 15, 3];
let vels = [0, 0.012, 0.02, 0.018, 0.014, 0.008, 0.006, 0.004, 0.002, 0.001];
let osb = ['', 's 1', '', '', 's 2', 'r 6', 'r 4', 'r 2', 'r', ''];
let gravityFunc = (radius) => {
    if(radius == 50) return 1000000;
    let grav = 1;
    return Math.pow(radius, 3) * grav;
};
let planets = [];

class Planet {
    constructor(color, x, y, rad, dist, angVel, osb){
        this.color = color;
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.gravity = gravityFunc(rad);
        if(rad == 50)
            this.pos = 0;
        else
            this.pos = Math.random() * 8;
        this.dist = dist;
        this.angVel = angVel; 
        this.osb = osb;
        this.sPos = [];
        this.sB = [];
        this.sX = [];
        this.sY = [];
        for(let i = 0; i < 10; i++){
            this.sPos[i] = Math.random();
            this.sX[i] = Math.random();
            this.sY[i] = Math.random();
            this.sB[i] = Math.random() + 0.5;
        }
    }

    draw(){
        this.drawOsb();
        this.drawPath();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawOsb(){
        if(this.osb == 'r'){
            ctx.fillStyle = this.color + '88';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.rad * 1.4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = '#141922';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.rad * 1.2, 0, 2 * Math.PI);
            ctx.fill();
        } else if(this.osb == 's 1'){
            ctx.fillStyle = 'grey';
            ctx.beginPath();
            ctx.arc(this.sX[0], this.sY[0], 3, 0, 2 * Math.PI);
            ctx.fill();
        } else if(this.osb == 's 2'){
            ctx.fillStyle = 'grey';
            ctx.beginPath();
            ctx.arc(this.sX[0], this.sY[0], 3, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.sX[1], this.sY[1], 2, 0, 2 * Math.PI);
            ctx.fill();
        } else if(this.osb.charAt(0) == 'r'){
            ctx.fillStyle = this.color + '88';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.rad * 1.4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = '#141922';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.rad * 1.2, 0, 2 * Math.PI);
            ctx.fill();
            let int = this.osb.charAt(2);
            int = int.toString();
            for(let i = 0; i < int; i++){
                ctx.fillStyle = 'grey';
                ctx.beginPath();
                ctx.arc(this.sX[i], this.sY[i], this.sB[i] * 2.5, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }

    move(){
        this.x = (this.dist / 3 * 4) * Math.cos(this.pos) + xs[0];
        this.y = this.dist * Math.sin(this.pos) + ys[0];
        this.pos += this.angVel;
        this.sX[0] = ((this.rad + 5) / 3 * 4) * Math.cos(this.sPos[0]) + this.x;
        this.sX[1] = ((this.rad + 15) / 3 * 4) * Math.cos(this.sPos[1]) + this.x;
        this.sY[0] = (this.rad + 5) * Math.sin(this.sPos[0]) + this.y;
        this.sY[1] = (this.rad + 15) * Math.sin(this.sPos[1]) + this.y;
        this.sPos[0] += this.angVel * 12;
        this.sPos[1] += this.angVel * 8;
        for(let i = 0; i < 10; i++){
            this.sX[i] = ((this.rad + 10) / 3 * 4) * Math.cos(this.sPos[i]) + this.x;
            this.sY[i] = (this.rad + 10) * Math.sin(this.sPos[i]) + this.y;
            this.sPos[i] += this.angVel * i;
        }
    }

    drawPath(){
        ctx.setLineDash([5, 10]);
        ctx.strokeStyle = this.color + '44';
        ctx.beginPath();
        ctx.ellipse(xs[0], ys[0], this.dist / 3 * 4, this.dist, 0, 0, 2 * Math.PI);
        ctx.stroke();
    }

/*  move(planets){    
            if(this.rad > 49) return;
        for(let i = 0; i < planets.length; i++){
            let planet = planets[i]
            this.x -= (this.x - planet.x) / 300000000 * planet.gravity;
            this.y -= (this.y - planet.y) / 300000000 * planet.gravity;
        }
        this.x += this.vecX;
        this.y += this.vecY;
    }

    setVec(planet){
        if(this.rad > 49) return;
        let planetXVec = planet.x - this.x;
        let planetYVec = planet.y - this.y;

        this.vecY = planetXVec / 200;
        this.vecX = planetYVec / 200;
    }    */
}

class Rocket {
    constructor(){

    }

    move(){

    }

    draw(){
        
    }
}

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

for(let i = 0; i < colors.length; i++){
    planets[i] = new Planet(colors[i], xs[i], ys[i], rads[i], ys[i] - ys[0], vels[i] / 2, osb[i]);
}

function draw(){
    ctx.fillStyle = '#141922';
    ctx.fillRect(0, 0, 2000, 1000);

    for(let i = 0; i < planets.length; i++){
        planets[i].draw();
        if(i > 0)
            planets[i].move();
    }
}

setInterval(draw, 16);