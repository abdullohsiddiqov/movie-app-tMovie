import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/authContext';
import { SignEntity } from '../utils/types';
import { signIn } from '../utils/api';

export const Login: React.FC = () => {
  const [formData, setFormData] = useState<SignEntity.UserSignIn>({ username: '', password: '' });
  const [error, isError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

const handleSignIn = async (data: SignEntity.UserSignIn) => {
  try {
    const response = await signIn(data);
    console.log('Backend Response:', response.data);

    const isAdminUser = data.username === 'gangdramma' && data.password === 'root1234';

    login(data.username, isAdminUser);
    isError(null);
    navigate('/');
  } catch (error) {
    isError(`Error during login: ${error}`);
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSignIn(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          {error && <p style={{color:"red"}}>Invalid user</p>}
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
