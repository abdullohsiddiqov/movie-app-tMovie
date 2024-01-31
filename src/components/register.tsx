import React, { useState } from "react";
import { useAuth } from "../hooks/authContext";
import { SignEntity } from "../utils/types";
import { signOut } from "../utils/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../assets/styles/registerlogin.css";
export const Register: React.FC = () => {
  const [formData, setFormData] = useState<SignEntity.UserSignUp>({
    username: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSignUp = async (data: SignEntity.UserSignUp) => {
    try {
      const response = await signOut(data);
      console.log("Backend Response:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
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
      <h2 className="text100">Личный кабинет</h2>
      <Link to="/login" className="text101">
        Login
      </Link>
      <form onSubmit={handleSubmit}>
        <div className="box100">
          <label>
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
            Регистрация
          </button>
        </div>
      </form>
    </div>
  );
};
