import React from 'react';
import Card from 'react-bootstrap/Card';

/**
 * ImageCard
 * @param {Object} props
 * @param {String} props.name - Tên điểm đến
 * @param {String} props.imageUrl - Đường dẫn ảnh
 * @param {Function} props.onClick - Hàm xử lý khi click
 */
const ImageCard = ({ name, imageUrl, onClick }) => {
    return (
        <Card
            onClick={() => onClick(name)}
            className="h-100 text-center shadow-sm hover-shadow cursor-pointer"
            style={{ cursor: 'pointer' }}
        >
            <Card.Img
                variant="top"
                src={imageUrl}
                alt={name}
                style={{ height: '100px', objectFit: 'cover' }}
            />
            <Card.Body className="p-2">
                <Card.Text className="mb-0 fw-semibold">{name}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ImageCard;
