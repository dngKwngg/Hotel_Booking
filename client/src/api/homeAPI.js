// api/homeAPI.js
export const getPopularDestinations = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                elements: [
                    { id: 1, name: 'Hà Nội', imageUrl: 'https://visitbadinh.com/DataFiles/2023/11/Blog/20231128-153758-pc93aYUF.webp' },
                    { id: 2, name: 'Hồ Chí Minh', imageUrl: 'https://visitbadinh.com/DataFiles/2023/11/Blog/20231128-153758-pc93aYUF.webp' },
                    { id: 3, name: 'Đà Nẵng', imageUrl: 'https://duonggiahotel.vn/wp-content/uploads/2023/11/dia-diem-du-lich-da-nang-avt.jpg' },
                    { id: 4, name: 'Huế', imageUrl: 'https://duonggiahotel.vn/wp-content/uploads/2023/11/dia-diem-du-lich-da-nang-avt.jpg' },
                    { id: 5, name: 'Nha Trang', imageUrl: 'https://duonggiahotel.vn/wp-content/uploads/2023/11/dia-diem-du-lich-da-nang-avt.jpg' },
                    { id: 6, name: 'Hạ Long', imageUrl: 'https://duonggiahotel.vn/wp-content/uploads/2023/11/dia-diem-du-lich-da-nang-avt.jpg' },
                ],
            });
        }, 500);
    });
};

export const getAvailableCities = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                elements: ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Huế', 'Nha Trang', 'Hạ Long'],
            });
        }, 500);
    });
};
