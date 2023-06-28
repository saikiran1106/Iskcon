const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3000;

// Connect to SQLite database
const db = new sqlite3.Database('clicks.db');

// Create a table to store click counts if it doesn't exist
db.run('CREATE TABLE IF NOT EXISTS clicks (id INTEGER PRIMARY KEY AUTOINCREMENT, count INTEGER DEFAULT 0)');

// Add CORS middleware to allow all origins
app.use(cors());

// API endpoint to increment the click count
app.post('/api/increment-click/mala', (req, res) => {
  // Increment the click count
  db.run('UPDATE clicks SET count = count + 1 WHERE id = 1', (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Click count incremented successfully' });
    }
  });
});

app.post('/donate', (req, res) => {
  // Increment the click count
  db.run('UPDATE clicks SET count = count + 1 WHERE id = 2', (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Click count incremented successfully' });
    }
  });
});

app.post('/live', (req, res) => {
  // Increment the click count
  db.run('UPDATE clicks SET count = count + 1 WHERE id = 3', (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Click count incremented successfully' });
    }
  });
});

// API endpoint to get the click count
app.get('/api/click-count', (req, res) => {
  // Retrieve the click count
  db.get('SELECT count FROM clicks WHERE id = 1', (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const count = row ? row.count : 0;
      res.status(200).json({ count });
    }
  });
});

app.get('/donate', (req, res) => {
  // Retrieve the click count
  db.get('SELECT count FROM clicks WHERE id = 2', (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const count = row ? row.count : 0;
      res.status(200).json({ count });
    }
  });
});

app.get('/live', (req, res) => {
  // Retrieve the click count
  db.get('SELECT count FROM clicks WHERE id = 3', (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const count = row ? row.count : 0;
      res.status(200).json({ count });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
