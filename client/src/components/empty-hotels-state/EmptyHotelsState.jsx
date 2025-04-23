import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel } from '@fortawesome/free-solid-svg-icons';

const EmptyHotelsState = () => (
    <div className="d-flex flex-column align-items-center justify-content-center text-center py-5 bg-light rounded shadow-sm" style={{ minHeight: '300px' }}>
        <div className="mb-3 text-muted">
            <FontAwesomeIcon icon={faHotel} size="4x" />
        </div>
        <h4 className="text-dark fw-semibold">No Hotels Found</h4>
        <p className="text-secondary mb-0">
            We can't seem to find any hotels that match your search criteria.
        </p>
    </div>
);

export default EmptyHotelsState;
