import React, { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { database } from '../utils/firebasedb'; // Adjust the path if necessary
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const SensorDataVisualization = ({ data, uniqueId }) => {
    const {
        acs712,
        ds18b20,
        hall_effect,
        hx711,
        mq7,
        Timestamp,
        health: Lifespan,
    } = data;

    // Format the timestamp
    const formattedTimestamp = Timestamp ? new Date(Timestamp).toLocaleString() : 'No Timestamp Data';

    // Set progress bar color based on Lifespan
    let progressColor;
    if (Lifespan > 80) {
        progressColor = '#4caf50'; // Green
    } else if (Lifespan > 50) {
        progressColor = '#ffeb3b'; // Yellow
    } else {
        progressColor = '#f44336'; // Red
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 text-center relative">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{uniqueId}</h3>
            <div className="text-xs text-gray-500 m-2">{formattedTimestamp}</div>
            <div className="w-24 h-24 mx-auto mb-4">
                {typeof Lifespan === 'number' ? (
                    <CircularProgressbar
                        value={Lifespan}
                        text={`${Lifespan.toFixed(2)}%`}
                        styles={{
                            path: { stroke: progressColor },
                            text: { fill: '#000', fontSize: '20px' },
                        }}
                    />
                ) : (
                    <div className="text-red-500 font-bold">No Lifespan Data</div>
                )}
            </div>
            <div className="mt-6 space-y-2">
                <div className="text-gray-700">ACS712: {acs712}</div>
                <div className="text-gray-700">DS18B20: {ds18b20}</div>
                <div className="text-gray-700">Hall Effect: {hall_effect}</div>
                <div className="text-gray-700">HX711: {hx711}</div>
                <div className="text-gray-700">MQ7: {mq7}</div>
            </div>
        </div>
    );
};

const App = () => {
    const [sensorData, setSensorData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sensorDataRef = ref(database, 'Health Status');

        const unsubscribe = onValue(sensorDataRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const entries = Object.entries(data).map(([key, value]) => ({
                    uniqueId: key,
                    data: value,
                }));
                setSensorData(entries);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {loading ? (
                <div className="text-2xl text-gray-600">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {sensorData.map(({ uniqueId, data }) => (
                        <SensorDataVisualization key={uniqueId} data={data} uniqueId={uniqueId} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
