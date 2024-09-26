import React from 'react';
import { useProfile } from '../contexts/Profile';
import { useNavigate, Link } from 'react-router-dom';
import { FaChartBar, FaEye, FaHistory, FaVideo } from 'react-icons/fa';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';

const Home = () => {
  const { user } = useProfile();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-teal-400">
      {/* Hero Section */}
      <header className="relative bg-cover bg-center text-white py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: 'url(/path/to/hero-image.jpg)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">Welcome to the Museum Dashboard, {user.email}</h1>
          <p className="text-lg sm:text-xl mb-8">Explore, analyze, and monitor all museum data with ease.</p>
          <Link to="/visualizations" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-lg inline-block">Get Started</Link>
        </div>
      </header>

      {/* Dashboard Overview */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="p-6 text-center">
              <FaChartBar className="text-4xl text-blue-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Visualizations</h2>
              <p className="text-gray-600 mb-4">Explore interactive charts and graphs showcasing the museum's data.</p>
              <Link to="/visualizations" className="text-blue-500 hover:underline">View Visualizations</Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="p-6 text-center">
              <FaEye className="text-4xl text-teal-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Errors</h2>
              <p className="text-gray-600 mb-4">View all the errors that has ever occured since the beginning.</p>
              <Link to="/errors" className="text-teal-500 hover:underline">View Errors</Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="p-6 text-center">
              <FaHistory className="text-4xl text-purple-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Historical Data</h2>
              <p className="text-gray-600 mb-4">Access and analyze historical data to gain insights and trends.</p>
              <Link to="/historical-data" className="text-purple-500 hover:underline">View Data</Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="p-6 text-center">
              <FaVideo className="text-4xl text-red-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Exhibit Camera Footage</h2>
              <p className="text-gray-600 mb-4">Review live and recorded footage from exhibit cameras around the museum.</p>
              <Link to="/live-footage" className="text-red-500 hover:underline">View Footage</Link>
            </div>
          </div>
        </div>
      </section>
      <iframe src="http://localhost/Reports/powerbi/SIH2024_Home?rs:embed=true" className="w-full h-screen">
      <p>No support for iframes.</p>
    </iframe>/ 
    </div>
  );
};

export default Home;
