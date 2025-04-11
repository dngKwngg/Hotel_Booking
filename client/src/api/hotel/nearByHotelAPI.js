export const getNearbyHotels = async () => {
    // Fake data
    return Promise.resolve({
        elements: [
            {
                id: 1,
                name: 'Cozy Inn',
                city: 'Pune',
                imageUrl: '/images/hotel1.jpg',
                price: 65,
                rating: 4.5,
            },
            {
                id: 2,
                name: 'Urban Stay',
                city: 'Mumbai',
                imageUrl: '/images/hotel2.jpg',
                price: 80,
                rating: 4.0,
            },
            {
                id: 3,
                name: 'Mountain View Hotel',
                city: 'Lonavala',
                imageUrl: '/images/hotel3.jpg',
                price: 120,
                rating: 4.8,
            },
        ],
    });
};
