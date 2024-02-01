import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../src/hooks/authContext';
import { Navbar } from './components/navbar';
import { Login } from './components/auth/login';
import { Register } from './components/auth/register';
import { CreateMovie } from './components/movies/addmovie';
import { Movielist } from './components/movies/movielist';
import { MovieDetailsPage } from './components/movies/moviedetails';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Movielist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie-create" element={<CreateMovie />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

