const express = require('express');
// const connectDB = require('./config/db');

const app = express();

// Connect to DB
// connectDB();

//BodyParser Middleware
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 8080;

// Routes
app.use('/api/movies', require('./routes/movies'));
app.use('/api/tv', require('./routes/tv'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/search', require('./routes/search'));
app.use('/api/discover', require('./routes/discover'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
