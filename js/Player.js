class Player {
  constructor() {

    this.name = null;
    this.distance = 0;
    this.index = null;
    this.rank = 0;

  }

  getCount() {
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value", function (data) {
      playerCount = data.val();
    })
  }

  updateCount(count) {
    database.ref('/').update({
      playerCount: count
    });
  }

  update() {
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name: this.name,
      distance: this.distance,
      rank: this.rank
    });
  }

  static getPlayerInfo() {

    var info = database.ref('players');
    info.on("value", (data) => {
      allPlayers = data.val();
    })
  }

  getFinished_players() {

    var finished_players_ref;
    finished_players_ref = database.ref("finished_players");
    finished_players_ref.on("value", (data) => {

      finished_players = data.val();

    })

  }

  static updateFinished_players() {

    database.ref("/").update({
      finished_players: finished_players + 1
    });

    this.rank++;

  }


}
