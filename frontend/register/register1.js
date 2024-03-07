const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const pool = mysql.createPool({
  host: 'localhost:3306', // Replace 'localhost' with your MySQL host
  user: 'root',      // Replace 'root' with your MySQL username
  password: 'Password',  // Replace 'password' with your MySQL password
  database: 'users' 
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Check if the email already exists
  pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        // Email already exists, send error response
        res.status(400).json({ message: 'Email already exists' });
      } else {
        // Email doesn't exist, insert new user into the database
        pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (error, results) => {
          if (error) {
            res.status(500).json({ message: 'Internal Server Error' });
          } else {
            // User registered successfully, send success response
            res.status(200).json({ message: 'Registration successful' });
          }
        });
      }
    }
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
