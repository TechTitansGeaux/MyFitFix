# MyFitFix - Neil the Mippy's Workout Extravaganza

## Intro
Welcome to our fitness app MyFitFix. This app is a weightlifting workout tracker.

## Features
Users will be able to track 4 different things: the amount of calories taken in, the amount of calories burned in a workout session, the various weightlifting workouts that you did (with instructions on search), and a journal to track anything in the day that worked for you or didn't

## Setup and Starting Up (Development)
For anyone that is looking to work with this app, here are the things you will need to get started
- When forked down, make sure to run npm install to get all the dependencies that you will need for the project.
  - NOTE: passport has a bug on the latest version where req.session.regenerate is not a function. To fix this make sure to uninstall passport and run this command: `npm install --save passport@0.5`
- To start the server, run `sudo mongod` in a terminal (THIS PROJECT IS SET TO WORK WITH MONGODB)
- You can create seed data, however it is not required to run the app
- Create an env file, and add a `client_id` and `clientSecret` which are you google auth credentials
- You will need api keys from these websites to pull data: https://api.api-ninjas.com/v1/caloriesburned, https://api.calorieninjas.com/v1/nutrition, https://api.api-ninjas.com/v1/exercises
- Add your keys to the env files with the names: `nutritionApi`, `workoutKey`, `CALORIES_BURNED_API`
- Add a `cookieKey` to you env file (the value can be anything, as it will be hashed and salted)
- Finally run `npm run build` and `npm start`, then visit localhost:8020 to see the app in action

## Tech Stack
Here is the tech stack for this project
- Deploy: AWS EC2 Ubuntu
- Front-End: React
- Server: Express
- DB: MongoDB with Mongoose
- Auth: Passport-OAuth2
- APIs: https://api.api-ninjas.com/v1/caloriesburned, https://api.calorieninjas.com/v1/nutrition, https://api.api-ninjas.com/v1/exercises
- Linting: Eslint / AirBnB
- Build: Webpack
- Styling: TailwindCSS

## Contact Us
- With any troubleshooting, please feel free to reach out via Github Issues @ https://github.com/powerpuffyall/MyFitFix/issues
