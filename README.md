# MyFitFix - Neil the Mippy's Workout Extravaganza

## Intro
Welcome to our fitness app MyFitFix. This app is a weightlifting workout tracker.

## Features
Once a user logs in, the app renders a dashboard. The dashboard reflects the user’s daily caloric intake, calories burned, and whether they submitted a journal entry or workout for the day.

Utilizing the navigation bar, a user can navigate to different components, such as the Calorie Tracker, Workout Plan, and Journal to update their dashboard.

The **Calorie Tracker** option renders two forms: a form where a user can weigh food, based on ingredients, which returns the total calories for those ingredients and a second form where a user can input their current weight and total time they have exercised for the day, returning their total burned calories.

The **Workout Plan** option allows you to search through different exercises by clicking on an image of the human body, based on muscle groups and allows a user to save those specific exercises. A user can find their saved exercises utilizing the ‘Search Workout By Date’ section.

The **Journal** option allows you to document anything, whether it’s your fitness goals to anything in your daily life. You are able to save, retrieve, and delete any entry. Posting a Journal entry sends it to the Feed.

The **Quotes** option allows you to generate a motivational quote and then save or edit it. The user can view all previously saved quotes.

The **Messages** option allows you to search for other users logged in the app and directly message them.

The **Feed** options allows you to see and like other Journal entries from other users. Users are also able to follow, unfollow, and search for other users.

## Setup and Starting Up (Development)
For anyone that is looking to work with this app, here are the things you will need to get started
- Ensure node version 18.
- When forked down, make sure to run npm install to get all the dependencies that you will need for the project.
  - NOTE: passport has a bug on the latest version where req.session.regenerate is not a function. To fix this make sure to uninstall passport and run this command: `npm install --save passport@0.5`
- To start the server, run `sudo mongod` (needed to start mongodb service in Ubuntu) in a terminal (THIS PROJECT IS SET TO WORK WITH MONGODB)
- Running `npm start` will seed the database.
- Create an env file, and add a `client_id` and `clientSecret` which are you google auth credentials
- You will need api keys from these websites to pull data: https://api.api-ninjas.com/v1/caloriesburned, https://api.calorieninjas.com/v1/nutrition, https://api.api-ninjas.com/v1/exercises
- Add your keys to the env files with the names: `nutritionApi`, `workoutKey`, `CALORIES_BURNED_API`
- Add a `cookieKey` to you env file (the value can be anything, as it will be hashed and salted)
- Finally run `npm run build` and `npm start`, then visit localhost:8020 to see the app in action
- Known bug: the code as it is written right now only saves user sessions for 24 hours. After this, it will not recognize a user. To circumvent this problem until fixed, drop the users collection from the database when the issue arises. This will allow a user to log in again, creating a new session.

## Tech Stack
Here is the tech stack for this project
- Deploy: AWS EC2 Ubuntu
- Front-End: React
- Server: Express
- DB: MongoDB with Mongoose
- Auth: Passport-OAuth2
- APIs: https://api.api-ninjas.com/v1/caloriesburned, https://api.calorieninjas.com/v1/nutrition, https://api.api-ninjas.com/v1/exercises, https://api-ninjas.com/api/quotes
- Linting: Eslint / AirBnB
- Build: Webpack
- Styling: TailwindCSS
- WebSockets: socket.io, socket.io-client, cors
- Calorie display/tracker: recharts

## Contributors
Thanks to all the following people for contributing to this project:

**Original Contributors**:

- [@JordanMan](https://github.com/jordan-mann)
- [@SophiaRosely](https://github.com/sophiarosely)
- [@NeilShapiro](https://github.com/neilthemippy)
- [@AndrewVaquez](https://github.com/dREWbxKewb)

**Additional Contributors**:
- [@EdwardCooper](https://github.com/cooptothe)
- [@BernieJanuary](https://github.com/janvierjr)
- [@BenjaminKlein](https://github.com/Benjaminklein99)
- [@SamsonThai](https://github.com/skanda108)
- [@JackieWisdom](https://github.com/wisdomjackie)

## Contact Us
- With any troubleshooting, please feel free to reach out via Github Issues @ https://github.com/powerpuffyall/MyFitFix/issues

## Known Issues
- Logout button does not work except when user is in Dashboard
- Scaling issue when shrinking the window. Navbar becomes distorted
