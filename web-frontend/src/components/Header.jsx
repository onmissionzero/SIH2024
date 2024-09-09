import NavBar from './NavBar';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full h-[15%] bg-secondary flex items-center justify-between p-5 font-inter">
      <NavBar />
      <Link
        to="/"
      >
        <div className='flex p-0 cursor-pointer'>
          <img 
            src="./museum-center.svg"
            alt="Museum Logo"
            width={155}
            height={155}
            className=""
          />
          <div className='flex flex-col ml-2'>
          <p className="text-white font-bold text-3xl">Museum</p>
          <p className="text-white font-bold text-3xl">Central</p>
          </div>
        </div>
      </Link>
      <img 
        src="./MinistryOfCultureIndia.svg"
        alt="Ministry of Culture"
        width={120}
        height={120}
        className=""
      />
    </header>
  );
};

export default Header;
