const express = require('express');
const mysql = require('mysql');

const app = express();

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// Handle POST request to receive amount
app.use(express.urlencoded({ extended: true }));

app.post('/send-amount', (req, res) => {
  const { amount } = req.body;
  
  // Perform database operation to insert the amount
  const sql = `INSERT INTO admin (amount) VALUES (${amount})`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Amount sent successfully');
    res.send('Amount sent successfully');
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
