import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { rtdb, ref, set } from '../firebase';
import { onValue } from 'firebase/database';

Modal.setAppElement('#root');

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [quizCreator, setQuizCreator] = useState('');
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const quizzesRef = ref(rtdb, 'Quiz');
    const unsubscribe = onValue(quizzesRef, (snapshot) => {
      const data = snapshot.val();
      const quizzesArray = data ? Object.entries(data).map(([title, quiz]) => ({ title, ...quiz })) : [];
      setQuizzes(quizzesArray);
    });

    return () => unsubscribe();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSaveQuiz = async () => {
    try {
      const quizData = { description: quizDescription, createdBy: quizCreator };
      const quizTitleRef = ref(rtdb, `Quiz/${quizTitle}`);
      await set(quizTitleRef, quizData);
      console.log('Quiz data successfully saved.');
      closeModal();
    } catch (error) {
      console.error('Error saving quiz data:', error.message);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="bg-black text-white w-1/6 p-4 h-full">
        {/* Sidebar Content */}
        Sidebar Content
      </div>

      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
      

        <div className="mt-4 grid grid-cols-1 gap-4">
          {quizzes.map((quiz) => (
            <div key={quiz.title} className="bg-white p-4 rounded-md shadow-md">
              <h3 className="text-lg font-semibold">{quiz.title}</h3>
              <p className="text-gray-600">{quiz.description}</p>
              <p className="text-sm mt-2">Created by: {quiz.createdBy}</p>
            </div>
          ))}
        </div>

        <button
          onClick={openModal}
          className="mt-2 bg-blue-500 text-white rounded-md p-2 mt-4 hover:bg-blue-600"
        >
          Create Quiz
        </button>
      </div>

      

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Create Quiz Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content p-4 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4">Create Quiz</h2>
          <form>
            {['Title', 'Description', 'Creator'].map((field) => (
              <div key={field} className="mb-4">
                <label htmlFor={`quiz${field}`}>{`Quiz ${field}:`}</label>
                <input
                  type="text"
                  id={`quiz${field}`}
                  value={field === 'Title' ? quizTitle : field === 'Description' ? quizDescription : quizCreator}
                  onChange={(e) =>
                    field === 'Title'
                      ? setQuizTitle(e.target.value)
                      : field === 'Description'
                      ? setQuizDescription(e.target.value)
                      : setQuizCreator(e.target.value)
                  }
                  className="w-full border rounded-md p-2"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleSaveQuiz}
              className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
            >
              Save Quiz
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
