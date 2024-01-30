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

const deleteMovie = (req, res) => {
  movieService.deleteMovie(req, res);
};

module.exports = { getAllMovies, getMovieById, addMovie, deleteMovie };
