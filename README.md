# MyFitFix - Neil the Mippy's Workout Extravaganza

## Intro
Welcome to our fitness app MyFitFix. This app is a weightlifting workout tracker.

## Features
Once a user logs in, the app renders a dashboard. The dashboard reflects the user’s daily caloric intake, calories burned, and whether they submitted a journal entry or workout for the day.

Utilizing the navigation bar, a user can navigate to different components, such as the Calorie Tracker, Workout Plan, and Journal to update their dashboard.

The **Calorie Tracker** option renders two forms: a form where a user can weigh food, based on ingredients, which returns the total calories for those ingredients and a second form where a user can input their current weight and total time they have exercised for the day, returning their total burned calories.

The **Workout Plan** option allows you to search through different exercises, based on muscle groups and allows a user to save those specific exercises. A user can find their saved exercises utilizing the ‘Search Workout By Date’ section.

The **Journal** option allows you to document anything, whether it’s your fitness goals to anything in your daily life. You are able to save, retrieve, and delete any entry on any specific date.

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
- Known bug: the code as it is written right now only saves user sessions for 24 hours. After this, it will not recognize a user. To circumvent this problem      until fixed, drop the users collection from the database when the issue arises. This will allow a user to log in again, creating a new session.

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
