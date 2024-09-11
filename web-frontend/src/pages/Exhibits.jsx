import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { database, ref, set, get, update, remove } from '../utils/firebasedb';
import { FaTrashAlt } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';

const Exhibits = () => {
  const [exhibits, setExhibits] = useState([]);
  const [newExhibitName, setNewExhibitName] = useState('');
  const [newExhibitCategory, setNewExhibitCategory] = useState(''); // New state for category

  // Fetch exhibits from Firebase on component mount
  useEffect(() => {
    const fetchExhibits = async () => {
      try {
        const snapshot = await get(ref(database, 'exhibits'));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setExhibits(Object.keys(data).map(key => ({ id: key, ...data[key] })));
        }
      } catch (error) {
        console.error('Error fetching exhibits:', error);
      }
    };

    fetchExhibits();
  }, []);

  // Add a new exhibit to Firebase
  const handleAddExhibit = async () => {
    if (newExhibitName.trim() === '' || newExhibitCategory.trim() === '') return;

    try {
      const newExhibitId = Date.now().toString();
      const newExhibitRef = ref(database, `exhibits/${newExhibitId}`);
      await set(newExhibitRef, { 
        name: newExhibitName, 
        status: 'Inactive', 
        category: newExhibitCategory // Add category to the new exhibit
      });

      setExhibits([...exhibits, { id: newExhibitId, name: newExhibitName, status: 'Inactive', category: newExhibitCategory }]);
      setNewExhibitName('');
      setNewExhibitCategory(''); // Clear the category input
    } catch (error) {
      console.error('Error adding exhibit:', error);
    }
  };

  // Remove an exhibit from Firebase
  const handleRemoveExhibit = async (id) => {
    try {
      await remove(ref(database, `exhibits/${id}`));
      setExhibits(exhibits.filter(exhibit => exhibit.id !== id));
    } catch (error) {
      console.error('Error removing exhibit:', error);
    }
  };

  // Toggle exhibit status between 'Active' and 'Inactive'
  const handleToggleStatus = async (id) => {
    try {
      const exhibitRef = ref(database, `exhibits/${id}`);
      const snapshot = await get(exhibitRef);

      if (!snapshot.exists()) {
        console.error('Exhibit not found:', id);
        return;
      }

      const currentExhibit = snapshot.val();
      const newStatus = currentExhibit.status === 'Active' ? 'Inactive' : 'Active';
      await update(exhibitRef, { status: newStatus });

      setExhibits(
        exhibits.map(exhibit =>
          exhibit.id === id
            ? { ...exhibit, status: newStatus }
            : exhibit
        )
      );
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 to-blue-200 p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Exhibits Management</h1>
      <p className='text-lg text-gray-800 font-medium text-center m-4'>
        View the live footages of these exhibits <Link to="/live-footage" className="text-teal-500 hover:underline">here</Link>.
      </p>
      
      {/* Add Exhibit */}
      <div className="flex flex-col md:flex-row items-center justify-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          value={newExhibitName}
          onChange={(e) => setNewExhibitName(e.target.value)}
          placeholder="Enter new exhibit name"
          className="p-3 border border-gray-300 rounded-lg shadow-md w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
        />
        <input
          type="text"
          value={newExhibitCategory}
          onChange={(e) => setNewExhibitCategory(e.target.value)}
          placeholder="Enter exhibit category"
          className="p-3 border border-gray-300 rounded-lg shadow-md w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
        />
        <button
          onClick={handleAddExhibit}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 flex items-center space-x-2"
        >
          <MdAdd size={20} />
          <span>Add Exhibit</span>
        </button>
      </div>

      {/* Exhibits Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exhibits.map(exhibit => (
          <div key={exhibit.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2 flex justify-between">
                {exhibit.name}
                <p className="mb-4 text-gray-700 text-sm">
                  {exhibit.category}
                </p>
              </h2>
              <p className={`text-lg font-medium mb-4 ${exhibit.status === 'Active' ? 'text-green-500' : 'text-gray-500'}`}>
                {exhibit.status}
              </p>
              <div className="flex items-center space-x-4">
                <div
                  onClick={() => handleToggleStatus(exhibit.id)}
                  className={`relative w-12 h-6 flex items-center cursor-pointer transition-transform duration-300 ease-in-out rounded-full ${exhibit.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}
                >
                  <div className={`absolute left-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${exhibit.status === 'Active' ? 'translate-x-6' : ''}`}></div>
                </div>
                <button
                  onClick={() => handleRemoveExhibit(exhibit.id)}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 flex items-center space-x-2"
                >
                  <FaTrashAlt size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exhibits;
