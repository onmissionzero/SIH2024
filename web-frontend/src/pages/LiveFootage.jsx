import React, { useState, useEffect, useRef } from 'react';
import { database, ref, get } from '../utils/firebasedb';
import { FaCamera } from 'react-icons/fa';

const CameraFootage = () => {
  const [exhibits, setExhibits] = useState([]);
  const videoRefs = useRef([]); // Use an array to store refs for multiple video elements

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

  // Start local webcam feed
  useEffect(() => {
    const startWebcam = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRefs.current.forEach(videoRef => {
            if (videoRef) {
              videoRef.srcObject = stream;
              videoRef.play();
            }
          });
        } catch (error) {
          console.error('Error accessing webcam:', error);
        }
      }
    };

    startWebcam();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 to-blue-200 p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Camera Footage</h1>

      {/* Cameras Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exhibits.map((exhibit, index) => (
          <div key={exhibit.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 relative">
            <div className="aspect-w-16 aspect-h-9">
              <video
                ref={el => (videoRefs.current[index] = el)}
                className="w-full h-full object-cover"
                autoPlay
                muted
              />
            </div>
            <div className="absolute top-0 left-0 bg-black bg-opacity-50 p-2 text-white text-sm font-semibold">
              <FaCamera size={20} className="inline-block mr-2" />
              {exhibit.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraFootage;
