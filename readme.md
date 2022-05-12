# Chat App

Built with:
- SocketIO
- React
- Node
- Express
- MongoDB/Mongoose
- Docker

## Setting up the environment and install dependencies:

1. Clone this repository to your local machine.
2. Make sure you have Docker installed and the Docker daemon running. This is required to spin up an instance of MongoDB on your machine.
3. Navigate to frontend directory and run ```npm install``` to install node modules.
4. Navigate to backend directory and run ```npm install``` to install node modules.

## Starting the application:

5. Open 3 separate terminal instances with your terminal; we'll need all three to run this application.
6. In one of your terminal shells run ```npm run db``` *from the backend directory* to spin up the docker container with MongoDB instance and wait for it to initialize.
7. Run ```npm start``` from the backend directory.
8. Run ```npm start``` from the frontend directory.
9. Navigate to the browser, open as many windows as you like and have fun chatting with yourself from each window.


