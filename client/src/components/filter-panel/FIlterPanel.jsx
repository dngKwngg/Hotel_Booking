import { Form, Card } from 'react-bootstrap';

const FiltersPanel = () => {
    return (
        <Card className="p-3 shadow-sm">
            <h5>Bộ lọc</h5>
            <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Có bữa sáng" value="breakfast_included" />
                <Form.Check type="checkbox" label="Miễn phí huỷ" value="free_cancellation" />
                <Form.Check type="checkbox" label="Wi-Fi miễn phí" value="free_wifi" />
                <Form.Check type="checkbox" label="Có hồ bơi" value="pool" />
            </Form.Group>
        </Card>
    );
};

export default FiltersPanel;
