import { faStar, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/price-helpers';

const HotelViewCard = ({
    hotelId,
    name,
    description,
    rating,
    hotelRooms = [],
    hotelAmenities = [],
}) => {
    const navigate = useNavigate();

    const cheapestRoom = hotelRooms.reduce((min, room) =>
        room.price < min.price ? room : min,
        hotelRooms[0]
    );

    const price = cheapestRoom?.price || 0;
    // const ratings = Math.floor(Math.random() * 3) + 3; // Mock rating: 3 ~ 5

    const onBookNowClick = () => {
        navigate(`/hotel/${hotelId}`);
    };

    return (
        <div className="card mb-4 shadow-sm border-0" data-testid="hotel-view-card">
            <div className="row g-0">
                <div className="col-md-4">
                    <Link to={`/hotel/${hotelId}`}>
                        <img
                            src="https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg"
                            className="img-fluid h-auto object-fit-cover rounded-start"
                            style={{ maxHeight: '250px', width: '100%' }}
                        />
                    </Link>
                </div>
                <div className="col-md-8 d-flex flex-column justify-content-between">
                    <div className="card-body">
                        <Link to={`/hotel/${hotelId}`} className="text-decoration-none text-dark">
                            <h5 className="card-title fw-bold">{name}</h5>
                        </Link>
                        <p className="card-text text-muted">{description}</p>
                        <ul className="list-unstyled mt-2">
                            {hotelAmenities.map((amenity) => (
                                <li key={amenity.amenityId} className="text-success small">
                                    <FontAwesomeIcon icon={faCheck} className="me-1" />
                                    {amenity.amenityName}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="card-footer bg-white d-flex justify-content-between align-items-center border-0">
                        <span className="badge bg-primary text-white px-3 py-2" style={{ fontSize: '1rem' }}>
                            {rating} <FontAwesomeIcon icon={faStar} className="ms-1" />
                        </span>
                        <div className="text-end">
                            <div className="fw-bold text-dark mb-2" style={{ fontSize: '1rem' }}>
                                {formatPrice(price)}
                            </div>
                            <button
                                className="btn btn-success btn-lg" // Increase button size
                                onClick={onBookNowClick}
                                style={{ fontSize: '1rem', padding: '10px 10px' }} // Increase font size and padding
                            >
                                Book now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelViewCard;
