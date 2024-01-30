import React, { useState, ChangeEvent, FormEvent } from "react";
import { addMovie } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { MovieDetails } from "../utils/types";
import "../assets/styles/addmovie.css";
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
      console.error("Error adding home:", error);
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
          <h2 className="h2">Create movie</h2>
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
                  placeholder="Title:"
                />
                <input
                  type="text"
                  name="country"
                  className="input1"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country:"
                />
              </label>
              <label>
                <input
                  type="text"
                  name="genre"
                  className="input1"
                  value={formData.genre}
                  onChange={handleChange}
                  placeholder="Genre:"
                />
              </label>
              <label>
                <input
                  type="text"
                  name="year"
                  className="input1"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="Year:"
                />
              </label>
              <label>
                <input
                  type="text"
                  name="rate"
                  className="input1"
                  value={formData.rate}
                  onChange={handleChange}
                  placeholder="Rate:"
                />
              </label>
              <label>
                <input
                  type="text"
                  name="runtime"
                  className="input1"
                  value={formData.runtime}
                  onChange={handleChange}
                  placeholder="Runtime:"
                />
              </label>
              <label>
                <input
                  type="text"
                  name="description"
                  className="input1"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description:"
                />
              </label>
            </div>
            <div className="box11">
              <label className="input3">
                Add Foto
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
              <button className="addmovie">Add Movie</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
