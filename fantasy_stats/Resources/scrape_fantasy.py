# import Libraries
from splinter import Browser
from bs4 import BeautifulSoup as bs
import pprint
import requests as r
import pandas as pd
import time
import pymongo
from selenium import webdriver

# setting up splinter
def init_browser():
    executable_path= {"executable_path":"/usr/local/bin/chromedriver"}
    return Browser("chrome", **executable_path, headless= False)

#scrape News and Img
def  scrape_nba_fantasy():

    #initialize browser
    browser = init_browser()

    #create nba_dict to insert into mongo
    nba = {}
#----------------------------------------------------------------------

    #Visit Nba Fantasy News Site
    url = "http://www.rotoworld.com/sports/nba/basketball?ls=roto:nba:gnav"
    browser.visit(url)

    # config the html to get news (scrape page into soup)
    #Scrape page into soup
    html = browser.html
    soup= bs(html,"html.parser")

    # find news title and Paragraph

    news_title = soup.find("div", class_="excerpt").get_text()
    news_img = soup.select_one('div.RW_mainstory img[src]')['src']

    # print(news_title)
    # print(news_img)

    #adding news_title and news_img to the dictionary
    nba['news_title']= news_title
    nba['news_img']= news_img

#------------------------------------------------------------------------

    # setting up the URL and browser
    url = "https://www.fantasypros.com/nba/rankings/overall.php"
    browser.visit(url)

    #Scrape page into soup
    html = browser.html
    soup= bs(html,"html.parser")

    # find nba top_players

    top_players = soup.find_all("td", class_="player-label")
    players = []
    for a in top_players[:10]:
        # print(a.text)
        player = a.text
        players.append(player)

        # print(players)

        nba['players']= players


    # return Results
    return nba
