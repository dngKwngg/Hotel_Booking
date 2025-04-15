import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

/**
 * @param {string} type - Bootstrap variant: 'success' | 'danger' | 'info' | 'warning'
 * @param {string} message - Nội dung thông báo
 * @param {function} dismissError - Hàm gọi khi đóng thông báo
 * @param {number} duration - Thời gian tự động ẩn (ms), mặc định 4000ms
 */
const Toast = ({ type = 'info', message, dismissError, duration = 4000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            dismissError?.();
        }, duration);
        return () => clearTimeout(timer);
    }, [dismissError, duration]);

    return (
        <Alert
            variant={type}
            onClose={dismissError}
            dismissible
            className="mt-3"
        >
            {message}
        </Alert>
    );
};

export default Toast;
