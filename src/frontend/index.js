import "./scss/styles.scss";
import GC from "./js/GraphicsCommon";

let socket = io.connect('http://localhost:4000');

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

