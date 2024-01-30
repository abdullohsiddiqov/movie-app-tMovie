import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MovieDetails } from "../utils/types";
import "../assets/styles/moviedetails.css";
export const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get<{ movie: MovieDetails }>(
          `http://localhost:4000/api/movies/${id}`
        );
        console.log("Full API Response:", response);
        setMovieDetails(response.data.movie);
      } catch (error) {
        console.error("Error fetching movie details:", error);
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
        <div className="main-container">
          <div className="container">
            <div className="main-box">
              <div
                className="image"
                style={{ backgroundImage: `url(${movieDetails.images})` }}
              ></div>
              <div className="titlesbox">
                <div className="box1">
                  <h3>Title:</h3>
                  <p>{movieDetails.title}</p>
                </div>
                <div className="box2">
                  <h3>Year:</h3>
                  <p>{movieDetails.year}</p>
                </div>
                <div className="box1">
                  <h3>Country:</h3>
                  <p>{movieDetails.country}</p>
                </div>
                <div className="box2">
                  <h3>Genre:</h3>
                  <p>{movieDetails.genre}</p>
                </div>
                <div className="box1">
                  <h3>Runtime:</h3>
                  <p>{movieDetails.runtime}</p>
                </div>
              </div>
            </div>
            <div className="main-box2">
              <h3 className="text">Description:</h3>
              <p className="text2">{movieDetails.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
