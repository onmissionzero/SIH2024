import React from 'react';
import { useProfile } from '../contexts/Profile';
import { useNavigate } from 'react-router-dom';
import { FaChartBar, FaEye, FaHistory, FaVideo } from 'react-icons/fa';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

const Home = () => {
  const { user } = useProfile();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  // Sample data for charts
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Visitor Count',
        data: [1200, 1500, 1700, 1600, 1800, 2000, 2200],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Exhibit Visits',
        data: [30, 45, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-teal-400">
      {/* Hero Section */}
      <header className="relative bg-cover bg-center text-white py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: 'url(/path/to/hero-image.jpg)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">Welcome to the Museum Dashboard, {user.email}</h1>
          <p className="text-lg sm:text-xl mb-8">Explore, analyze, and monitor all museum data with ease.</p>
          <a href="/visualizations" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-lg inline-block">Get Started</a>
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
              <a href="/visualizations" className="text-blue-500 hover:underline">View Visualizations</a>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="p-6 text-center">
              <FaEye className="text-4xl text-teal-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Monitoring</h2>
              <p className="text-gray-600 mb-4">Stay updated with live monitoring tools and real-time metrics.</p>
              <a href="/monitoring" className="text-teal-500 hover:underline">Monitor Now</a>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="p-6 text-center">
              <FaHistory className="text-4xl text-purple-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Historical Data</h2>
              <p className="text-gray-600 mb-4">Access and analyze historical data to gain insights and trends.</p>
              <a href="/historical-data" className="text-purple-500 hover:underline">View Data</a>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="p-6 text-center">
              <FaVideo className="text-4xl text-red-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">CCTV Footage</h2>
              <p className="text-gray-600 mb-4">Review live and recorded footage from CCTV cameras around the museum.</p>
              <a href="/cctv" className="text-red-500 hover:underline">View Footage</a>
            </div>
          </div>
        </div>
      </section>

      {/* Graphical Visualizations */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold mb-4">Visitor Count by Month</h3>
            <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
          </div>
          <div className="bg-gray-100 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold mb-4">Exhibit Visits Over Time</h3>
            <Line data={lineChartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold mb-4">Recent Updates</h3>
            <ul className="list-disc list-inside">
              <li>New exhibit launched: Ancient Egypt</li>
              <li>Visitor count increased by 15%</li>
              <li>New CCTV cameras installed in Gallery 5</li>
            </ul>
          </div>
          <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold mb-4">Quick Stats</h3>
            <p className="text-lg">Today&apos;s Visitors: <span className="font-bold">1,234</span></p>
            <p className="text-lg">Exhibits Open: <span className="font-bold">25</span></p>
            <p className="text-lg">Active Monitoring Systems: <span className="font-bold">8</span></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
