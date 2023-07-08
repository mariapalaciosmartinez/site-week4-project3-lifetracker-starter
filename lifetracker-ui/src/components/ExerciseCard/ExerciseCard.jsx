import React from 'react';

export default function ExerciseCard({exercise}) {
  const { name, category, duration, intensity } = exercise;
  return (
    <div className="exercise-card">
      <div className="exercise-card-header">
        <div className="exercise-avatar">
          <span>{name.charAt(0)}</span>
        </div>
        <div className="exercise-details">
          <h2 className="exercise-name">{name}</h2>
          <span className="exercise-category">{category}</span>
        </div>
      </div>
      <div className="exercise-stats">
        <div className="exercise-stat">
          <span className="exercise-stat-label">Duration:</span>
          <span className="exercise-stat-value">{duration} min</span>
        </div>
        <div className="exercise-stat">
          <span className="exercise-stat-label">Intensity:</span>
          <span className="exercise-stat-value">{intensity}</span>
        </div>
      </div>
    </div>
  );
};