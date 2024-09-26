import React, { useState, useEffect } from 'react';
import { database, ref, get } from '../utils/firebasedb';
import { FaCalendarAlt, FaFilter } from 'react-icons/fa';

// Function to format timestamp
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString(); // Formats to a readable date-time string
};

// Function to check if time is in range
const isTimeInRange = (time, start, end) => {
  const date = new Date(time);
  const startTime = new Date(date);
  startTime.setHours(...start.split(':').map(Number));
  const endTime = new Date(date);
  endTime.setHours(...end.split(':').map(Number));
  return date >= startTime && date <= endTime;
};

const CsvTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('23:59');
  const [searchValue, setSearchValue] = useState('');
  const [separateTables, setSeparateTables] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(database, 'sensor-data');
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const rawData = snapshot.val();
          const formattedData = Object.values(rawData);
          setData(formattedData);
          setFilteredData(formattedData);
        } else {
          setError('No data available');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let tempData = data;

    // Filter by time range
    tempData = tempData.filter(row => isTimeInRange(row.timestamp, startTime, endTime));

    // Search by value in any sensor data
    if (searchValue) {
      tempData = tempData.filter(row => 
        Object.values(row).some(value => value.toString().includes(searchValue))
      );
    }

    setFilteredData(tempData);
  }, [data, startTime, endTime, searchValue]);

  const resetFilters = () => {
    setStartTime('00:00');
    setEndTime('23:59');
    setSearchValue('');
  };

  // Function to get unique sensor keys dynamically
  const getUniqueSensorKeys = () => {
    return [...new Set(data.flatMap(Object.keys))].filter(key => key !== 'timestamp');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-teal-400 p-6">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-6xl mx-auto mb-8">
        {loading && <p className="text-lg text-gray-700 text-center">Loading data...</p>}
        {error && <p className="text-lg text-red-500 text-center">Error: {error}</p>}
        {!loading && !error && (
          <>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-4xl font-bold text-gray-800">Data Overview</h2>
                <div className="flex gap-4 items-center">
                  <div className="flex items-center bg-gray-200 p-3 rounded-full shadow-md">
                    <FaCalendarAlt className="text-gray-700 mr-2" />
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="border-none bg-transparent w-28 text-gray-800"
                    />
                    <span className="mx-2 text-gray-600">to</span>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="border-none bg-transparent w-28 text-gray-800"
                    />
                  </div>
                  <button
                    onClick={resetFilters}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
                  >
                    Reset Filters
                  </button>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={separateTables}
                      onChange={() => setSeparateTables(!separateTables)}
                      className="mr-2"
                    />
                    Separate Tables
                  </label>
                </div>
              </div>
              <div className="flex items-center mb-8">
                <FaFilter className="text-gray-700 mr-2" />
                <input
                  type="text"
                  placeholder="Search value"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="border border-gray-300 p-2 rounded-lg w-full"
                />
              </div>
            </div>

            {/* Conditional Rendering based on toggle */}
            <div className={separateTables ? "flex flex-wrap gap-4" : "overflow-x-auto"}>
              {separateTables ? (
                getUniqueSensorKeys().map(sensor => (
                  <div key={sensor} className="flex-1 min-w-[300px] max-w-[400px] mb-4">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">{sensor.replace('_', ' ').toUpperCase()}</h3>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                          <th className="py-3 px-4 text-left text-gray-700">Timestamp</th>
                          <th className="py-3 px-4 text-left text-gray-700">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((row, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{formatTimestamp(row.timestamp)}</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{row[sensor]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))
              ) : (
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-left text-gray-700">Timestamp</th>
                      {getUniqueSensorKeys().map((sensor) => (
                        <th key={sensor} className="py-3 px-4 text-left text-gray-700">
                          {sensor.replace('_', ' ').toUpperCase()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{formatTimestamp(row.timestamp)}</td>
                        {getUniqueSensorKeys().map(sensor => (
                          <td key={sensor} className="py-2 px-4 border-b border-gray-200 text-gray-700">
                            {row[sensor]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CsvTable;
