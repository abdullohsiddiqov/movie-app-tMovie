// Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/authContext';
import "../assets/styles/navbar.css";
import logo from '../assets/images/logo-dark.png';

export const Navbar: React.FC = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const handleAddMovie = () => {
    navigate('/movie-create');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <nav>
        <div className="logo">
          <Link to="/"><img src={logo} alt="" className='logo'/></Link>
        </div>
        <ul className='nav-elements'>
          <li className='home'>
            <Link to="/" className='home'>Home</Link>
          </li>
          {isLoggedIn() ? (
            <>
              <li className='user'>{user?.username}</li>
              <li className='logout'>
                <button onClick={logout} className='logout'>logout</button>
              </li>
              <li className='auth'>
                {isLoggedIn() && <button onClick={() => handleAddMovie()} className='add'>Add Movie</button>}
              </li>
            </>
          ) : (
            <>
              <li className='auth'>
                <Link to="/login" className='authreg'>Login</Link>
              </li>
              <li className='auth'>
                <Link to="/register" className='authreg'>Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};
