import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
    const [count, setCount] = useState(0);
    const [apiData, setApiData] = useState(''); // State for API data

    useEffect(() => {
        // Fetch data from the API using Axios
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/test'); // Use relative URL (Vite proxy handles the rest)
                setApiData(response.data); // Update state with the API data
            } catch (error) {
                console.error('Error fetching data:', error);
                setApiData('Error fetching data'); // Handle error case
            }
        };

        fetchData(); // Call the fetchData function
    }, []); // Empty dependency array means this only runs once on mount

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            {/* Display the API data */}
            <h1>{apiData}</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
