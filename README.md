MERN Stack Task
This project is a full-stack application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides user authentication functionalities such as signup, signin, forgot password, and reset password.

Features
Signup: Allows users to register for an account by providing a username, email, and password.
Signin: Allows registered users to sign in using their email and password.
Forgot Password: Provides a mechanism for users to reset their password by sending a password reset email to their registered email address.
Reset Password: Allows users to reset their password using a unique token sent to their email address.
Technologies Used
Backend:
Express.js: Web framework for Node.js used for building the API endpoints.
MongoDB: NoSQL database used for storing user information.
Mongoose: ODM (Object Data Modeling) library for MongoDB used for database operations.
bcrypt: Library for hashing passwords.
JWT (JSON Web Tokens): Used for authentication and creating tokens.
Nodemailer: Library for sending emails.
Frontend:
React.js: JavaScript library for building user interfaces.
React Context API: Used for managing global state and user authentication state.
Axios: Promise-based HTTP client for making requests to the backend API.
Getting Started
Clone the repository:

bash
Copy code
git clone https://github.com/vicky848/mern-stack-task.git
Install dependencies:

bash
Copy code
cd mern-stack-task
npm install
Set up environment variables:

Create a .env file in the root directory.
Add the following variables:
makefile
Copy code
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
Run the development server:

bash
Copy code
npm start
Usage
Access the frontend application by navigating to http://localhost:3000 in your web browser.
Access the backend API endpoints for user authentication at http://localhost:3000/api/signup, http://localhost:3000/api/signin, etc.
Contributing
Contributions are welcome! Feel free to submit pull requests or open issues for any improvements or bug fixes.
