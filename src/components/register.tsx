import React, { useState } from 'react';
import { useAuth } from '../hooks/authContext';
import { SignEntity } from '../utils/types';
import { signOut } from '../utils/api';
import { Link } from 'react-router-dom';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState<SignEntity.UserSignUp>({ username: '', password: '' });
  const { login } = useAuth();

  const handleSignUp = async (data: SignEntity.UserSignUp) => {
    try {
      const response = await signOut(data);
      console.log('Backend Response:', response.data);

    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignUp(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};
