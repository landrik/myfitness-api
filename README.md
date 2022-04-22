# MyFitness REST API Project

A backend api project for workout/fitness tracker that helps track your workout reps, sets, total amount of weight lifted and more! 

the workout tracker has a dashboard that will display your progress through out the different types of workouts either being resistance or cardio.
.

## Technologies used
* Node.JS
* Express
* MongoDB
* Mongoose
* REST API
* JSON
* ReactNative
* JavaScript 
* PUG
* CSS3
* Heroku

## User Stories

1. I can create a user by posting form data username to /api/users/new-user and returned will be an object with username and _id.
2. I can get an array of all users by getting api/exercise/users with the same info as when creating a user.
3. I can add an exercise to any user by posting form data userId(_id), description, duration, and optionally date to /api/exercise/add. If no date supplied it will use current date. Returned will be the user object with also with the exercise fields added.
4. I can retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(_id). Return will be the user object with added array log and count (total exercise count).
5. I can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)

# Links
## <img src = "readme/images/herokuLogo.png"><a href="https://myfitness-api.herokuapp.com/">Heroku</a> deployed application

## <img src ="readme/images/githubLogo.png"> <a href="https://github.com/landrik/myfitness-api">Github</a> code link

# Credit
<li>The Net Ninja's <a href ="https://www.youtube.com/watch?v=sEkRmVfc8XE&t=206s">youtube REST API Tutorial (Node, Express & Mongo) </a> tutorial</li>
Net Ninja helped me understand more of the CRUD operations

# Copyright
Code is on Github, free to look and use.
