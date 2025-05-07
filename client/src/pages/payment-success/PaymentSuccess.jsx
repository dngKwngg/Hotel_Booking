import {Button, Card, CardFooter, CardHeader, CardTitle} from "react-bootstrap";
import * as PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {XCircle} from "lucide-react";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons"
import axiosInstance from "../../api/axiosInstance.js";
import {useEffect} from "react";

const PaymentSuccess = () => {
    // Extract the query parameters from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const status = queryParams.get("status");
    const orderCode = queryParams.get("orderCode");

    const updateStatus = async () => {
        const response = await axiosInstance.put(`/api/v1/bookings/update-status`, {
            orderCode,
            // lowercase status
            status: status.toLowerCase()
        });
        console.log(response.data);
    }

    // Call the updateStatus function when the component mounts
    useEffect(() => {
        updateStatus();
    }, []);

    return (
        // add margin to main

        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center mt-5">
            {/*<div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-8">*/}
            <div className="text-center">
                <div className="flex justify-center mb-6">
                    {/* Ant Design CloseCircleOutlined Icon */}
                    <CheckCircleOutlined style={{ fontSize: "64px", color: "#333" }} />
                </div>
                <h1 className="text-2xl font-bold mb-2 mt-3">Payment Successful</h1>
                <p className="text-gray-600 mb-6 mt-3">Your payment has been paid. Thank you for booking rooms.</p>

                {/*{paymentInfo.orderCode && <p className="text-sm text-gray-500 mb-6">Order Code: {paymentInfo.orderCode}</p>}*/}

                <Button
                    href="/"
                    className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors mt-3"
                >
                    Back to Home
                </Button>
            </div>
            {/*</div>*/}
        </main>
    );
}

export default PaymentSuccess;