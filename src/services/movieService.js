const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('movies.db');

const Movie = require('../models/movieModel');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      rate REAL,
      year INTEGER,
      runtime INTEGER,
      genre TEXT,
      country TEXT,
      images TEXT,
      comments TEXT,
      videoLink TEXT,
      likes INTEGER DEFAULT 0
    )
  `);
});

const getAllMovies = (req, res) => {
  db.all('SELECT * FROM movies', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.json({ movies: rows });
    }
  });
};

const incrementLikes = (movieId, callback) => {
  db.run('UPDATE movies SET likes = likes + 1 WHERE id = ?', [movieId], function (err) {
    if (err) {
      console.error(err.message);
      callback(err);
    } else {
      callback(null, this.changes);
    }
  });
};

const getLikesCount = (movieId, callback) => {
  db.get('SELECT likes FROM movies WHERE id = ?', [movieId], (err, row) => {
    if (err) {
      console.error(err.message);
      callback(err);
    } else {
      if (row) {
        callback(null, row.likes);
      } else {
        callback(null, 0);
      }
    }
  });
};

const addMovie = (req, res) => {
  const { title, description, rate, year, runtime, genre, country, images, videoLink } = req.body;
  const newMovie = new Movie(null, title, description, rate, year, runtime, genre, country, images, null, videoLink);

  db.run(`
    INSERT INTO movies (title, description, rate, year, runtime, genre, country, images, videoLink)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [newMovie.title, newMovie.description, newMovie.rate, newMovie.year, newMovie.runtime, newMovie.genre, newMovie.country, newMovie.images, newMovie.videoLink], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'Movie added successfully' });
    }
  });
};

const getMovieById = (req, res) => {
  const movieId = req.params.id;

  db.get('SELECT * FROM movies WHERE id = ?', [movieId], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (row) {
        res.json({ movie: row });
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    }
  });
};

const likeMovie = (req, res) => {
  const movieId = req.params.id;

  incrementLikes(movieId, (err, changes) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (changes > 0) {
        res.json({ message: 'Movie liked successfully' });
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    }
  });
};

const addComment = (movieId, comment, callback) => {
  db.run('UPDATE movies SET comments = COALESCE(comments, "") || ? WHERE id = ?', [comment, movieId], function (err) {
    if (err) {
      console.error(err.message);
      callback(err);
    } else {
      callback(null, this.changes);
    }
  });
};

const getCommentsByMovieId = (movieId, callback) => {
  db.get('SELECT comments FROM movies WHERE id = ?', [movieId], (err, row) => {
    if (err) {
      console.error(err.message);
      callback(err);
    } else {
      if (row && row.comments) {
        const comments = row.comments.split(',').map(comment => ({ comment }));
        callback(null, comments);
      } else {
        callback(null, []);
      }
    }
  });
};

const deleteMovie = (movieId, callback) => {
  db.run('DELETE FROM movies WHERE id = ?', [movieId], function (err) {
    if (err) {
      console.error(err.message);
      callback(err);
    } else {
      callback(null, this.changes);
    }
  });
};

module.exports = { getAllMovies, addMovie, likeMovie, getMovieById, getLikesCount, addComment, getCommentsByMovieId, deleteMovie };

