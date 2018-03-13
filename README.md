# Web Crawler

The first individual project @ Telerik Alpha Academy - JS track

## Project members

| #        | First name | Last name  |
| -------- | --------- 	| ---------- |
| 1.	     | Alexander 	| Targov	   |

## App Description

The Web Crawler is a Node.js CLI application that scrapes https://www.themoviedb.org & http://www.imdb.com.
The information gathered is stored in a DB and then visualized. The user can perform different operations over the information, such as: filtering, searching, sorting, updating. The application doesn't use the APIs of IMDB and TMDB. In fact it gets a page url (e.g. https://www.themoviedb.org/movie?page=1 ), parses it with __jsdom__ and using __jquery__ the movies' URLs are gathered. Then the application parses all of the movies' urls again with __jsdom__. With __jquery__ the necessary data is then gathered and stored in the db. All this is done asynchronously using __Promises__ and __Async/Awaits__. The data visualization is table structured using __columnify__. 

## Commands
 * statistics
  * filter
   * runtime
      * [option] gt -> Filters the entries by runtime greater than provided __value__
      * [option] lt -> Filters the entries by runtime lower than provided __value__
      * [option] eq -> Filters the entries by runtime equals provided __value__
   * rating
      * [option] gt -> Filters the entries by runtime greater than provided __value__
      * [option] lt -> Filters the entries by runtime lower than provided __value__
      * [option] eq -> Filters the entries by runtime equals provided __value__
   * language
      * [option] name -> Filter the entries by provided language
   * genre
      * [option] name -> Filter the entries by provided genre
  * search
      * [option] director -> Search the entries by provided director name
      * [option] movie -> Search the entries by provided movie name
  * sort
      * [option] [required] [choices: ['revenue', 'rating', 'runtime', 'title']] by -> Sort entries by __value__
      * [option] [choices: ['asc', 'desc']] order -> Sort entries in ascending/descending order. __Default: desc__
 * update -> Deletes the db entries, scrapes the information and stores it in the db
 * get-all -> Gets the information from the db and visualizes it in the console
 
 #### All of the commands visualize the data, except the __update__ command.
## Dependancies

  * Columnify
  * jQuery
  * jsdom
  * mysql
  * mysql2
  * sequelize
  * sequelize-auto-migrations
  * yargs
