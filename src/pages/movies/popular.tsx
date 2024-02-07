import React, { useEffect, useState } from "react";
import axios from "axios";
import { MovieDetails } from "../../utils/types";
import { Footer } from "../footer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../../assets/styles/movies.css";
import { useNavigate } from "react-router-dom";

export const PopularMovies: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<MovieDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPopularMovies();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get<{ popularMovies: MovieDetails[] }>(
        `http://localhost:4000/api/popular_movies`
      );
      const newPopularMovies = response.data.popularMovies;
      setPopularMovies(newPopularMovies);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleMovieClick = (id: number) => {
    navigate(`/movie/${id}`);
  };

  return (
    <>
      <div style={{marginBottom:'100px'}}>
        {loading && (
          <div className="skeleton react-skeletons">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="skeleton">
                <Skeleton
                  width={170}
                  height={250}
                  baseColor={"#333"}
                  highlightColor={"#444"}
                />
                <div className="center">
                  <Skeleton
                    width={150}
                    height={20}
                    baseColor={"#333"}
                    highlightColor={"#444"}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="react-skeletons">
          {popularMovies.map((movie) => (
            <div
              key={movie.id}
              className="skeleton"
              onClick={() => handleMovieClick(movie.id)}
            >
              <div
                style={{
                  backgroundImage: `url(${movie.images})`,
                  width: "200px",
                  height: "200px",
                }}
                className="image"
              ></div>
              <div className="title">
                <p className="title-movie">
                  {movie.title} (<span>{movie.year}</span>)
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
