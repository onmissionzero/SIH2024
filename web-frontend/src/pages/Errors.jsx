import React from 'react';
import { useError } from '../contexts/ErrorContext';
import { FaExclamationTriangle, FaExclamationCircle } from 'react-icons/fa';

const SensorData = () => {
  const { errors, loading } = useError();

  const formatTime = (time24) => {
    try {
      const [hour, minute] = time24.split(':').map(Number);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
    } catch (e) {
      console.error('Error formatting time:', e);
      return 'Invalid time';
    }
  };

  const getErrorIcon = (type) => {
    switch (type) {
      case 'Critical':
        return <FaExclamationTriangle className="text-red-600 text-4xl" />;
      case 'Warning':
        return <FaExclamationCircle className="text-yellow-600 text-4xl" />;
      case 'Info':
        return <FaExclamationTriangle className="text-red-600 text-4xl" />;
      default:
        return <FaExclamationTriangle className="text-red-600 text-4xl" />;
    }
  };

  if (loading) {
    return (
      <div className="p-6 w-full h-screen mx-auto bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-lg shadow-lg">
        <div className="text-center py-12">
          <FaExclamationTriangle className="text-gray-500 text-6xl mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 text-lg font-medium">Loading data...</p>
        </div>
      </div>
    );
  }

  if (Object.keys(errors).length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 rounded-lg shadow-lg">
        <div className="text-center py-12">
          <FaExclamationTriangle className="text-gray-600 text-6xl mx-auto mb-4" />
          <p className="text-gray-700 text-lg font-medium">No errors to display.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 via-blue-100 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(errors).map(([key, data]) => (
            <div key={key} className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 ${getBorderColor(data.error_type)}`}>
              <div className="p-6 relative">
                <div className="absolute top-0 right-0 p-4">
                  {getErrorIcon(data.error_type)}
                </div>
                <h2 className="text-red-600 mb-2 font-bold text-2xl">{data.predicted_defect}</h2>
                <p className="text-gray-900 mb-4">Error ID: {key}</p>
                <p className="mb-2 text-lg font-bold text-teal-600"><strong className='text-gray-800'>Time:</strong> {formatTime(data.time)}</p>
                <div className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 p-4 rounded-lg mt-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Sensor Data</h3>
                  {Object.entries(data.sensor_data).map(([sensor, value]) => (
                    <div key={sensor} className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-600 capitalize">{sensor.replace('_', ' ')}</span>
                      <span className="text-gray-800 font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const getBorderColor = (type) => {
  switch (type) {
    case 'Critical':
      return 'border-l-4 border-red-500';
    case 'Warning':
      return 'border-l-4 border-yellow-500';
    case 'Info':
      return 'border-l-4 border-blue-500';
    default:
      return 'border-l-4 border-gray-300';
  }
};

export default SensorData;
