import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/NBATOP10STATS_v4.sqlite"
db = SQLAlchemy(app)
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
NBATOP = Base.classes.nbatop
NBANEWS = Base.classes.nbanews

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/statspage")
def stats():
    """Returns the Stats page."""
    return render_template("statspage.html")

@app.route("/names")
def names():
    """Return a list of players' names."""
    # Use Pandas to perform the sql query and create a DataFrame
    stmt = db.session.query(NBATOP).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the Player names
    return jsonify(list(df.Player.unique()))

@app.route("/stats/<playerName>")
def player_stats(playerName):
    """Career Stats Information"""
    stmt = db.session.query(NBATOP).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    df = df.rename(columns={"FG%": "FGP", "3PTM": "TPTM", "3PTA": "TPTA", "3PT%": "TPTP", "FT%": "FTP"})

    # Filter data to hone down on player name and return certain stats
    sample_data = df.loc[df["Player"] == playerName, ['Player', 'Year', 'Team', 'G', 'Min', 'FGM', 'FGA', 'FGP',
       'TPTM', 'TPTA', 'TPTP', 'FTM', 'FTA', 'FTP', 'Off', 'Def', 'Tot', 'Ast',
       'TO', 'Stl', 'Blk', 'PF', 'Pts']]

    # # Format the data to send as json
    data = {
        "year": sample_data.Year.values.tolist(),
        "team": sample_data.Team.values.tolist(),
        "games": sample_data.G.values.tolist(),
        "minutes": sample_data.Min.values.tolist(),
        "field_goals_made": sample_data.FGM.values.tolist(),
        "field_goals_attempt": sample_data.FGA.values.tolist(),
        "field_goals_percent": sample_data.FGP.values.tolist(),
        "three_points_made": sample_data.TPTM.values.tolist(),
        "three_points_attempt": sample_data.TPTA.values.tolist(),
        "three_points_percent": sample_data.TPTP.values.tolist(),
        "free_throws_made": sample_data.FTM.values.tolist(),
        "free_throws_attempt": sample_data.FTA.values.tolist(),
        "free_throws_percent": sample_data.FTP.values.tolist(),
        "off":  sample_data.Off.values.tolist(),
        "def":  sample_data.Def.values.tolist(),
        "tot":  sample_data.Tot.values.tolist(),
        "ast":  sample_data.Ast.values.tolist(),
        "turnovers":  sample_data.TO.values.tolist(),
        "steals":  sample_data.Stl.values.tolist(),
        "blocks":  sample_data.Blk.values.tolist(),
        "personal_fouls":  sample_data.PF.values.tolist(),
        "pts":  sample_data.Pts.values.tolist()
    }
    return jsonify(data)


@app.route("/news")
def news_data():
    """News"""
    stmt = db.session.query(NBANEWS).statement
    df2 = pd.read_sql_query(stmt, db.session.bind)

    #format data as json
    news_data = {
        "img": df2['news_img'][0],
        "title": df2['news_title'][0],
        "players": df2['players'].values.tolist()
    }
    return jsonify(news_data)

if __name__ == "__main__":
    app.run(debug=True)
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
