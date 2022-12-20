import React from "react";

import { formatDistanceToNow } from "date-fns";

const WorkoutDetails = ({ workout }) => {
  const handleDelete = async () => {
    await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
    });
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (KG): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleDelete}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
