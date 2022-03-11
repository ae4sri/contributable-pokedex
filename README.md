# Contributable Pokedex ("OpenDex")
A contributable, searchable Pokedex built using Apollo Server. This is the repository for the backend of the project, the front-end can be found here: https://github.com/ae4sri/contributable-pokedex-frontend

This is my take on a Pokedex app; it allows for users to add their own Pokemon using a given form, allowing them to choose their own statistics, adding an image, abilities, etc. Users are able to report user-generated Pokemon, and an administrator (more about this below) is able to see those reports and take action on them using a customized admin page.
The backend is a GraphQL server written in javascript, using Apollo Server. Currently, the database is a SQLite file, and better-sqlite-3 is used to communicate with the database. 

## Structure

The server itself is run and defined in index.js, which uses /databaseHandlers/resolverHelper.js to handle actions for queries and mutation. /databaseHandlers/sqlQueries.js stores the SQL queries that resolerHelper.js will import and run using better-sqlite-3.

/utils/ simply contains one file; parsing.js, which validates input for Pokemon being contributed to the database, and returns an error should something be invalid.

## Queries 
### search
Given any amount of the specified parameters, return the Pokemon filtered out using the non-empty parameters.

### numOfPokemon
Return the number of Pokemon in the database.

### seeReports
(requires the admin key in the authorization header)
Returns every report in the database.

### login
*Users do not exist in this application*. There should be an admin key stored in a .env file on the backend, <ADMIN_KEY='ExampleSecretKey'> (without the angle brackets). This query will simply return whether the authorization key in the request matches the secret key on the backend. This is necessary to access the admin page on the front-end.

## Mutations

### addPokemon

Given the required parameters (the ones marked with !), this will check if the given arguments were valid, and add if so, add another Pokemon to the database using the arguments.

### addReport

Using the given parameters, this will validate the input, and if it's valid, create a new report for admins to view and possibly take action on.

### removePokemon
Remove a Pokemon from the database given its name.

### removeReport
Remove a report from the database given its id.

## How to Run

Simply run `npm run dev` to run the server. 

## Images
*(these are of the front-end, linked above)*

### Index Page
<img src="/readMe/index.png">

### Create Page
<img src="/readMe/createPage.png">

### Search Page
<img src="/readMe/searchPage.png">

### Admin Page
<img src="/readMe/reportsPage.png">

### Some Custom Pokemon
<img src="/readMe/customPokemon.png">

### A Pokemon's Modal (what appears when "Learn More" is clicked)
<img src="/readMe/kirbyModal.png">

