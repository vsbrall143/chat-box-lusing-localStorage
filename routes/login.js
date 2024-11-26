const express = require('express');
const session = require('express-session');
const fs = require('fs');

const app = express();

// Add body parser middleware
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

// Function to retrieve username from session
 

// Login route (GET) - Sends login form
router.get("/login", (req, res, next) => {
  res.send(`
    <form id="loginForm" method="POST" action="/chat">
      <input type="text" name="username" id="username" placeholder="Enter Username">
      <button type="submit">Login</button>
    </form>
    <script>
      document.getElementById('loginForm').addEventListener('submit', function(event) {
         event.preventDefault();   // Prevent default form submission
         const username = document.getElementById('username').value;   // Get the value of the input field
         localStorage.setItem('username', username);    // Store the username in localStorage
         this.submit();     // Manually submit the form after saving
      });
    </script>
  `);
});

// Login route (POST) - Handles login and redirects
router.post("/login", (req, res, next) => {
 
  console.log(req.body)
  res.redirect("/chat");  
});

app.use(router);

module.exports = app;
