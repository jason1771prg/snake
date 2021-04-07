/**
 * bouger le carré
 * recuperer les touche directionnelle(appliquer event) 
 * modifier left /top en fonction touche
 * 
 */


const game = document.getElementById("game");
const size = game.clientWidth/100;

const generateSnakePart = () => {
    const snakePart = document.createElement("div");
    snakePart.classList.add("snake");
    snakePart.style.width = size + 'px';
    snakePart.style.height = size + 'px';
    snakePart.style.left = (game.clientWidth / 2) + 'px';
    snakePart.style.top = (game.clientHeight / 2) + 'px';
    game.appendChild(snakePart);
    return snakePart;
}


const snake = Array(generateSnakePart(), generateSnakePart(), generateSnakePart());









/**
 * sert à deplacer le caré (top = true si on modifie top et false si on modifie left)
 */
const moveSnakeHead = (top, add) => {
    var move = false;
    if (top) {
        var position = parseFloat(snake[0].style.top.replace('px', '')) + add;
        if (position < (game.clientHeight - size / 2) && position > 0) {
            snake[snake.length-1].style.top = position + 'px';
            snake[snake.length-1].style.left = snake[0].style.left;
            move = true;
        }
    } else {
        var position = parseFloat(snake[0].style.left.replace('px', '')) + add;
        if (position < game.clientWidth && position > 0) {
            snake[snake.length-1].style.left = position + 'px';
            snake[snake.length-1].style.top = snake[0].style.top;
            move = true;
        }
    }

    if (move) {
         
        snake.unshift(snake.pop());
    }
}

// sert a deplacer la tete automatiquement
var topVal = true;
var addVal = -size;
document.addEventListener("keydown", event => {
    if (event.key === 'ArrowRight') {
        topVal = false;
        addVal = size;
    } else if (event.key === 'ArrowDown') {
        topVal = true;
        addVal = size;
    } else if (event.key === 'ArrowUp') {
        topVal = true;
        addVal = -size;
    } else if (event.key === 'ArrowLeft') {
        topVal = false;
        addVal = -size;
    }
});

const interval = setInterval(() => moveSnakeHead(topVal, addVal), 100);

// clearInterval(interval); sert a stoper la boucle