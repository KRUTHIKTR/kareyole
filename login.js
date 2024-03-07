const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const pool = mysql.createPool({
  host: 'localhost', // Replace 'localhost' with your MySQL host
  user: 'root',      // Replace 'root' with your MySQL username
  password: 'password',  // Replace 'password' with your MySQL password
  database: 'users' 
});


app.post('frontend/login/login/login.html', (req, res) => {
  const { email, password } = req.body;

  // Query to check if the user exists with provided email and password
  pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        //  send success response
        res.status(200).json({ message: 'Login successful' });
      } else {
        //  send error response
        res.status(401).json({ message: 'Invalid email or password' });
      }
    }
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
