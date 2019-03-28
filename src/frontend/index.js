import "./scss/styles.scss";
import GameManager from "./js/GameManager";

let socket = io.connect('http://localhost:4000');

const game = new GameManager({
    context: document.getElementById('gameCanvas').getContext('2d')
});

game.colorText("right", "TradeWinds", "green", "Hello world", 50, 20);