
const formatPrice = (price) => {
    if (!price) price = 0;
    return price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0,
    });
};

export { formatPrice };
