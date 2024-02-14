import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add additional user information to Firestore
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        firstName,
        lastName,
        company,
        email,
      });

      console.log('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  return (
    
    <div className=" flex items-center justify-center h-auto mx-auto max-w-md shadow-md p-6 bg-white rounded-md mt-40">
      <form onSubmit={handleRegister}>
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <label className="block mb-2">
          First Name:
          <input
            className="w-full p-2 border rounded-md"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label className="block mb-2">
          Last Name:
          <input
            className="w-full p-2 border rounded-md"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <label className="block mb-2">
          Company:
          <input
            className="w-full p-2 border rounded-md"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>

        <label className="block mb-2">
          Email:
          <input
            className="w-full p-2 border rounded-md"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="block mb-2">
          Password:
          <input
            className="w-full p-2 border rounded-md"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline" type="submit">
          Register
        </button>

        <p className="text-sm">
            Already have an account? 
            {' '}
            <Link to="/" className="text-blue-500 hover:underline">
              Click here
            </Link>
          </p>
      </form>
    </div>
  );
};

export default Register;
