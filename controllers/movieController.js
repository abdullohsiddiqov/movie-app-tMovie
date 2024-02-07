const movieService = require('../services/movieService');

const getAllMovies = (req, res) => {
  movieService.getAllMovies(req, res);
};

const getMovieById = (req, res) => {
  movieService.getMovieById(req, res);
};

const addMovie = (req, res) => {
  movieService.addMovie(req, res);
};

const likeMovie = (req, res) => {
  movieService.likeMovie(req, res);
};

const addComment = (req, res) => {
  const movieId = req.params.id;
  const { comment } = req.body;

  movieService.addComment(movieId, comment, (err, changes) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (changes > 0) {
        res.json({ message: 'Comment added successfully' });
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    }
  });
};

const getLikesCount = (req, res) => {
  const movieId = req.params.id;

  movieService.getLikesCount(movieId, (err, likesCount) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.json({ likesCount });
    }
  });
};

const getCommentsByMovieId = (req, res) => {
  const movieId = req.params.id;

  movieService.getCommentsByMovieId(movieId, (err, comments) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.json({ comments });
    }
  });
};

const deleteMovie = (req, res) => {
  const movieId = req.params.id;

  movieService.deleteMovie(movieId, (err, changes) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (changes > 0) {
        res.json({ message: 'Movie deleted successfully' });
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    }
  });
};

const deleteComment = (req, res) => {
  const movieId = req.params.id;
  const { comment } = req.body;

  movieService.deleteComment(movieId, comment, (err, changes) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (changes > 0) {
        res.json({ message: 'Comment deleted successfully' });
      } else {
        res.status(404).json({ message: 'Comment not found' });
      }
    }
  });
};

const updateMovieRating = (req, res) => {
  const movieId = req.params.id;
  const { newRating } = req.body;

  movieService.updateMovieRating(movieId, newRating, (err, changes) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (changes > 0) {
        res.json({ message: 'Movie rating updated successfully' });
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    }
  });
};

const getLikedMoviesByUser = (req, res) => {
  const userId = req.params.userId;

  movieService.getLikedMoviesByUser(userId, (err, movies) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.json({ likedMovies: movies });
    }
  });
};

const getPopularMovies = (req, res) => {
  movieService.getPopularMovies((err, movies) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.json({ popularMovies: movies });
    }
  });
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  likeMovie,
  addComment,
  getLikesCount,
  getCommentsByMovieId,
  deleteMovie,
  deleteComment,
  updateMovieRating,
  getLikedMoviesByUser,
  getPopularMovies
};
