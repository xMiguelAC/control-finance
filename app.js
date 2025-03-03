const express = require('express');

// init app and middleware
const app = express();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// routes
app.get('/home', (req, res) => {
    res.json({ message: 'Welcome to the home page' });
});
