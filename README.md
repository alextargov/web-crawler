# Web Crawler

The first individual project @ Telerik Alpha Academy - JS track

## Project members

| #        | First name | Last name  |
| -------- | --------- 	| ---------- |
| 1.	     | Alexander 	| Targov	   |

## App Description

The Web Crawler is a Node.js CLI application that scrapes https://www.themoviedb.org & http://www.imdb.com
The information gathered is stored in a DB and then visualized. The user can perform different operations over the information, such as: filtering, searching, sorting, updating. The application doesn't use the APIs of IMDB and TMDB. In fact it gets a page url (e.g. https://www.themoviedb.org/movie?page=1 ), parses it with __jsdom__ and with __jquery__ the movies' URLs are gathered. Then the application parses all of the urls again with __jsdom__ and with __jquery__ the necessary data is gathered. All this is done asynchronously using __Promises__ and __Async/Awaits__. The data visualization is table structured using __columnify__. 

## Dependancies

  * Columnify
  * jQuery
  * jsdom
  * mysql
  * mysql2
  * sequelize
  * sequelize-auto-migraions
  * yargs
