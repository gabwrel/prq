import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful, you can redirect or perform other actions here
      navigate('/Home'); // Redirect to the home page
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8 shadow">
      <form onSubmit={handleLogin} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
        <div className='mb-4'>
          <h1 className='text-center font-bold text-3xl'>PQRM</h1>
          <h1 className='text-center font-bold'>Product Recommendation Quiz Maker</h1>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
        <div className='text-center pt-4'>
          <p className="text-sm">
            Don't have an account? 
            {' '}
            <Link to="/Register" className="font-bold underline hover:text-red-700">
              Click here
            </Link>
          </p>
        </div>

      </form>
    </div>
  );
};

export default Login;
