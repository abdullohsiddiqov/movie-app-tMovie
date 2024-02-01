const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const movieController = require('./controllers/movieController');
const userController = require('./controllers/userController');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());


app.post('/api/register', userController.registerUser);
app.post('/api/login', userController.loginUser);
app.get('/api/movies', movieController.getAllMovies);
app.get('/api/movies/:id', movieController.getMovieById);
app.get('/api/comments/:id', movieController.getCommentsByMovieId);
app.post('/api/add_movie', movieController.addMovie);
app.delete('/api/delete_movie/:id', movieController.deleteMovie);
app.post('/api/like_movie/:id', movieController.likeMovie);
app.post('/api/comment_movie/:id', movieController.addComment);
app.get('/api/likes_count/:id', movieController.getLikesCount);
app.delete('/api/comment_movie/:id', movieController.deleteComment);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
