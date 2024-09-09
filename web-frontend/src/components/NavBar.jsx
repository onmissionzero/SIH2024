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
    <div className="relative z-10">
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
                to="/about"
                className="block py-2 px-4 hover:bg-[#202020] rounded-md transition-colors duration-300"
                onClick={handleLinkClick}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="block py-2 px-4 hover:bg-[#202020] rounded-md transition-colors duration-300"
                onClick={handleLinkClick}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-4 hover:bg-[#202020] rounded-md transition-colors duration-300"
                onClick={handleLinkClick}
              >
                Contact
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
