import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, where, query} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userQuery = query(collection(db, 'users'), where('uid', '==', currentUser.uid));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUser(userData);
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };
  

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="bg-black text-white w-1/6 flex flex-col items-center ">
        <p className="text-center text-2xl font-semibold my-4">PRQM Home</p>
        <h1 className='text-center mb-4 hover:text-red-700'>Quizzes</h1>
        <h1 className='text-center mb-4 hover:text-red-700'>Products</h1>
        <h1 className='text-center mb-4 hover:text-red-700'>Analytics</h1>
        <button
          className="bg-red-500 w-1/2 hover:bg-red-700 text-white font-bold my-4 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mt-auto"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="flex-1 p-6">
        <div className="mb-2">
          <h1 className="text-2xl font-semibold">
            Hello {user?.firstName || 'Guest'}! Welcome to PRQM.
          </h1>
          <h1>
            A product recommendation quiz manager
          </h1>
        </div>


        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded-md focus:outline-none focus:shadow-outline mt-auto"
        >
          Create Quiz
        </button>

      </div>
    </div>
  );
};

export default Home;
