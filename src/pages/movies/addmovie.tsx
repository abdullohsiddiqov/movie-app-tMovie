import React, { useState, ChangeEvent, FormEvent } from "react";
import { addMovie } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { MovieDetails } from "../../utils/types";
import "../../assets/styles/addmovie.css";

export const CreateMovie: React.FC = () => {
  const [formData, setFormData] = useState<MovieDetails>({
    id: 0,
    title: "",
    description: "",
    rate: '',
    year: '',
    runtime: '',
    genre: "",
    country: "",
    images: "",
    comments: null,
    videoLink: ""
  });

  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setFormData((prevData) => ({
        ...prevData,
        images: URL.createObjectURL(selectedFile),
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log("Sending data to server:", formData);
      await addMovie(formData);
      navigate("/");
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="head-container">
      <div className="container1">
        <div className="textbox1">
          <h2 className="h2">Создать фильм</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="main-box3">
            <div className="box10">
              <label>
                <input
                  type="text"
                  name="title"
                  className="input1"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Заголовок:"
                />
                <input
                  type="text"
                  name="country"
                  className="input1"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Страна:"
                />
              </label>
              <label>
                <input
                  type="text"
                  name="genre"
                  className="input1"
                  value={formData.genre}
                  onChange={handleChange}
                  placeholder="Жанр:"
                />
              </label>
              <label>
                <input
                  type="text"
                  name="year"
                  className="input1"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="Год:"
                />
              </label>
              <label>
                <input
                  type="text"
                  name="rate"
                  className="input1"
                  value={formData.rate}
                  onChange={handleChange}
                  placeholder="Оценки:"
                />
              </label>
              <label>
                <input
                  type="text"
                  name="runtime"
                  className="input1"
                  value={formData.runtime}
                  onChange={handleChange}
                  placeholder="Длительность фильма:"
                />
              </label>
              <label>
                <input
                  type="text"
                  name="description"
                  className="input1"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Описание:"
                />
              </label>
              <label>
                <input
                  type="text"
                  name="videoLink"
                  className="input1"
                  value={formData.videoLink}
                  onChange={handleChange}
                  placeholder="Ссылка на видео:"
                />
              </label>
            </div>
            <div className="box11">
              <label className="input3" style={{ textAlign: 'center' }}>
                Добавить фото
                <input
                  type="file"
                  accept="image/*"
                  className="input2"
                  onChange={handleFileChange}
                />
              </label>
              {formData.images && (
                <img src={formData.images} alt="Preview" className="foto3" />
              )}
              <button className="addmovie">Добавить фильм</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
