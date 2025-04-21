import React from "react";
import { Form } from "react-bootstrap";

const Input = ({ id, type = "text", placeholder, register, errorMessage, isInvalid }) => {
    return (
        <Form.Group className="mb-3">
            <Form.Control
                id={id}
                type={type}
                placeholder={placeholder}
                {...register}
                isInvalid={isInvalid}
            />
            {isInvalid && <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>}
        </Form.Group>
    );
};

export default Input;