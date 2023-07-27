# CrossFit-Angular-Project

This is an app that lets you share your favorite workout or find one. If you are not a logged in user, you can see in the navigation: home , allWorkouts , login and register. After successful registration or login, the navigation changes and you can now see the workouts created by you and create new ones, edit, delete, like, search. Start training change your life!

# Technologies Used
 - Angular CLI
 - TypeScript
 - Node.js
 - Express.js
 - MongoDB with Mongoose

# Installation
 - Clone the repository: https://github.com/MADNMD/CrossFit-Angular-Project.git
  # Rest-Api
   - Navigate to the project folder: `cd Rest-api`
   - Install dependencies: `npm i`
 # crossFit-app
  - Navigate to the project folder: `cd crossFit-app`
  - Install dependencies: `npm i`

# Usage
 - Run the server: `npm start`
 - Server is listening at port 3000: `http://localhost:3000`
 - ---------------------------
 - Run the Angular app: `npx ng s`
 - Access the app in your browser at: `http://localhost:4200`

# API Endpoints
 - `POST /users/login`: Logged user
 - `POST /users/register`: Register user
 - `GET /users/logout`: Logout user
 - `GET /users/user`: The currently logged user
 - `GET /workouts/allWorkouts`:  Get a list of all workouts
 - `POST /workouts/create`: Create a new workout
 - `GET /workouts/details/:workoutId`: Ddetails a workout by ID
 - `PUT /wokrouts/edit/:workoutId`: Update an existing workout by ID
 - `DELETE /workouts/delete/:workoutId`: Delete a workout by ID
 - `GET /workouts/myWorkouts/:userId`: Get all workouts created by a specific user
 - `POST /workouts/like/:workoutId`: Like a workout by ID
 - `POST /workouts/unlike/:workoutId`: Unlike a workout by ID

   # License
   - MIT License
