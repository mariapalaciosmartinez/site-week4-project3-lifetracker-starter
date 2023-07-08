import React from 'react';
import { useState, useEffect } from "react"
import ExerciseCard from "../ExerciseCard/ExerciseCard"
import { useNavigate } from "react-router-dom"
import axios from 'axios';



export default function ExercisePage({ user }) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate()
    const handleAddExercise = () => {
        navigate("/exercise/create")
    };

    useEffect(() => {
        const fetchExercises = async () => {
          try {
            const res = await axios.get(
              `http://localhost:5173/auth/exercise/${user.id}`,
              {
                params: { user_id: user.user_id },
              }
            );
            console.log(user.id)
            setExercises(res.data.exercises);
            console.log(res.data.exercises)
          } catch (err) {
            console.error("Failed to fetch exercises", err);
          }
        };
        fetchExercises();
      }, []);    
  return (
    <>
    <button type="button" className="Main Button" onClick={handleAddExercise}>
        Add Exercise
    </button>
    <div>
        {[...exercises].reverse().map((ex) => (<ExerciseCard key={ex.id} exercise={ex} />))}
    </div>
    </>
  )
}