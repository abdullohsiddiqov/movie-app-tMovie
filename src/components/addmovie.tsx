import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '../hooks/authContext';
import { addMovie } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { MovieDetails } from '../utils/types';

export const CreateMovie: React.FC = () => {
    const [formData, setFormData] = useState<MovieDetails>({
      id: 0,
      title: '',
      description: '',
      rate: 0,
      year: 0,
      runtime: 0,
      genre: '',
      country: '',
      images: '',
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
        console.log('Sending data to server:', formData);
        await addMovie(formData);
        navigate('/');
      } catch (error) {
        console.error('Error adding home:', error);
      }
    };
  
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    return (
      <div>
        <h2>Create movie</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={formData.title} onChange={handleChange} />
          </label>
          <label>
            Description:
            <input type="text" name="description" value={formData.description} onChange={handleChange} />
          </label>
          <label>
            Rate:
            <input type="number" name="rate" value={formData.rate} onChange={handleChange} />
          </label>
          <label>
            Year:
            <input type="number" name="year" value={formData.year} onChange={handleChange} />
          </label>
          <label>
            Runtime:
            <input type="number" name="runtime" value={formData.runtime} onChange={handleChange} />
          </label>
          <label>
            Genre:
            <input type="text" name="genre" value={formData.genre} onChange={handleChange} />
          </label>
          <label>
            Country:
            <input type="text" name="country" value={formData.country} onChange={handleChange} />
          </label>
          <label>
            Photo:
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
          {formData.images && <img src={formData.images} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
          <button type="submit">Add Movie</button>
        </form>
      </div>
    );
  };