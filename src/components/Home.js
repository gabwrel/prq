import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const [collectionCount, setCollectionCount] = useState(0);
  const navigate = useNavigate();

  const CollectionsCount = ({ userId }) => {
    useEffect(() => {
      const fetchCollectionCount = async () => {
        if (userId) {
          const userCollections = collection(db, 'users', userId);
          const userCollectionsCount = await getDocs(userCollections);
          setCollectionCount(userCollectionsCount.size);
        }
      };

      fetchCollectionCount();
    }, [userId]);

    return <h2 className='text-xl'>You have {collectionCount} quizzes.</h2>;
  };

  

  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Fetch user data from Firestore based on UID
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
      // Unsubscribe when the component unmounts
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Navigate back to "/"
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-black text-white p-4 flex flex-col">
        <p className="text-2xl font-semibold mb-4">PRQ Home</p>
        {/* Add other sidebar content here */}
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mt-auto"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Navbar */}
        <div className="mb-2">
          <h1 className="text-2xl font-semibold">
            Hello {user?.firstName || 'Guest'}! Welcome to PRQ.
          </h1>
        </div>

        {/* Display the total number of collections for the current user */}
        <CollectionsCount userId={user?.uid} />

        {/* Other main content goes here */}
        {/* Example: Display user data */}
      </div>
    </div>
  );
};

export default Home;
