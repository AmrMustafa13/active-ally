import React, { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const [workouts, setWorkouts] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`/api/workouts`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setWorkouts(data);
      }
    };
    if (user) fetchWorkouts();
  }, [workouts, user]);

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
