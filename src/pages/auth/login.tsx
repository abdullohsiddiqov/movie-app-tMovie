import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/authContext";
import { SignEntity } from "../../utils/types";
import { signIn } from "../../utils/api";
import "../../assets/styles/registerlogin.css";

export const Login: React.FC = () => {
  const [formData, setFormData] = useState<SignEntity.UserSignIn>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (data: SignEntity.UserSignIn) => {
    try {
      const response = await signIn(data);
      console.log("Backend Response:", response.data);

      const isAdminUser = (data.username === "gangdramma" && data.password === "root1234")

      login(data.username, isAdminUser);
      setError(null);
      setFormData((prevData) => ({
        ...prevData,
        username: "",
        password: ""
      }));
      navigate("/");
    } catch (error) {
      setError(`Error during login: ${error}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSignIn(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2 className="text100">Личный кабинет</h2>
      <div className="flex2">
        <Link to="/register" className="text101">
         Вход
        </Link>
      </div>
      <form onSubmit={handleSubmit} className='style'>
        <div className="box100">
          <label>
            {error ? <p style={{ color: "red" }}>{error}</p> : null}
            <input
              type="text"
              name="username"
              className="input4"
              value={formData.username}
              onChange={handleChange}
              placeholder="Логин:"
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              className="input4"
              value={formData.password}
              onChange={handleChange}
              placeholder="Пароль:"
            />
          </label>
          <span className="acc">Пока нету аккаунта? <span><Link to="/auth/register" className='auth'>Регистрация</Link></span></span>
          <button className="register" type="submit">
            Вход
          </button>
        </div>
      </form>
    </div>
  );
};
