// Seleciona o elemento canvas e obtém o contexto de desenho
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

// Define o tamanho de cada "caixa" na grade do jogo
let box = 20;

// Inicializa a cobra como um array de objetos
let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

// Define a direção inicial da cobra
let direction = "right";

// Cria a comida em uma posição aleatória
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Função para criar o background do jogo
function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Função para criar a cobra
function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Função para desenhar a comida
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Adiciona um event listener para capturar as teclas pressionadas e atualizar a direção da cobra
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

// Função principal do jogo
function startGame() {
    // Verifica se a cobra saiu do campo de jogo e a traz de volta do outro lado
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    // Verifica se a cobra colidiu consigo mesma
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over :(');
        }
    }

    // Desenha o background, a cobra e a comida
    createBG();
    createSnake();
    drawFood();

    // Define a próxima posição da cobra
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    // Verifica se a cobra comeu a comida
    if (snakeX != food.x || snakeY != food.y) {
        // Se não comeu, remove a última caixa da cobra (movimento da cobra)
        snake.pop();
    } else {
        // Se comeu, gera uma nova comida em uma posição aleatória
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    // Adiciona uma nova caixa à frente da cobra (movimento da cobra)
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

// Inicia o jogo e o atualiza a cada 100ms
let game = setInterval(startGame, 100);