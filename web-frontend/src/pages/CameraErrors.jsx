// CameraErrors.jsx
import React, { useState, useEffect } from 'react';
import { storage } from '../utils/firebasestorage';
import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage'; // Import functions for Firebase Storage

const CameraErrors = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      // Create a reference to the 'images' directory
      const listRef = ref(storage);

      // List all items (files) in the 'images' directory
      const result = await listAll(listRef);

      // Create an array of promises to get the download URL and metadata for each item
      const imagePromises = result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef); // Get the download URL
        const metadata = await getMetadata(itemRef); // Get the metadata
        return { url, metadata };
      });

      // Wait for all promises to resolve
      const imageData = await Promise.all(imagePromises);
      setImages(imageData); // Update state with the fetched image data
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false); // Set loading to false once done
    }
  };

  useEffect(() => {
    // Fetch images on mount
    fetchImages();

    // Set up polling every 10 seconds
    const intervalId = setInterval(fetchImages, 10000); // Poll every 10 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {images.length > 0 ? (
        images.map((image, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <img src={image.url} alt={image.metadata.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{image.metadata.name}</h3>
                <p className="text-gray-600">{image.metadata.customMetadata?.description || 'No description available'}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-lg font-semibold">No images available</div>
      )}
    </div>
  );
};

export default CameraErrors;
