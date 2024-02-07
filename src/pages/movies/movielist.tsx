import React, { useEffect, useState } from "react";
import axios from "axios";
import { MovieDetails } from "../../utils/types";
import { useAuth } from "../../hooks/authContext";
import { useNavigate } from "react-router-dom";
import { Footer } from "../footer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../../assets/styles/movies.css";
import search from "../../assets/images/search.svg";
import deleteIcon from '../../assets/images/delete.svg';

export const Movielist: React.FC = () => {
  const { isLoggedIn, user } = useAuth();
  const [movies, setMovies] = useState<MovieDetails[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleMovies, setVisibleMovies] = useState<number>(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axios.get<{ movies: MovieDetails[] }>(
          "http://localhost:4000/api/movies"
        );
        if (Array.isArray(response.data.movies)) {
          setMovies(response.data.movies);
        } else {
          console.error("Invalid data received from the API:", response.data);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const loadMore = () => {
    setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + 10);
  };

  const deleteMovie = async (id: number) => {
    try {
      setLoading(true);

      if (isLoggedIn() && user?.isAdmin) {
        console.log('User is an admin. Deleting movie...');
        await axios.delete(`http://localhost:4000/api/delete_movie/${id}`);
        setMovies((prevMovies) => prevMovies?.filter((movie) => movie.id !== id));
      } else {
        console.error('Unauthorized: User is not an admin');
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (id: number) => {
    navigate(`/movie/${id}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredMovies = movies?.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <div>
      {loading && (
        <div className="react-skeletons">
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
      <div className="search">
        <input
          type="search"
          className="search-movies"
          placeholder="Поиск фильмов..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="search-icon">
          <img src={search} alt="" className="searchIcon" />
        </div>
      </div>
      <div className="react-skeletons">
        {filteredMovies?.slice(0, visibleMovies).map((movie) => (
          <div
            key={movie.id}
            className="skeleton"
          >
            <div
              onClick={() => handleMovieClick(movie.id)}
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
            {isLoggedIn() && user?.isAdmin && (
              <button onClick={() => deleteMovie(movie.id)} className="btnD">
                <img src={deleteIcon} alt="" className="deleteIcon"/>
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="center">
        <button
          onClick={loadMore}
          style={{
            border: "none",
            color: "#fff",
            marginTop: 40,
            marginLeft: 20,
            height: 40,
          }}
          className='loadM'
        >
          Больше
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
};
