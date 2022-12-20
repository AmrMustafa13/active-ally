import React, { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = async () => {
    const response = await fetch(`/api/workouts`);
    const data = await response.json();
    if (response.ok) {
      setWorkouts(data);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, [workouts]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm workouts={workouts} setWorkouts={setWorkouts} />
    </div>
  );
};

export default Home;
