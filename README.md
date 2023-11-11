# CrossFit-Angular-Project

This is an app that lets you share your favorite workout or find one. If you are not a logged in user, you can see in the navigation: start, all workouts, login and registration. After successful registration or login, the navigation changes and you can now see your profile and edit it, the workouts you created and create new ones, edit, delete, like and search. Start training, change your life!

**[https://corssfit.netlify.app](https://corssfit.netlify.app)**

## Test User

To explore the app's features without registering, you can use the following test user credentials:

- **Username:** test123@abv.bg
- **Password:** 12345

# Technologies Used
 - Angular CLI
 - TypeScript
 - HTML/CSS
 - JavaScript
 - Node.js
 - Express.js
 - MongoDB with Mongoose

# Installation
1. Clone the repository: https://github.com/MADNMD/CrossFit-Angular-Project.git

 ### Setting Up the Cloud Database

2. Use MongoDB Atlas, a cloud-based database service, to store and manage data. Follow these steps to set up your cloud database:

   - Sign up for an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster and configure your database settings
   - Obtain your MongoDB connection string

### Deploying the Server

3. Deploy server using [render.com](https://render.com), a platform for hosting applications. To deploy the server:

   - Sign up for an account on [render.com](https://render.com)
   - Configure your server settings and deploy your REST API

### Deploying the Angular App

4. We use [Netlify](https://www.netlify.com) to host the client-side of our app. To deploy the Angular app:

   - Sign up for an account on [Netlify](https://www.netlify.com)
   - Configure your app settings and deploy your Angular app

# Usage
Once you've created your cluster, set up the server, and deployed the Angular app, you can access and interact with the app using the provided URLs.

# API Endpoints
 - `POST /users/login`: Logged user
 - `POST /users/register`: Register user
 - `GET /users/logout`: Logout user
 - `GET /users/user`: The currently logged user
 - `PUT /users/edit/:userId`: Update an existing user by ID
 - `DELETE /users/delete/:userId`: Delete a user by ID
 - `GET /workouts/allWorkouts`:  Get a list of all workouts
 - `POST /workouts/create`: Create a new workout
 - `GET /workouts/details/:workoutId`: Ddetails a workout by ID
 - `PUT /wokrouts/edit/:workoutId`: Update an existing workout by ID
 - `DELETE /workouts/delete/:workoutId`: Delete a workout by ID
 - `GET /workouts/myWorkouts/:userId`: Get all workouts created by a specific user
 - `POST /workouts/like/:workoutId`: Like a workout by ID
 - `POST /workouts/unlike/:workoutId`: Unlike a workout by ID
 - `GET /workouts/search`: Search for a workout by type

   # License
   - MIT License

   # Screenshots

   ## Home Page
   ![My Image](https://github.com/MADNMD/CrossFit-Angular-Project/blob/main/Screenshot%20(39).png)
