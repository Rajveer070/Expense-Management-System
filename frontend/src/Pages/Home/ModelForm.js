import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const ModelForm = ({ transaction, onClose, isShow }) => {
  const [show, setShow] = useState(false);

  const [values, setValues] = useState({
    title: "",
    currency: "",
    amount: "",
    description: "",
    category: "",
    date: "",
    transactionType: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <Modal show={isShow} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-[#07074D]">
            Update Transaction Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label className="mb-1 block text-base font-medium text-[#07074D]">
                Title
              </Form.Label>
              <Form.Control
                name="title"
                type="text"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                placeholder={transaction.title}
                value={values.title}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="flex">
              <Form.Group
                className="w-1/2 mt-1 block text-base font-medium text-[#07074D]"
                controlId="formSelect"
              >
                <Form.Label>Currency</Form.Label>
                <Form.Select
                  name="currency"
                  value={values.currency}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option value="USD">USD</option>
                  <option value="EURO">EURO</option>
                  <option value="RUPEE">RUPEE</option>
                </Form.Select>
              </Form.Group>

              <Form.Group
                className="w-1/2 mt-1 block text-base font-medium text-[#07074D]"
                controlId="formAmount"
              >
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  name="amount"
                  type="number"
                  placeholder={values.amount}
                  value={values.amount}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <Form.Group
              className="mb-1 block text-base font-medium text-[#07074D]"
              controlId="category"
            >
              <Form.Label>Category</Form.Label>
              <Form.Control
                name="category"
                type="text"
                className="w-full mb-2 rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                placeholder={values.category}
                value={values.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              className="mt-1 block text-base font-medium text-[#07074D]"
              controlId="formDescription"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                className="w-full mb-2 rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                placeholder={transaction.description}
                value={values.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              className="mt-1 block text-base font-medium text-[#07074D]"
              controlId="formSelect1"
            >
              <Form.Label>Transaction Type</Form.Label>
              <Form.Select
                name="transactionType"
                value={values.transactionType}
                onChange={handleChange}
              >
                <option value="">Choose...</option>
                <option value="credit">Income</option>
                <option value="expense">Expense</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="mt-1 block text-base font-medium text-[#07074D]"
              controlId="formDate"
            >
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={values.date}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-success">Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModelForm;
