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
      images TEXT
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

const addMovie = (req, res) => {
  const { title, description, rate, year, runtime, genre, country, images } = req.body;
  const newMovie = new Movie(null, title, description, rate, year, runtime, genre, country, images);

  db.run(`
    INSERT INTO movies (title, description, rate, year, runtime, genre, country, images)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [newMovie.title, newMovie.description, newMovie.rate, newMovie.year, newMovie.runtime, newMovie.genre, newMovie.country, newMovie.images], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'Movie added successfully' });
    }
  });
};

const deleteMovie = (req, res) => {
  const movieId = req.params.id;

  db.run('DELETE FROM movies WHERE id = ?', [movieId], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (this.changes > 0) {
        res.json({ message: 'Movie deleted successfully' });
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
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

module.exports = { getAllMovies, addMovie, deleteMovie, getMovieById };
