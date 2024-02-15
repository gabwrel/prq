// LoginPage.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // You can do something with the userCredential if needed
      console.log(userCredential);

      // Navigate to the Home page on successful login
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-8 shadow-md rounded-md" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
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
          className="bg-blue-500 text-white rounded-md mb-2 p-2 w-full hover:bg-blue-600"
        >
          Login
        </button>
        <div className='mb-4'>
            <h5>Don't have an account? <Link to="/Register" className="font-bold underline hover:text-red-700">
              Click here
            </Link></h5>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
