import ImageCard from '../image-card/ImageCard';
import ImageCardSkeleton from '../image-card-skeleton/ImageCardSkeleton';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const PopularLocations = ({ popularDestinationsData }) => {
    const navigate = useNavigate();

    const handleClick = (city) => {
        navigate('/hotels', {
            state: {
                city: city.toLowerCase(),
            },
        });
    };

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4 text-dark fw-bold">
                Book Hotels at Popular Destinations
            </h2>
            <Row className="g-4 justify-content-center">
                {popularDestinationsData?.isLoading
                    ? Array.from({ length: 6 }, (_, i) => (
                        <Col key={i} xs={6} sm={4} md={3} lg={2}>
                            <ImageCardSkeleton />
                        </Col>
                    ))
                    : popularDestinationsData?.data?.map((city) => (
                        <Col key={city.id} xs={6} sm={4} md={3} lg={2}>
                            <ImageCard
                                name={city.name}
                                imageUrl={city.imageUrl}
                                onClick={handleClick}
                            />
                        </Col>
                    ))}
            </Row>
        </Container>
    );
};

export default PopularLocations;
