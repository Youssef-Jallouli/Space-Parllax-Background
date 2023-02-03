function getRandomInt(min, max) {
  return Math.random() * (max - min + 1) + min;
}

const originalHeight = window.innerHeight * 0.3;
const originalWidth = window.innerWidth* 0.3;

const height = window.innerHeight * 1.3;
const width = window.innerWidth * 1.3;
const block = 250;
const container = document.getElementById('starcontainer');


let stars = [];

for (h=-originalHeight;h<height+block;h+=block){
    for (w=-originalWidth;w<height+block;w+=block){
        starX = getRandomInt(w-block, w);
        starY = getRandomInt(h-block, h);
        starParallaxCoefficient = getRandomInt(0.5,1);

        star = [starX,starY,starParallaxCoefficient];
        stars.push(star);
    }
}

stars.forEach(renderStars);

function handleMouseMovement(e){
    let oldX = 0;
    let oldY = 0;

    let movementX = e.movementX;
    let movementY = e.movementY;
    if (e.pageX < oldX) {
        movementX = -movementX;
    }
    if (e.pageY < oldY) {
        movementY = -movementY;
    }
    oldX = e.pageX;
    oldY = e.pageY;

    stars.forEach(function (item,index){
        let currentStar = starNodes[index];
        handleStarTranslation(item,movementX,movementY,currentStar);
    });


}

function handleStarTranslation(star,translateX,translateY,currentStar){
    currentStar.style.top = parseFloat(currentStar.style.top) + translateY *star[2] + "px";
    currentStar.style.left = parseFloat(currentStar.style.left) + translateX *star[2] + "px";
}

function setStarPos(star,pos){
    star.style.left = pos[0] +"px";
    star.style.top = pos[1] +"px";
}

function renderStars(star){
    let starRadius = getRandomInt(2,6);

    const starNode = document.createElement("div");

    starNode.classList.add("star");
    starNode.style.height = starRadius + "px";
    starNode.style.width = starRadius + "px";
    setStarPos(starNode,star)

    container.appendChild(starNode)
}

const starNodes = document.getElementsByClassName('star');

addEventListener("mousemove",handleMouseMovement);
