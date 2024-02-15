import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, where, query, addDoc, doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userQuery = query(collection(db, 'users'), where('uid', '==', currentUser.uid));
        const querySnapshot = await getDocs(userQuery);
  
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUser(userData);
  
          // Fetch quizzes under the 'quizzes' subcollection
          const userRef = doc(db, 'users', user.uid);
          const userQuizzesRef = collection(userRef, 'quizzes');
          const userQuizzesSnapshot = await getDocs(userQuizzesRef);
  
          // Update the state with the quizzes
          setQuizzes(userQuizzesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        }
      } else {
        setUser(null);
        setQuizzes([]);
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, [user]); // Include user as a dependency to trigger the effect when the user changes
  

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setQuizTitle('');
    setQuizDescription('');
  };

  const handleQuizCreation = async () => {
    try {
      if (user) {
        // Check if the user document exists
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
  
        if (!userDoc.exists()) {
          // Create user document if not exists
          await setDoc(userRef, {
            company: user.company,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            uid: user.uid,
          });
        }
  
        // Add the new quiz to the 'quizzes' subcollection under the user's document
        const userQuizzesRef = collection(userRef, 'quizzes');
        const newQuiz = {
          title: quizTitle,
          description: quizDescription,
          createdBy: user.uid,
          createdAt: serverTimestamp(),
        };
  
        // Use 'addDoc' to add a new document to the 'quizzes' subcollection
        await addDoc(userQuizzesRef, newQuiz);
  
        console.log('Quiz created successfully!');
        closeModal();
      } else {
        console.error('Error: User data not available.');
      }
    } catch (error) {
      console.error('Error creating quiz:', error.message);
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

        <div className="mb-4">
          <p>Total Quizzes: <strong>{quizzes.length}</strong></p>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold">{quiz.title}</h2>
              <p>{quiz.description}</p>
            </div>
          ))}
        </div>


        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded-md focus:outline-none focus:shadow-outline mt-auto"
          onClick={openModal}
        >
          Create Quiz
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md">
              <h2 className="text-2xl font-semibold mb-4">Create Quiz</h2>
              <label className="block mb-2">
                Quiz Title:
                <input
                  className="w-full p-2 border rounded-md"
                  type="text"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                />
              </label>

              <label className="block mb-2">
                Quiz Description:
                <textarea
                  className="w-full p-2 border rounded-md"
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                />
              </label>

              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2"
                  onClick={handleQuizCreation}
                >
                  Create
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;