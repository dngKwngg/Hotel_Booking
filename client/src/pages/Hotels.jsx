import { useEffect, useState } from "react";

const Hotels = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/roles`);
                const data = await response.json();
                console.log(data);
                setHotels(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchHotels();
    }, []);

    return <h1>{hotels.map(
        (hotel) => <div key={hotel.id}>{hotel.roleName}</div>
    )}</h1>
};

export default Hotels;
