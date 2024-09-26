import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useProfile } from '../contexts/Profile';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const { user } = useProfile();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="relative z-20">
      <button
        onClick={toggleNavBar}
        className="text-white p-3 bg-primary rounded-lg focus:outline-none flex items-center justify-center"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <FaTimes color='black' size={24} /> : <FaBars color='black' size={24} />}
      </button>
      {isOpen && (
        <nav className="absolute top-12 left-0 bg-secondary text-white p-5 rounded-md mt-2 shadow-lg border border-gray-700">
          <p className='mb-5'>{user?.email}</p >
          <ul className="flex flex-col space-y-2">
            <li>
              <Link
                to="/"
                className="block py-2 px-4 hover:bg-[#202020] rounded-md transition-colors duration-300"
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/visualizations"
                className="block py-2 px-4 hover:bg-[#202020] rounded-md transition-colors duration-300"
                onClick={handleLinkClick}
              >
                Visualizations
              </Link>
            </li>
            <li>
              <Link
                to="/errors"
                className="block py-2 px-4 hover:bg-[#202020] rounded-md transition-colors duration-300"
                onClick={handleLinkClick}
              >
                Errors
              </Link>
            </li>
            <li>
              <Link
                to="/lifetime"
                className="block py-2 px-4 hover:bg-[#202020] rounded-md transition-colors duration-300"
                onClick={handleLinkClick}
              >
                Lifetime
              </Link>
            </li>
            <li>
              <Link
                to="/camera-error"
                className="block py-2 px-4 hover:bg-[#202020] rounded-md transition-colors duration-300"
                onClick={handleLinkClick}
              >
                Camera Errors
              </Link>
            </li>
            <li>
              <Link
                to="/historical-data"
                className="block py-2 px-4 hover:bg-[#202020] rounded-md transition-colors duration-300"
                onClick={handleLinkClick}
              >
                Historical Data
              </Link>
            </li>
            <li>
              <Link
                to="/live-footage"
                className="block py-2 px-4 hover:bg-[#202020] rounded-md transition-colors duration-300"
                onClick={handleLinkClick}
              >
                Live Footage
              </Link>
            </li>
            <li>
              <Link
                to="/exhibits"
                className="block py-2 px-4 hover:bg-[#202020] rounded-md transition-colors duration-300"
                onClick={handleLinkClick}
              >
                Exhibits
              </Link>
            </li>
            <li className="block py-2 px-4 bg-red-600 hover:bg-red-900 rounded-md transition-colors duration-300">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default NavBar;
