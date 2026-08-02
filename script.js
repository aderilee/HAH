/* ===========================================================
   HAPPY BIRTHDAY PROJECT
   PART 1
=========================================================== */

const bgCanvas =
document.getElementById("backgroundCanvas");

const bgCtx =
bgCanvas.getContext("2d");

/* Kích thước "logic" (đơn vị CSS px) dùng cho mọi phép toán vẽ,
   tách biệt với kích thước buffer thật của canvas (nhân theo DPR
   để hình nét trên màn Retina như iPhone 13/14) */
let viewW = window.innerWidth;
let viewH = window.innerHeight;

/* Cờ mobile: dùng để giảm bớt số lượng hạt trên màn hình nhỏ
   nhằm giữ hiệu năng mượt, hoàn toàn không ảnh hưởng tới PC */
let isMobile = viewW <= 768;

/* Đánh dấu khi mảng heartShape đã được khởi tạo lần đầu, để
   resize/orientationchange không gọi generateHeartShape() sớm hơn
   thời điểm biến heartShape (const, khai báo ở dưới) tồn tại */
let heartShapeReady = false;

function resizeCanvas(){

    viewW = window.innerWidth;
    viewH = window.innerHeight;

    isMobile = viewW <= 768;

    const dpr = window.devicePixelRatio || 1;

    bgCanvas.width = viewW * dpr;
    bgCanvas.height = viewH * dpr;

    // reset transform trước khi scale lại, tránh cộng dồn khi resize nhiều lần
    bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

}

/* Khi xoay màn hình / đổi kích thước sau khi trang đã tải xong,
   tính lại luôn hình trái tim cho khớp toạ độ mới (heartShape
   chỉ tồn tại sau khi phần script bên dưới chạy xong lần đầu) */
function handleViewportChange(){

    resizeCanvas();

    if (typeof generateHeartShape === "function" && heartShapeReady) {

        generateHeartShape();

    }

}

window.addEventListener(
"resize",
handleViewportChange
);

window.addEventListener(
"orientationchange",
handleViewportChange
);

resizeCanvas();
/* ===========================================================
   STARS
=========================================================== */

const stars = [];

class Star{

    constructor(){

        this.reset();

    }

    reset(){

        this.x = Math.random() * viewW;
        this.y = Math.random() * viewH;

        this.radius = Math.random() * 2 + 0.5;

        this.alpha = Math.random();

        this.speed = Math.random() * 0.02 + 0.005;

    }

    update(){

        this.alpha += this.speed;

        if(this.alpha >= 1){

            this.speed *= -1;

        }

        if(this.alpha <= 0.2){

            this.speed *= -1;

        }

    }

    draw(){

        bgCtx.beginPath();

        bgCtx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        bgCtx.fillStyle =
        `rgba(255,255,220,${this.alpha})`;

        bgCtx.shadowBlur = 10;
        bgCtx.shadowColor = "#fff8cc";

        bgCtx.fill();

    }

}

/* Create Stars */

const starCount = isMobile ? 150 : 300;

for(let i=0;i<starCount;i++){

    stars.push(new Star());

}

/* Animation Loop */

function animate(){

    bgCtx.clearRect(
    0,
    0,
    viewW,
    viewH
);

drawStars();

updateClouds();
drawClouds();

updateFireflies();
drawFireflies();

updateBalloons();
drawBalloons();

updateBirthdayText();
drawBirthdayText();

updateFireworks();
drawFireworks();

updateHearts();
drawHearts();

drawMoon();

updateShootingStars();

drawShootingStars();

requestAnimationFrame(animate);
}
function drawStars(){

    for(const star of stars){

        star.update();

        star.draw();

    }

    
}

/*========================================
                MOON
========================================*/

function drawMoon(){

    // Trên màn hình nhỏ (iPhone...), thu nhỏ & kéo mặt trăng vào gần
    // mép hơn để không bị cắt hoặc đè lên tiêu đề
    const moonScale = isMobile ? Math.max(0.55, viewW / 700) : 1;

    const moonRadius = 60 * moonScale;
    const moonX = viewW - (moonRadius + 40);
    const moonY = (isMobile ? 90 : 130) + moonRadius * 0.3;
    // Moon Glow
const glow = bgCtx.createRadialGradient(

    moonX,
    moonY,
    50,

    moonX,
    moonY,
    120

);

glow.addColorStop(
    0,
    "rgba(255,255,220,0.35)"
);

glow.addColorStop(
    1,
    "rgba(255,255,220,0)"
);

bgCtx.beginPath();

bgCtx.arc(
    moonX,
    moonY,
    120,
    0,
    Math.PI * 2
);

bgCtx.fillStyle = glow;

bgCtx.fill();
    bgCtx.beginPath();

    bgCtx.arc(
        moonX,
        moonY,
        moonRadius,
        0,
        Math.PI * 2
    );

    bgCtx.fillStyle = "#fdf8d6";

    bgCtx.shadowBlur = 40;
    bgCtx.shadowColor = "#fff7aa";

    bgCtx.fill();
    // Crater 1
bgCtx.beginPath();

bgCtx.arc(
    moonX - 18,
    moonY - 12,
    8,
    0,
    Math.PI * 2
);

bgCtx.fillStyle = "rgba(210,205,180,0.35)";
bgCtx.fill();


// Crater 2
bgCtx.beginPath();

bgCtx.arc(
    moonX + 16,
    moonY + 10,
    6,
    0,
    Math.PI * 2
);

bgCtx.fill();


// Crater 3
bgCtx.beginPath();

bgCtx.arc(
    moonX - 5,
    moonY + 22,
    10,
    0,
    Math.PI * 2
);

bgCtx.fill();

}
/*========================================
            Cloud
========================================*/
const clouds = [];
class Cloud{

    constructor(){

        this.reset();

    }

    reset(){

        this.x = -250 - Math.random()*300;

        this.y = 40 + Math.random()*180;

        this.speed = 0.15 + Math.random()*0.25;

        this.size = 50 + Math.random()*40;

        this.alpha = 0.05 + Math.random()*0.05;

    }

    update(){

        this.x += this.speed;

        if(this.x > viewW + 250){

            this.reset();

        }

    }

    draw(){

        bgCtx.fillStyle =
        `rgba(255,255,255,${this.alpha})`;

        bgCtx.beginPath();

        bgCtx.arc(this.x,this.y,this.size,0,Math.PI*2);

        bgCtx.arc(this.x+40,this.y-10,this.size*0.9,0,Math.PI*2);

        bgCtx.arc(this.x+80,this.y,this.size*0.8,0,Math.PI*2);

        bgCtx.fill();

    }

}
for(let i=0;i<5;i++){

    clouds.push(new Cloud());

}
function updateClouds(){

    for(const cloud of clouds){

        cloud.update();

    }

}
function drawClouds(){

    for(const cloud of clouds){

        cloud.draw();

    }

}
/*========================================
            ĐOM ĐÓM Fireflies
========================================*/
const fireflies = [];
class Firefly{

    constructor(){

        this.reset();

    }

    reset(){

        this.x = Math.random()*viewW;

        this.y = Math.random()*viewH;

        this.radius = Math.random()*2 + 1;

        this.speedX = (Math.random()-0.5)*0.4;

        this.speedY = (Math.random()-0.5)*0.4;

        this.alpha = 0.3 + Math.random()*0.7;

    }

    update(){

        this.x += this.speedX;

        this.y += this.speedY;

        if(this.x < 0) this.x = viewW;
        if(this.x > viewW) this.x = 0;

        if(this.y < 0) this.y = viewH;
        if(this.y > viewH) this.y = 0;

    }

    draw(){

        bgCtx.beginPath();

        bgCtx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI*2
        );

        bgCtx.fillStyle =
        `rgba(255,245,150,${this.alpha})`;

        bgCtx.shadowBlur = 10;

        bgCtx.shadowColor = "#ffee88";

        bgCtx.fill();

    }

}
const fireflyCount = isMobile ? 20 : 40;

for(let i=0;i<fireflyCount;i++){

    fireflies.push(new Firefly());

}
function updateFireflies(){

    for(const firefly of fireflies){

        firefly.update();

    }

}
function drawFireflies(){

    for(const firefly of fireflies){

        firefly.draw();

    }

}
/*========================================
            BALLOONS - BONG BÓNG
========================================*/
const balloons = [];
class Balloon{

    constructor(){

        this.reset();

    }

    reset(){

        this.x = Math.random() * viewW;

        this.y = viewH + Math.random()*300;

        this.radius = 18 + Math.random()*10;

        this.speed = 0.4 + Math.random()*0.5;

        this.color = `hsl(${Math.random()*360},80%,65%)`;
        
        this.angle = Math.random() * Math.PI * 2;

    }

    update(){

        this.y -= this.speed;

        this.angle += 0.03;

        this.x += Math.sin(this.angle) * 0.8;

        if(this.y < -80){

        this.reset();

        }

    }

    draw(){

        // Balloon
        bgCtx.beginPath();

        bgCtx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI*2
        );

        bgCtx.fillStyle = this.color;

        bgCtx.fill();

        // String
        bgCtx.beginPath();

        bgCtx.moveTo(
            this.x,
            this.y + this.radius
            );

        bgCtx.quadraticCurveTo(

            this.x + Math.sin(this.angle)*8,

            this.y + this.radius + 20,

            this.x,

            this.y + this.radius + 40

        );

        bgCtx.strokeStyle = "#dddddd";

        bgCtx.lineWidth = 1;

        bgCtx.stroke();

    }

}
const balloonCount = isMobile ? 8 : 15;

for(let i=0;i<balloonCount;i++){

    balloons.push(new Balloon());

}
function updateBalloons(){

    for(const balloon of balloons){

        balloon.update();

    }

}
function drawBalloons(){

    for(const balloon of balloons){

        balloon.draw();

    }

}
/*========================================
            FIREWORKS
========================================*/

const fireworks = [];
class FireworkParticle{

    constructor(x,y,color){

        this.x = x;
        this.y = y;

        this.color = color;

        const angle = Math.random()*Math.PI*2;

        const speed = Math.random()*5 + 2;

        this.vx = Math.cos(angle)*speed;
        this.vy = Math.sin(angle)*speed;

        this.life = 100;

    }

    update(){

        this.x += this.vx;

        this.y += this.vy;

        this.vy += 0.03;

        this.life--;

    }

    draw(){

        bgCtx.beginPath();

        bgCtx.arc(
            this.x,
            this.y,
            2,
            0,
            Math.PI*2
        );

        bgCtx.fillStyle =
        this.color;

        bgCtx.shadowBlur = 10;

        bgCtx.shadowColor = this.color;

        bgCtx.fill();

    }

}
class Firework{

    constructor(){

        this.reset();

    }

    reset(){

        this.x = 150 + Math.random()*(viewW-300);

        this.y = 120 + Math.random()*220;

        this.color =
        `hsl(${Math.random()*360},100%,60%)`;

        this.particles = [];

        for(let i=0;i<80;i++){

            this.particles.push(

                new FireworkParticle(

                    this.x,

                    this.y,

                    this.color

                )

            );

        }

    }

    update(){

        for(const p of this.particles){

            p.update();

        }

        this.particles =
        this.particles.filter(

            p=>p.life>0

        );

        if(this.particles.length===0){

            this.reset();

        }

    }

    draw(){

        for(const p of this.particles){

            p.draw();

        }

    }

}
const fireworkCount = isMobile ? 2 : 3;

for(let i=0;i<fireworkCount;i++){

    fireworks.push(
        new Firework()
    );

}
function updateFireworks(){

    for(const firework of fireworks){

        firework.update();

    }

}
function drawFireworks(){

    for(const firework of fireworks){

        firework.draw();

    }

}
/*========================================
          HAPPY BIRTHDAY TEXT
========================================*/

const fullText = "🎉 Happy Birthday Hịp Hịp 🎂";

let currentText = "";

let textIndex = 0;

let frameCounter = 0;

function updateBirthdayText(){

    frameCounter++;

    if(frameCounter % 8 !== 0){

        return;

    }

    if(textIndex < fullText.length){

        currentText += fullText[textIndex];

        textIndex++;

    }

}
function drawBirthdayText(){

    // Tính cỡ chữ vừa khít chiều rộng màn hình (đặc biệt là
    // iPhone 13/14 ~390-430px) để dòng chữ không bị tràn ra ngoài
    let fontSize = 60;

    bgCtx.font = `bold ${fontSize}px Arial`;

    const maxTextWidth = viewW * 0.92;

    while (
        fontSize > 16 &&
        bgCtx.measureText(fullText).width > maxTextWidth
    ) {

        fontSize -= 2;

        bgCtx.font = `bold ${fontSize}px Arial`;

    }

    bgCtx.textAlign = "center";

    bgCtx.fillStyle = "#ffffff";

    bgCtx.shadowBlur = 20;

    bgCtx.shadowColor = "#fff799";

    bgCtx.fillText(

        currentText,

        viewW / 2,

        isMobile ? 80 : 120

    );

}
/*========================================
                HEART
========================================*/

const hearts = [];
const heartShape = [];

let heartMode = false;
class Heart{

    constructor(){

        this.reset();

    }

    reset(){

        this.x = Math.random()*viewW;

        this.y = viewH + Math.random()*300;

        this.size = 8 + Math.random()*6;

        this.speed = 1 + Math.random()*1.5;

        this.angle = Math.random()*Math.PI*2;

        this.vx = (Math.random() - 0.5) * 2;

        this.vy = -(1 + Math.random() * 2);

        this.rotation = Math.random() * Math.PI * 2;

        this.rotationSpeed = (Math.random() - 0.5) * 0.08;

        this.targetX = this.x;

        this.targetY = this.y;

    }

    update(){

        if(heartMode){

        this.x += (this.targetX - this.x) * 0.05;

        this.y += (this.targetY - this.y) * 0.05;

        this.rotation += this.rotationSpeed;

        return;

    }
        this.rotation += this.rotationSpeed;

        this.x += this.vx;

        this.y += this.vy;

        this.vy += 0.01;

        this.vx *= 0.995;

        if(this.y < -50){

        this.reset();

        }

    }

    draw(){

        bgCtx.save();

        bgCtx.translate(this.x,this.y);

        bgCtx.rotate(this.rotation);

        bgCtx.scale(this.size,this.size);

        bgCtx.beginPath();

        bgCtx.moveTo(0,0);

        bgCtx.bezierCurveTo(
            -0.5,-0.5,
            -1,0.3,
            0,1
        );

        bgCtx.bezierCurveTo(
            1,0.3,
            0.5,-0.5,
            0,0
        );

        bgCtx.fillStyle="#ff3b7a";

        bgCtx.shadowBlur=12;

        bgCtx.shadowColor="#ff3b7a";

        bgCtx.fill();

        bgCtx.restore();

    }

}
const heartCount = isMobile ? 180 : 380;

for(let i=0;i<heartCount;i++){

    hearts.push(
        new Heart()
    );

}
function updateHearts(){

    for(const heart of hearts){

        heart.update();

    }

}
function drawHearts(){

    for(const heart of hearts){

        heart.draw();

    }

}
function generateHeartShape(){

    heartShape.length = 0;

    const cx = viewW / 2;
    const cy = viewH / 2;

    for(let t=0;t<Math.PI*2;t+=0.03){

        const x = 16*Math.pow(Math.sin(t),3);

        const y =
            13*Math.cos(t)
            -5*Math.cos(2*t)
            -2*Math.cos(3*t)
            -Math.cos(4*t);

        heartShape.push({

            x: cx + x*18,

            y: cy - y*18

        });

    }

}
generateHeartShape();
heartShapeReady = true;
function startHeartMode(){

    heartMode = true;

    for(let i = 0; i < hearts.length; i++){

        const p = heartShape[i % heartShape.length];

        hearts[i].targetX = p.x;
        hearts[i].targetY = p.y;

    }

}
/*========================================
            SHOOTING STARS
========================================*/

let shootingStars = [];

class ShootingStar {

    constructor() {
        this.reset();
    }

    reset() {

        this.x = Math.random() * viewW;

        this.y = Math.random() * viewH * 0.3;

        this.length = 80 + Math.random() * 100;

        this.speed = 10 + Math.random() * 6;

        this.life = 0;

        this.delay = Math.random() * 400;
    }

    update() {

        if (this.delay > 0) {
            this.delay--;
            return;
        }

        this.x += this.speed;

        this.y += this.speed * 0.45;

        this.life++;

        if (
            this.x > viewW + 200 ||
            this.y > viewH + 200
        ) {
            this.reset();
        }

    }

    draw() {

        if (this.delay > 0) return;

        bgCtx.beginPath();

        bgCtx.moveTo(this.x, this.y);

        bgCtx.lineTo(
            this.x - this.length,
            this.y - this.length * 0.45
        );

        bgCtx.strokeStyle = "rgba(255,255,255,0.9)";
        bgCtx.lineWidth = 2;

        bgCtx.shadowBlur = 15;
        bgCtx.shadowColor = "white";

        bgCtx.stroke();

    }

}
for (let i = 0; i < 3; i++) {

    shootingStars.push(
        new ShootingStar()
    );

}
function updateShootingStars() {

    for (const star of shootingStars) {

        star.update();

    }

}

function drawShootingStars() {

    for (const star of shootingStars) {

        star.draw();

    }

}
animate();

setTimeout(() => {

    startHeartMode();

}, 14000);

const message = document.getElementById("message");

setTimeout(() => {

    message.style.opacity = "0";

    setTimeout(() => {

        message.style.display = "none";

    },1500);

},10000);
