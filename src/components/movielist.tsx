import React, { useEffect, useState } from "react";
import axios from "axios";
import { MovieDetails } from '../utils/types';
import { useAuth } from '../hooks/authContext';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../assets/styles/movies.css';
import search from '../assets/images/search.svg';

export const Movielist: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [movies, setMovies] = useState<MovieDetails[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleMovies, setVisibleMovies] = useState<number>(10); // Number of movies to display
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const response = await axios.get<{ movies: MovieDetails[] }>('http://localhost:4000/api/movies');
        if (Array.isArray(response.data.movies)) {
          setMovies(response.data.movies);
        } else {
          console.error('Invalid data received from the API:', response.data);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const loadMore = () => {
    setVisibleMovies(prevVisibleMovies => prevVisibleMovies + 10);
  };

  const deleteMovie = async (id: number) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:4000/api/delete_movie/${id}`);
      setMovies((prevMovies) => prevMovies?.filter((movie) => movie.id !== id));
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

  const filteredMovies = movies?.filter(
    (movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {loading && (
        <div className="skeleton react-skeletons">
          <div className="skeleton">
              <Skeleton width={170} height={250} baseColor={"#333"} highlightColor={"#444"}/>
              <div className="center">
                <Skeleton width={150} height={20} baseColor={"#333"} highlightColor={"#444"}/>
              </div>
            </div>
            <div className="skeleton">
              <Skeleton width={170} height={250} baseColor={"#333"} highlightColor={"#444"}/>
              <div className="center">
                <Skeleton width={150} height={20} baseColor={"#333"} highlightColor={"#444"}/>
              </div>
            </div>
            <div className="skeleton">
              <Skeleton width={170} height={250} baseColor={"#333"} highlightColor={"#444"}/>
              <div className="center">
                <Skeleton width={150} height={20} baseColor={"#333"} highlightColor={"#444"}/>
              </div>
            </div>
            <div className="skeleton">
              <Skeleton width={170} height={250} baseColor={"#333"} highlightColor={"#444"}/>
              <div className="center">
                <Skeleton width={150} height={20} baseColor={"#333"} highlightColor={"#444"}/>
              </div>
            </div>
            <div className="skeleton">
              <Skeleton width={170} height={250} baseColor={"#333"} highlightColor={"#444"}/>
              <div className="center">
                <Skeleton width={150} height={20} baseColor={"#333"} highlightColor={"#444"}/>
              </div>
            </div>
            <div className="skeletonn">
              <Skeleton width={170} height={250} baseColor={"#333"} highlightColor={"#444"}/>
              <div className="center">
                <Skeleton width={150} height={20} baseColor={"#333"} highlightColor={"#444"}/>
              </div>
            </div>
            <div className="skeletonn">
              <Skeleton width={170} height={250} baseColor={"#333"} highlightColor={"#444"}/>
              <div className="center">
                <Skeleton width={150} height={20} baseColor={"#333"} highlightColor={"#444"}/>
              </div>
            </div>
            <div className="skeletonn">
              <Skeleton width={170} height={250} baseColor={"#333"} highlightColor={"#444"}/>
              <div className="center">
                <Skeleton width={150} height={20} baseColor={"#333"} highlightColor={"#444"}/>
              </div>
            </div>
            <div className="skeletonn">
              <Skeleton width={170} height={250} baseColor={"#333"} highlightColor={"#444"}/>
              <div className="center">
                <Skeleton width={150} height={20} baseColor={"#333"} highlightColor={"#444"}/>
              </div>
            </div>
            <div className="skeletonn">
              <Skeleton width={170} height={250} baseColor={"#333"} highlightColor={"#444"}/>
              <div className="center">
                <Skeleton width={150} height={20} baseColor={"#333"} highlightColor={"#444"}/>
              </div>
            </div>
        </div>
      )}
      <div className="search">
        <input
          type="search"
          className="search-movies"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="search-icon">
          <img src={search} alt="" className="searchIcon"/>
        </div>
      </div>
      <div className="react-skeletons">
        {filteredMovies?.slice(0, visibleMovies).map((movie) => (
          <div key={movie.id} onClick={() => handleMovieClick(movie.id)} className="skeleton">
            <div style={{ backgroundImage: `url(${movie.images})`, width: '200px', height: '200px' }} className="image"></div>
            <div className="title">
              <p className="title-movie">{movie.title} (<span>{movie.year}</span>)</p>
            </div>
            {isLoggedIn() && (
              <button onClick={() => deleteMovie(movie.id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
      <button onClick={loadMore}>Load more</button>
    </div>
  );
};
