# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Description

The project is quite simple. It is a platform through which you can login using an existing user, display
all questions posted by you and other users, determine the ones you answered and others that remain unanswered, you can also show statistics for all users including the one you used to login with (the score is the sum of the posted questions and the answered questions) and you can create a question on your own and assign to it two options through that link /add.

## How to start the project

1- Unzip the file

2- Run this command, "npm install"

3- Run this command, "npm start"

### App main components

1-Views: those are the main modules that form our system and they are as following:

-- Login : the login page the asks the user to select a user and then navigate to the profile
page

-- Profile: the wrapper of all sub modules in the system that are navigable through the
sidebar. It contains all routes in the system which are displayed in the side bar upon the
navigable property inside the route's object

-- Questions: this page is responsible for displaying all questions of the logged in user
and enable the user to alter between the answered and unanswered questions

-- Form: the form that allows the user to create a question and add two options as answers. Once the
form submits successfully, The user is taken to the questions page updated

-- Leaderboard: This page primarily shows statistics for all users (who posted more questions and answers)
and arrange them in an ascending order.

2- Redux

This folder contains our global store and also the reducer function that combines all reducers to have
their data accessible by all modules easily and seamlessly

3- Default

This folder contains all icons used all over the system and also the global style that applies
to all modules and is common

4- Assets:

The images that are imported in icons.js and exported to all modules to be used easily and
seamlessly

5- Api

It represents the mockData and API's that we have in our system

## The flow of the project

1- The user selects a user from the list of users in the login page and then submits

2- The user can never have access unless a user is selected

3- Once a user is selected, the data of this user is stored in the localStorage (this is usually prone to attacks and is considered lack of security but as we are just dealing with just a mockAPI, it is fine for this project. Yet, the correct behavior is to store the token [JWT or BEARER or so] and fetch the user's data upon this)

4- We fetch all user's data and display each user's data according to the logged in one

5- We list all questions and alter between them using a filter function

6 -When the user creates a question and submits, the question is added to his/her questions page and he/she
can easily have access to it and give a vote

7- If the user tried to access any route inside while he is not logged in, the url redirects him/her to the
login page.

8- If a wrong url entered, NOT FOUND page will show up.

9 - Once the user presses on logout button, the local storage is cleared and the user is taken back to the
login page. He/she must sign in again if they want to proceed

10- The user can display all statistics regarding the users in leaderboard page

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
