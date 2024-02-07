import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from '../hooks/authContext';
import { Navbar } from '../pages/navbar';
import { Login } from '../pages/auth/login';
import { Register } from '../pages/auth/register';
import { CreateMovie } from '../pages/movies/addmovie';
import { Movielist } from '../pages/movies/movielist';
import { MovieDetailsPage } from '../pages/movies/moviedetails';
import { PopularMovies } from '../pages/movies/popular';

const App: React.FC = () => {
  return (
    <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Movielist />} />
            <Route path='/popular-movies' element={<PopularMovies/>}/>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/movie-create" element={<CreateMovie />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthProvider>
    </Router>
  );
};

export default App;
