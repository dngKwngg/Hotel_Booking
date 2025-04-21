import { Form } from 'react-bootstrap';

const sortOptions = [
    { label: 'Đánh giá cao', value: 'rating_desc' },
    { label: 'Giá thấp đến cao', value: 'price_asc' },
    { label: 'Giá cao đến thấp', value: 'price_desc' },
];

const SortByFilter = ({ value, onChange }) => {
    return (
        <Form.Select
            value={value.value}
            onChange={(e) => {
                const selected = sortOptions.find(opt => opt.value === e.target.value);
                onChange(selected);
            }}
            className="w-auto"
        >
            {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </Form.Select>
    );
};

export default SortByFilter;
