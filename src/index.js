const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const movieController = require('./controllers/movieController');
const userController = require('./controllers/userController');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/movies', movieController.getAllMovies);
app.get('/api/movies/:id', movieController.getMovieById);
app.post('/api/add_movie', movieController.addMovie);
app.delete('/api/delete_movie/:id', movieController.deleteMovie);

app.post('/api/register', userController.registerUser);
app.post('/api/login', userController.loginUser);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
