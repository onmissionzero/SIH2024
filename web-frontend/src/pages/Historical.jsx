import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { FaCalendarAlt, FaFilter } from 'react-icons/fa';

// Function to format 24-hour time to 12-hour time
const formatTime = (time24) => {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Function to parse and compare times
const isTimeInRange = (time24, start, end) => {
  const [hours, minutes] = time24.split(':').map(Number);
  const time = new Date(0, 0, 0, hours, minutes); // Create a Date object for comparison
  const [startHours, startMinutes] = start.split(':').map(Number);
  const [endHours, endMinutes] = end.split(':').map(Number);
  const startTime = new Date(0, 0, 0, startHours, startMinutes);
  const endTime = new Date(0, 0, 0, endHours, endMinutes);
  return time >= startTime && time <= endTime;
};

const CsvTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('23:59');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const csvUrl = 'sensor_data.csv'; // Replace with your CSV file URL

      try {
        const response = await fetch(csvUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const groupedData = results.data.reduce((acc, row) => {
              if (!acc[row.Category]) {
                acc[row.Category] = [];
              }
              acc[row.Category].push(row);
              return acc;
            }, {});

            setData(groupedData);
            setFilteredData(groupedData);
            setLoading(false);
          },
          error: (error) => {
            setError(error.message);
            setLoading(false);
          }
        });
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let tempData = { ...data };

    // Filter by time range
    Object.keys(tempData).forEach(category => {
      tempData[category] = tempData[category].filter(row => isTimeInRange(row.Timestamp, startTime, endTime));
    });

    // Search by value
    if (searchValue) {
      Object.keys(tempData).forEach(category => {
        tempData[category] = tempData[category].filter(row => row.Value.toString().includes(searchValue));
      });
    }

    setFilteredData(tempData);
  }, [data, startTime, endTime, searchValue]);

  // Reset time filter
  const resetTimeFilter = () => {
    setStartTime('00:00');
    setEndTime('23:59');
    // Reapply filtering with default time range
    let tempData = { ...data };
    Object.keys(tempData).forEach(category => {
      tempData[category] = tempData[category].filter(row => isTimeInRange(row.Timestamp, '00:00', '23:59'));
    });

    // Apply search filter
    if (searchValue) {
      Object.keys(tempData).forEach(category => {
        tempData[category] = tempData[category].filter(row => row.Value.toString().includes(searchValue));
      });
    }

    setFilteredData(tempData);
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
                    onClick={resetTimeFilter}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
                  >
                    Reset Time Filter
                  </button>
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
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {Object.keys(filteredData).map((category) => (
                <div key={category} className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-3xl font-semibold mb-4 text-gray-800">{category}</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                          <th className="py-3 px-4 text-left text-gray-700">Timestamp</th>
                          <th className="py-3 px-4 text-left text-gray-700">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData[category].map((row, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{formatTime(row.Timestamp)}</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{row.Value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CsvTable;
