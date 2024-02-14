import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchSubcollections = async () => {
      try {
        // Query the subcollections within the "Categories" document in the "Quiz" collection
        const categoriesDocRef = collection(db, 'Quiz', 'Categories');
        const subcollectionsSnapshot = await getDocs(categoriesDocRef);

        // Extract subcollection names from the documents
        const subcollectionNames = subcollectionsSnapshot.docs.map((doc) => doc.id);

        // Set state with subcollection names
        setCategories(subcollectionNames);
      } catch (error) {
        console.error('Error fetching subcollections:', error.message);
      }
    };

    // Call the function to fetch subcollections
    fetchSubcollections();
  }, []);

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        {/* Add your sidebar content here */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <h1 className="text-3xl font-semibold mb-4">Welcome to Your Dashboard</h1>

        {/* Display categories as horizontal cards */}
        <div className="flex space-x-4 overflow-x-auto">
          <div>
            <h1>Subcollections within /Quiz/Categories:</h1>
            <ul>
              {categories.map((subcollection) => (
                <li key={subcollection}>{subcollection}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
