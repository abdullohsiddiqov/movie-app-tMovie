import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/authContext";
import { SignEntity } from "../utils/types";
import { signIn } from "../utils/api";
import "../assets/styles/registerlogin.css";
export const Login: React.FC = () => {
  const [formData, setFormData] = useState<SignEntity.UserSignIn>({
    username: "",
    password: "",
  });
  const [error, isError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (data: SignEntity.UserSignIn) => {
    try {
      const response = await signIn(data);
      console.log("Backend Response:", response.data);

      const isAdminUser =
        (data.username === "gangdramma" && data.password === "root1234") ||
        (data.username === "americano" && data.password === "10659430");

      login(data.username, isAdminUser);
      isError(null);
      navigate("/");
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
      <h2 className="text100">Личный кабинет</h2>
      <div className="flex2">
      <Link to="/register" className="text101">
      Регистрация
      </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="box100">
          <label>
            {error && <p style={{ color: "red" }}>Invalid user</p>}
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
              type="text"
              name="password"
              className="input4"
              value={formData.password}
              onChange={handleChange}
              placeholder="Парол:"
            />
          </label>
          <button className="register" type="submit">
            Вход
          </button>
        </div>
      </form>
    </div>
  );
};
