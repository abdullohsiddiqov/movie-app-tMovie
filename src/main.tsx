import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../src/hooks/authContext';
import { Navbar } from './components/navbar';
import { Login } from './components/login';
import { Register } from './components/register';
import { CreateMovie } from './components/addmovie';
import { Movielist } from './components/movielist';
import { MovieDetailsPage } from './components/moviedetails';
import { Footer } from './components/footer';

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
