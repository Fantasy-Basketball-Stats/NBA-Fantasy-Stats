// buildStats() function to pull Stats data and create Plotly plots
function buildStats(playerName) {
  // set var url = '<flask_route>' + playerName
  console.log(playerName);
  var url = "/stats/" + playerName;
  // d3.js to fetch data for the plots
  d3.json(url).then(function(response) {
    console.log(response);
    //display player name as text
    // d3.select("#player1")
    //   .html('')
    //   .append('p')
    //   .text("Left: " + playerName);

    // Graph 1 - Average Miscellaneous Stats
    //trace data
    var trace1 = {
      x: ['Rebounds','Assists','Turnovers','Steals','Blocks','Personal Fouls','Points'],
      y: [response.tot[response.tot.length-1],response.ast[response.ast.length-1],response.turnovers[response.turnovers.length-1],response.steals[response.steals.length-1],response.blocks[response.blocks.length-1],response.personal_fouls[response.personal_fouls.length-1],response.pts[response.pts.length-1]],
      type: 'bar',
      marker: {
        color: 'rgb(219, 0, 0)',
        size: 12
      }
    };

    var data1 = [trace1];

    var layout1 = {
      title: 'Average Miscellaneous Stats of 2017 - ' + playerName,
      xaxis: {
        title: 'Misc Stats',
        titlefont: {
          family: 'Courier New, monospace',
          size: 14,
          color: '#7f7f7f'
        }
      },
        yaxis: {
          title: 'Average',
          titlefont: {
            family: 'Courier New, monospace',
            size: 14,
            color: '#7f7f7f'
          }
        }
    };

      Plotly.newPlot('plot1a', data1, layout1);

    // GRAPH 2- Average Rebounds
    var trace2 = {
      values: [response.off[response.off.length-1],response.def[response.def.length-1]],
      type: 'pie',
      labels: ['Offensive Rebounds', 'Defensive Rebounds'],

    };

    var data2 = [trace2];

    var layout2 = {
      title: 'Average Rebounds by ' + playerName,
      height: 400,
      width: 500
    };

      Plotly.newPlot('plot2a', data2, layout2);

    // GRAPH 3 - Field Goal Percent Per Year
    var trace3 = {
      x: response.year,
      y: response.field_goals_percent,
      type: 'scatter',
      marker: {
        color: 'rgb(219, 0, 0)',
        size: 12
      }
    };

    var data3 = [trace3];

    var layout3 = {
      title: 'Average Field Goal Percentage by ' + playerName + ' per Year',
      xaxis: {
        title: 'Year',
        titlefont: {
          family: 'Courier New, monospace',
          size: 14,
          color: '#7f7f7f'
        }
      },
        yaxis: {
          title: 'Field Goal Percentage',
          titlefont: {
            family: 'Courier New, monospace',
            size: 14,
            color: '#7f7f7f'
          }
        }
    };

      Plotly.newPlot('plot3a', data3, layout3);


      // GRAPH 4 - Field Goal Makes vs Misses
    var trace4a = {
      x: response.year,
      y: response.field_goals_made,
      type: 'bar',
      name: 'Field Goals Made',
      marker: {
        color: 'rgb(0, 0, 255)',
        size: 12
      }
    };

      var trace4b = {
      x: response.year,
      y: response.field_goals_attempt,
      name: 'Field Goals Attempted',
      type: 'bar',
      marker: {
        color: 'rgb(219, 0, 0)',
        size: 12
      }
    };

    var data4 = [trace4a,trace4b];

    var layout4 = {
      title: 'Average Field Goals Made vs. Average Field Goals Attempted by ' + playerName + ' per Year',
      xaxis: {
        title: 'Year',
        titlefont: {
          family: 'Courier New, monospace',
          size: 14,
          color: '#7f7f7f'
        }
      },
        yaxis: {
          title: 'Field Goal Percentage',
          titlefont: {
            family: 'Courier New, monospace',
            size: 14,
            color: '#7f7f7f'
          }
        }
    };

      Plotly.newPlot('plot4a', data4, layout4);



    // GRAPH 5 - 3PT Percent Per Year
    var trace5 = {
      x: response.year,
      y: response.three_points_percent,
      type: 'scatter',
      marker: {
        color: 'rgb(219, 0, 0)',
        size: 12
      }
    };

    var data5 = [trace5];

    var layout5 = {
      title: 'Average 3PT Percentage by ' + playerName + ' per Year',
      xaxis: {
        title: 'Year',
        titlefont: {
          family: 'Courier New, monospace',
          size: 14,
          color: '#7f7f7f'
        }
      },
        yaxis: {
          title: 'Three Point Percentage',
          titlefont: {
            family: 'Courier New, monospace',
            size: 14,
            color: '#7f7f7f'
          }
        }
    };

      Plotly.newPlot('plot5a', data5, layout5);


    // GRAPH 6 - Three Point Percent Per Year

    var trace6a = {
      x: response.year,
      y: response.three_points_made,
      type: 'bar',
      name: 'Three Points Made',
      marker: {
        color: 'rgb(0, 0, 255)',
        size: 12
      }
    };

    var trace6b = {
      x: response.year,
      y: response.three_points_attempt,
      type: 'bar',
      name: 'Three Points Attmepted',
      marker: {
        color: 'rgb(219, 0, 0)',
        size: 12
      }
    };

    var data6 = [trace6a,trace6b];

    var layout6 = {
      title: 'Average Three Points Made vs. Average Three Points Attempted by ' + playerName + ' per Year',
      xaxis: {
        title: 'Year',
        titlefont: {
          family: 'Courier New, monospace',
          size: 14,
          color: '#7f7f7f'
        }
      },
        yaxis: {
          title: 'Three Points Percentage',
          titlefont: {
            family: 'Courier New, monospace',
            size: 14,
            color: '#7f7f7f'
          }
        }
    };

      Plotly.newPlot('plot6a', data6, layout6);

    // GRAPH 7 - Free Throw Percent Per Year
    var trace7 = {
      x: response.year,
      y: response.free_throws_percent,
      type: 'scatter',
      marker: {
        color: 'rgb(219, 0, 0)',
        size: 12
      }
    };

    var data7 = [trace7];

    var layout7 = {
      title: 'Average Free Throws Percentage by ' + playerName + ' per Year',
      xaxis: {
        title: 'Year',
        titlefont: {
          family: 'Courier New, monospace',
          size: 14,
          color: '#7f7f7f'
        }
      },
        yaxis: {
          title: 'Free Throw Percentage',
          titlefont: {
            family: 'Courier New, monospace',
            size: 14,
            color: '#7f7f7f'
          }
        }
    };

      Plotly.newPlot('plot7a', data7, layout7);


    // GRAPH 8 - Free Throws Percent Per Year
    var trace8a = {
      x: response.year,
      y: response.free_throws_made,
      type: 'bar',
      name: 'Free Throws Made',
      marker: {
        color: 'rgb(0, 0, 255)',
        size: 12
      }
    };

    var trace8b = {
      x: response.year,
      y: response.free_throws_attempt,
      type: 'bar',
      name: 'Free Throws Made',
      marker: {
        color: 'rgb(219, 0, 0)',
        size: 12
      }
    };

    var data8 = [trace8a,trace8b];

    var layout8 = {
      title: 'Average Free Throws Made vs. Average Free Throws Attempted by ' + playerName + ' per Year',
      xaxis: {
        title: 'Year',
        titlefont: {
          family: 'Courier New, monospace',
          size: 14,
          color: '#7f7f7f'
        }
      },
        yaxis: {
          title: 'Free Throw Percentage',
          titlefont: {
            family: 'Courier New, monospace',
            size: 14,
            color: '#7f7f7f'
          }
        }
    };

      Plotly.newPlot('plot8a', data8, layout8);

    });
};

function buildStats2(playerName) {
  // set var url = '<flask_route>' + playerName
  console.log(playerName);

  var url = "/stats/" + playerName;
  // d3.js to fetch data for the plots
  d3.json(url).then(function(response) {
    console.log(response);
    // plot1 xaxis = Year, yaxis = FTM per year
    // d3.select("#player2")
    //   .html('')
    //   .append('p')
    //   .text("Right: " + playerName);

    var trace9 = {
      x: ['Rebounds','Assists','Turnovers','Steals','Blocks','Personal Fouls','Points'],
      y: [response.tot[response.tot.length-1],response.ast[response.ast.length-1],response.turnovers[response.turnovers.length-1],response.steals[response.steals.length-1],response.blocks[response.blocks.length-1],response.personal_fouls[response.personal_fouls.length-1],response.pts[response.pts.length-1]],
      type: 'bar',
      marker: {
        color: 'rgb(219, 0, 0)',
        size: 12
      }
    };

    var data9 = [trace9];

    var layout9 = {
      title: 'Average Miscellaneous Stats of 2017 - ' + playerName,
      xaxis: {
        title: 'Misc Stats',
        titlefont: {
          family: 'Courier New, monospace',
          size: 14,
          color: '#7f7f7f'
        }
      },
        yaxis: {
          title: 'Average',
          titlefont: {
            family: 'Courier New, monospace',
            size: 14,
            color: '#7f7f7f'
          }
        }
    };

      Plotly.newPlot('plot1b', data9, layout9);

    // GRAPH 2- Average Rebounds
    var trace10 = {
      values: [response.off[response.off.length-1],response.def[response.def.length-1]],
      type: 'pie',
      labels: ['Offensive Rebounds', 'Defensive Rebounds'],

    };

    var data10 = [trace10];

    var layout10 = {
      title: 'Average Rebounds by ' + playerName,
      height: 400,
      width: 500
    };

      Plotly.newPlot('plot2b', data10, layout10);

    // GRAPH 3 - Field Goal Percent Per Year
    var trace11 = {
      x: response.year,
      y: response.field_goals_percent,
      type: 'scatter',
      marker: {
        color: 'rgb(219, 0, 0)',
        size: 12
      }
    };

    var data11 = [trace11];

    var layout11 = {
      title: 'Average Field Goal Percentage by ' + playerName + ' per Year',
      xaxis: {
        title: 'Year',
        titlefont: {
          family: 'Courier New, monospace',
          size: 14,
          color: '#7f7f7f'
        }
      },
        yaxis: {
          title: 'Field Goal Percentage',
          titlefont: {
            family: 'Courier New, monospace',
            size: 14,
            color: '#7f7f7f'
          }
        }
    };

      Plotly.newPlot('plot3b', data11, layout11);


      // GRAPH 4 - Field Goal Makes vs Misses
    var trace12a = {
      x: response.year,
      y: response.field_goals_made,
      type: 'bar',
      name: 'Field Goals Made',
      marker: {
        color: 'rgb(0, 0, 255)',
        size: 12
      }
    };

      var trace12b = {
      x: response.year,
      y: response.field_goals_attempt,
      type: 'bar',
      name: 'Field Goals Attempted',
      marker: {
        color: 'rgb(219, 0, 0)',
        size: 12
      }
    };

    var data12 = [trace12a,trace12b];

    var layout12 = {
      title: 'Average Field Goals Made vs. Average Field Goals Attempted by ' + playerName + ' per Year',
      xaxis: {
        title: 'Year',
        titlefont: {
          family: 'Courier New, monospace',
          size: 14,
          color: '#7f7f7f'
        }
      },
        yaxis: {
          title: 'Field Goal Percentage',
          titlefont: {
            family: 'Courier New, monospace',
            size: 14,
            color: '#7f7f7f'
          }
        }
    };

      Plotly.newPlot('plot4b', data12, layout12);



    // GRAPH 5 - 3PT Percent Per Year
    var trace13 = {
      x: response.year,
      y: response.three_points_percent,
      type: 'scatter',
      marker: {
        color: 'rgb(219, 0, 0)',
        size: 12
      }
    };

    var data13 = [trace13];

    var layout13 = {
      title: 'Average 3PT Percentage by ' + playerName + ' per Year',
      xaxis: {
        title: 'Year',
        titlefont: {
          family: 'Courier New, monospace',
          size: 14,
          color: '#7f7f7f'
        }
      },
        yaxis: {
          title: 'Three Point Percentage',
          titlefont: {
            family: 'Courier New, monospace',
            size: 14,
            color: '#7f7f7f'
          }
        }
    };

      Plotly.newPlot('plot5b', data13, layout13);


    // GRAPH 6 - Three Point Percent Per Year
    var trace14a = {
      x: response.year,
      y: response.three_points_made,
      type: 'bar',
      name: 'Three Points Made',
      marker: {
        color: 'rgb(0, 0, 255)',
        size: 12
      }
    };

    var trace14b = {
      x: response.year,
      y: response.three_points_attempt,
      type: 'bar',
      name: 'Three Points Attempted',
      marker: {
        color: 'rgb(219, 0, 0)',
        size: 12
      }
    };


    var data14 = [trace14a,trace14b];

    var layout14 = {
      title: 'Average 3 Pointers Made vs. Average 3 Pointers Attempted by ' + playerName + ' per Year',
      xaxis: {
        title: 'Year',
        titlefont: {
          family: 'Courier New, monospace',
          size: 14,
          color: '#7f7f7f'
        }
      },
        yaxis: {
          title: 'Three Point Percentage',
          titlefont: {
            family: 'Courier New, monospace',
            size: 14,
            color: '#7f7f7f'
          }
        }
    };

    Plotly.newPlot('plot6b', data14, layout14);


    // GRAPH 7 - Free Throw Percent Per Year
    var trace15 = {
      x: response.year,
      y: response.free_throws_percent,
      type: 'scatter',
      marker: {
        color: 'rgb(219, 0, 0)',
        size: 12
      }
    };

    var data15 = [trace15];

    var layout15 = {
      title: 'Average Free Throws Percentage by ' + playerName + ' per Year',
      xaxis: {
        title: 'Year',
        titlefont: {
          family: 'Courier New, monospace',
          size: 14,
          color: '#7f7f7f'
        }
      },
        yaxis: {
          title: 'Free Throw Percentage',
          titlefont: {
            family: 'Courier New, monospace',
            size: 14,
            color: '#7f7f7f'
          }
        }
    };

    Plotly.newPlot('plot7b', data15, layout15);


    // GRAPH 8 - Free Throws Percent Per Year
    var trace16a = {
      x: response.year,
      y: response.free_throws_made,
      type: 'bar',
      name: 'Free Throws Made',
      marker: {
        color: 'rgb(0, 0, 255)',
        size: 12
      }
    };

    var trace16b = {
      x: response.year,
      y: response.free_throws_attempt,
      type: 'bar',
      name: 'Free Throws Attempted',
      marker: {
        color: 'rgb(219, 0, 0)',
        size: 12
      }
    };

    var data16 = [trace16a,trace16b];

    var layout16 = {
      title: 'Average Free Throws Made vs. Average Free Throws Attempted by ' + playerName + ' per Year',
      xaxis: {
        title: 'Year',
        titlefont: {
          family: 'Courier New, monospace',
          size: 14,
          color: '#7f7f7f'
        }
      },
        yaxis: {
          title: 'Free Throw Percentage',
          titlefont: {
            family: 'Courier New, monospace',
            size: 14,
            color: '#7f7f7f'
          }
        }
    };

      Plotly.newPlot('plot8b', data16, layout16);



    });
};

// buildNews() function to pull News data and insert it into HTML page
function buildNews(playerName) {

  var url = "/playernews/" + playerName;
  // d3.js to fetch data for the plots
  d3.json(url).then(function(response) {
    console.log(response);

    //display player name header
    d3.select("#player1")
      .html("")
      .append('p')
      .text(playerName + " Info");

    //display player info
    d3.select("#player1_info")
      .html("")
      .append('p').text(`Team: ${response.team}`)
      .append('p').text("Age/DOB: " + response.age_dob)
      .append('p').text("Height/Weight: " + response.ht_wt)
      .append('p').text("College: " + response.college)
      .append('p').text("Drafted: " + response.drafted);
    });

}

//build news for second player
function buildNews2(playerName) {

  var url = "/playernews/" + playerName;
  // d3.js to fetch data for the plots
  d3.json(url).then(function(response) {
    console.log(response);

    //display player name header
    d3.select("#player2")
      .html("")
      .append('p')
      .text(playerName + " Info");

    //display player info
    d3.select("#player2_info")
      .html("")
      .append('p').text("Team: " + response.team)
      .append('p').text("Age/DOB: " + response.age_dob)
      .append('p').text("Height/Weight: " + response.ht_wt)
      .append('p').text("College: " + response.college)
      .append('p').text("Drafted: " + response.drafted);
    });

}

function init() {
  // first set of stats
  var selector = d3.select("#selDataset");
  // use list of player names to populate the dropdown
  d3.json("/names").then((playerNames) => {
    playerNames.forEach((player) => {
      selector
        .append("option")
        .text(player)
        .property("value", player);
    });

  // use first player name on the list to build initial plots
  const firstPlayer = playerNames[0];
  buildStats(firstPlayer);
  buildNews(firstPlayer);
  });

  // for the second set of stats
  var secondSelector = d3.select("#selDataset2");

  // use list of player names to populate the dropdown
  d3.json("/names").then((playerNames) => {
    playerNames.forEach((player) => {
      secondSelector
        .append("option")
        .text(player)
        .property("value", player);
    });

  console.log(playerNames);
  // use first player name on the list to build initial plots
  const secondPlayer = playerNames[0];
  buildStats2(secondPlayer);
  buildNews2(secondPlayer);
  });
};

function optionChanged(newPlayer) {
  buildStats(newPlayer);
  buildNews(newPlayer);
};

function optionChanged2(newPlayer) {
  buildStats2(newPlayer);
  buildNews2(newPlayer);
};

init();
