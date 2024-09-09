import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useProfile } from '../contexts/Profile';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user } = useProfile();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError('Incorrect Email or Password.');
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#101010] to-[#151515] font-inter">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl">
        <div className='flex p-0 items-center justify-center mx-2 mb-5'>
            <img 
              src="./museum-center-black.svg"
              alt="Museum Logo"
              width={155}
              height={155}
              className=""
            />
            <div className='flex flex-col ml-2'>
            <p className="text-3xl font-extrabold text-gray-900 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#202020] to-[#2C2C2C]">Museum</p>
            <p className="text-3xl font-extrabold text-gray-900 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#202020] to-[#2C2C2C]">Central</p>
            </div>
          </div>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150 ease-in-out transform hover:shadow-md"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150 ease-in-out transform hover:shadow-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#101010] hover:bg-[#252525] text-white py-3 rounded-lg font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Login
          </button>
          {error && <div className="mt-4 text-red-500 text-center text-sm">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
