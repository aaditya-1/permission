class Game {
  constructor() {



  }



  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var any = await database.ref('playerCount').once("value");
      if (any.exists()) {
        playerCount = any.val();
        player.getCount();
      }

      form = new Form();
      form.display();

    }


    car1 = createSprite(100, 200, 50, 50);
    car2 = createSprite(200, 200, 50, 50);
    car3 = createSprite(300, 200, 50, 50);
    car4 = createSprite(400, 200, 50, 50);

    car1.addImage(car1_img);
    car2.addImage(car2_img);
    car3.addImage(car3_img);
    car4.addImage(car4_img);

    bronze.addImage(bronze_img);
    silver.addImage(silver_img);
    gold.addImage(gold_img);


    cars = [car1, car2, car3, car4];

  }



  play() {



    form.hide();
    text("Game Start !!");
    Player.getPlayerInfo();

    player.getFinished_players();

    if (allPlayers !== undefined) {

      background("#c68767");
      image(track, 0, -displayHeight * 4, displayWidth, displayHeight * 5);

      //oh yes ma'am !!

      // var pos = 130;
      var index = 0;
      var xpos = 175;
      var ypos;

      for (var plr in allPlayers) {

        index++;

        xpos += 200;


        ypos = displayHeight - allPlayers[plr].distance;

        cars[index - 1].x = xpos;
        cars[index - 1].y = ypos;

        if (index === player.index) {

          stroke("red");
          fill("yellow");
          ellipse(xpos, ypos, 60, 60);


          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth / 2;
          camera.position.y = cars[index - 1].y;



        }
        else {
          cars[index - 1].shapeColor = "green";

        }
        //  okk ma'am pls wait let me recconect

        textAlign(CENTER);
        textSize(15);
        text(allPlayers[plr].name, cars[index - 1].x, cars[index - 1].y + 70)

      }

      if (keyDown(UP_ARROW) && path_finished !== true && player.index !== null) {

        player.distance += 50;
        player.update();

      }

      if (player.distance > 3600 && path_finished !== true) {

        // gameState = 2;
        Player.updateFinished_players();
        player.rank = finished_players;
        player.update();
        path_finished = true

      }

      drawSprites();
    }

  }

  displayRanks() {

    camera.position.x = 0;
    camera.position.y = 0;
    Player.getPlayerInfo();

    imageMode(CENTER);

    image(bronze, displayWidth / -4, -100 + displayHeight / 9, 200, 240);
    image(silver, displayWidth / -4, -100 + displayHeight / 10, 225, 270);
    image(gold, displayWidth / -4, -100 + displayHeight / 11, 250, 300);

    for (var plr in allPlayers) {
      if (allPlayers[plr].rank === 1) {
        text("FIRST XD : " + allPlayer[plr].name, 0, 85);
      }
      else if (allPlayers[plr].rank === 2) {
        text("SECOND :) " + allPlayer[plr].name, -350, 175);
      }
      else if (allPlayers[plr].rank === 3) {
        text("THIRD :( : " + allPlayer[plr].name, 350, 175);
      }
      else {
        text("HONOURABLE MENTION :/ :" + allPlayer[plr].name, 0, 200);
      }
    }

  }

}