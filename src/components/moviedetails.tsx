import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MovieDetails } from '../utils/types';

export const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get<{ movie: MovieDetails }>(`http://localhost:4000/api/movies/${id}`);
        console.log('Full API Response:', response);
        setMovieDetails(response.data.movie);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id, setMovieDetails]);

  return (
    <div>
      {loading && (
        <div>
          <p>Loading...</p>
          <div className="spinner-border" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      )}
      {movieDetails && (
        <div>
          <h2>{movieDetails.title}</h2>
          <p>Title: {movieDetails.title}</p>
          <p>Genre: {movieDetails.genre}</p>
          <p>Country: {movieDetails.country}</p>
          <p>Description: {movieDetails.description}</p>
          <p>Rate: {movieDetails.rate}</p>
          <p>Runtime: {movieDetails.runtime}</p>
          <p>Year: {movieDetails.year}</p>
          <div style={{ backgroundImage: `url(${movieDetails.images})`, width: '200px', height: '200px' }} className="image"></div>
        </div>
      )}
    </div>
  );
};
