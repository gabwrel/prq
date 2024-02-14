import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, get } from 'firebase/database';

const Home = () => {
  const [quizNames, setQuizNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Reference to the "Quizzes" node in the Firebase Realtime Database
        const quizzesRef = ref(db, 'Quizzes');

        // Fetch data from Firebase
        const snapshot = await get(quizzesRef);

        // Extract quiz names from the snapshot
        if (snapshot.exists()) {
          const quizData = snapshot.val();
          const quizNamesArray = Object.keys(quizData);
          // Update state with quiz names
          setQuizNames(quizNamesArray);
          console.log(quizzesRef)
        }
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Quizzes</h1>
      <div>
        <h2>Dashboard</h2>
        {/* Render the names of quizzes */}
        <ul>
          {quizNames.map((quizName) => (
            <li key={quizName}>{quizName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
