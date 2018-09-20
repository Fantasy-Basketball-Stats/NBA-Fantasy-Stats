function init() {


  d3.json("/news").then(function(response) {
    // appends news image to homepage
    var image = d3.select("#news_image");

    image.append('img')
      .attr('src', response.img);

    //appends news title to homepage
    var news = d3.select("#news_title");

    news.append('p').text(response.title);

    //appends list of top 10 players to homepage
    var topPlayers = d3.select("#top_players");

    for (i = 0; i < 10; i++) {
      topPlayers.append('p').text(i + 1 + ". " + response.players[i]);
      }

    //end json insert
    })

};

init();
