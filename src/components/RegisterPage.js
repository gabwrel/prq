// RegistrationPage.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // You can do something with the userCredential if needed
      console.log(userCredential);

      // Navigate to the Home page or any other page on successful registration
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-8 shadow-md rounded-md" onSubmit={handleRegistration}>
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            className="w-full border rounded-md p-2"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            className="w-full border rounded-md p-2"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white rounded-md mb-2 p-2 w-full hover:bg-green-600"
        >
          Register
        </button>
        <div className='mb-4'>
          <h5>Already have an account? <Link to="/login" className="font-bold underline hover:text-blue-700">
            Login here
          </Link></h5>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
