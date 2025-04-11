import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

const ImageCardSkeleton = () => {
    return (
        <Card className="h-100 shadow-sm">
            <Placeholder as={Card.Img} animation="wave" style={{ height: '100px' }} bg="secondary" />
            <Card.Body className="p-2">
                <Placeholder xs={6} bg="secondary" />
            </Card.Body>
        </Card>
    );
};

export default ImageCardSkeleton;
