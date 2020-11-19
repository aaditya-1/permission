var canvas, backgroundImage;

var gameState = 0;
var playerCount;

var database;

var form, player, game;

var allPlayers;

var car1, car2, car3, car4;
var cars;

var car1_img, car2_img, car3_img, car4_img;
var track, ground;
var finished_players = 0;
var path_finished = false;

var bronze_img, silver_img, gold_img;
var bronze, silver, gold;

function preload() {

  car1_img = loadImage("images/car1.png");
  car2_img = loadImage("images/car2.png");
  car3_img = loadImage("images/car3.png");
  car4_img = loadImage("images/car4.png");

  bronze_img = loadImage("images/bronze.png");
  silver_img = loadImage("images/silver.png");
  gold_img = loadImage("images/gold.png");

  track = loadImage("images/track.jpg");
  ground = loadImage("images/ground.png");

}

function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight - 30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw() {

  background(55, 55);

  if (playerCount === 4 && finished_players === 0) {

    game.update(1);

  }

  if (gameState === 1) {
    clear();
    game.play();
  }

  if (finished_players === 4) {
    game.update(2);
  }

  if (gameState === 2 && finished_players === 4) {
    game.displayRanks();
  }

}
