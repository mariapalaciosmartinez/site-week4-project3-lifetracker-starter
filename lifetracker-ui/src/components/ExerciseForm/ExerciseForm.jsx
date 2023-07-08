import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

export default function ExerciseForm({ user }) {
    const navigate = useNavigate()
    const [form, setForm] = useState({
    name: '',
    category: '',
    duration: 0,
    intensity: ''
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    // setErrors((e) => ({ ...e, form: null }));
    try {
      console.log("THIS IS MY USER ID", user.id);
      const res = await axios.post(
        `http://localhost:5173/auth/exercise/create`,
        {
          name: form.name,
          category: form.category,
          duration: form.duration,
          intensity: form.intensity,
          user_id: user.id,
        }
      );
      if (res?.data?.exercise) {
        // replace with your actual success condition
        // setAppState(res.data);
        // setIsLoading(false);
        // setShowForm(false);
        navigate("/exercise"); // navigate to some page after successful submission
      } else {
        // setErrors((e) => ({
        //   ...e,
        //   form: "Something went wrong with recording the exercise",
        // }));
        // setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
    //   setErrors((e) => ({
    //     ...e,
    //     form: message ? String(message) : String(err),
    //   }));
    //   setIsLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleInputChange}
        >
          <option value="">Select a category</option>
          <option value="Cardio">Cardio</option>
          <option value="Strength">Strength</option>
          <option value="Flexibility">Flexibility</option>
          <option value="HIIT">HIIT</option>
        </select>
      </div>
      <div>
        <label htmlFor="duration">Duration (min):</label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={form.duration}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="intensity">Intensity Level:</label>
        <input
          type="text"
          id="intensity"
          name="intensity"
          value={form.intensity}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};