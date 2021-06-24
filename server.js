const express = require('express');
const db = require('./config/db');

const app = express();

//BodyParser Middleware
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 8080;

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/tv', require('./routes/tv'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/search', require('./routes/search'));
app.use('/api/discover', require('./routes/discover'));
app.use('/api/person', require('./routes/person'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Connect to DB
db.connectDB((err) => {
  if (err) {
    console.log('Unable to connect to DB');
    console.log(err);
    process.exit(1);
  } else {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  }
});
