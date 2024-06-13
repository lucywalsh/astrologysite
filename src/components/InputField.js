import React from 'react';
import Form from 'react-bootstrap/Form';

export default function InputField(
    { name, label, error, field }
) {
return (
    <Form.Group controlId={name}>
        {label && <Form.Label>{label}</Form.Label>}
        {field}
        <Form.Text className="warning">{error}</Form.Text>
    </Form.Group>
);
}