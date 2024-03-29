import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import moment from "moment";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./home.css";
import { deleteTransactions, editTransactions } from "../../utils/ApiRequest";
import axios from "axios";
import { Toast } from "react-bootstrap";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

const toastOptions = {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
};
const TableData = (props) => {
  const [show, setShow] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [currId, setCurrId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState(null);

  const handleEditClick = (itemKey) => {
    console.log("Clicked button ID:", itemKey);
    if (transactions.length > 0) {
      const editTran = props.data.filter((item) => item._id === itemKey);
      setCurrId(itemKey);
      setEditingTransaction(editTran);
      handleShow();
    }
  };

  const handleEditSubmit = async (e) => {
    const { data } = await axios.put(`${editTransactions}/${currId}`, {
      ...values,
    });

    if (data.success === true) {
      await handleClose();
      await setRefresh(!refresh);
      window.location.reload();
    } else {
      console.log("error");
    }
  };
  // const handleEditSubmit = async (e) => {
  //   e.preventDefault();

  //   // Show SweetAlert2 confirmation dialog
  //   const result = await Swal.fire({
  //     title: "Do you want to save the changes?",
  //     showDenyButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: "Save",
  //     denyButtonText: `Don't save`,
  //   });

  //   if (result.isConfirmed) {
  //     const { data } = await axios.put(`${editTransactions}/${currId}`, {
  //       ...values,
  //     });

  //     if (data.success === true) {
  //       await handleClose();
  //       await setRefresh(!refresh);
  //       window.location.reload();
  //     } else {
  //       console.log("error");
  //     }
  //   } else if (result.isDenied) {
  //     Swal.fire("Changes are not saved", "", "info");
  //   }
  // };

  // const handleDeleteClick = async (itemKey) => {
  //   console.log(user._id);
  //   console.log("Clicked button ID delete:", itemKey);
  //   setCurrId(itemKey);
  //   const { data } = await axios.post(`${deleteTransactions}/${itemKey}`, {
  //     userId: props.user._id,
  //   });

  //   if (data.success === true) {
  //     await setRefresh(!refresh);
  //     window.location.reload();
  //   } else {
  //     Toast.error("Something went wrong!");
  //   }
  // };
  const handleDeleteClick = async (itemKey) => {
    console.log(user._id);
    console.log("Clicked button ID delete:", itemKey);
    setCurrId(itemKey);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.post(`${deleteTransactions}/${itemKey}`, {
          userId: props.user._id,
        });

        if (data.success === true) {
          await setRefresh(!refresh);
          window.location.reload();
        } else {
          Toast.error("Something went wrong!");
        }

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const [values, setValues] = useState({
    title: "",
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
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    setUser(props.user);
    setTransactions(props.data);
  }, [props.data, props.user, refresh]);

  const exportToExcel = () => {
    let totalExpense = 0;
    let totalCredit = 0;
    let overallTotal = 0;

    props.data.forEach((item) => {
      const amount = parseFloat(item.amount);
      overallTotal += amount;

      if (item.transactionType === "expense") {
        totalExpense += amount;
      } else if (item.transactionType === "credit") {
        totalCredit += amount;
      }
    });

    const dataToExport = props.data.map((item) => ({
      Date: moment(item.date).format("DD-MM-YYYY"),
      Title: item.title,
      Amount: item.amount,
      Type: item.transactionType,
      Category: item.category,
    }));

    dataToExport.push(
      {
        Date: "",
        Title: "Total Income:",
        Amount: totalCredit.toFixed(2),
        Type: "",
        Category: "",
      },
      {
        Date: "",
        Title: "Total Expense:",
        Amount: totalExpense.toFixed(2),
        Type: "",
        Category: "",
      },
      {
        Date: "",
        Title: "Overall Total:",
        Amount: overallTotal.toFixed(2),
        Type: "",
        Category: "",
      }
    );

    const ws = XLSX.utils.json_to_sheet(dataToExport);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");

    XLSX.writeFile(wb, "transactions.xlsx");
  };

  return (
    <>
      <Container>
        <Table
          responsive="md"
          className=" border-dashed hover:border-solid border-2  border-sky-800 data-table"
        >
          <thead>
            <tr>
              <th>
                <div className="flex">
                  Date
                  <lord-icon
                    src="https://cdn.lordicon.com/wmlleaaf.json"
                    trigger="loop"
                    style={{ width: "25px", height: "25px" }}
                  ></lord-icon>
                </div>
              </th>
              <th>
                <div className="flex">
                  Title
                  <lord-icon
                    src="https://cdn.lordicon.com/fnxnvref.json"
                    trigger="loop"
                    style={{ width: "25px", height: "25px" }}
                  ></lord-icon>
                </div>
              </th>
              <th>
                <div className="flex">
                  Amount
                  <lord-icon
                    src="https://cdn.lordicon.com/ncitidvz.json"
                    trigger="loop"
                    style={{ width: "25px", height: "25px" }}
                  ></lord-icon>
                </div>
              </th>
              <th>
                <div className="flex">
                  Type
                  <lord-icon
                    src="https://cdn.lordicon.com/ipnwkgdy.json"
                    trigger="loop"
                    style={{ width: "25px", height: "25px" }}
                  ></lord-icon>
                </div>
              </th>
              <th>
                <div className="flex">
                  Category
                  <lord-icon
                    src="https://cdn.lordicon.com/jnikqyih.json"
                    trigger="loop"
                    style={{ width: "25px", height: "25px" }}
                  ></lord-icon>
                </div>
              </th>
              <th>
                <div className="flex">
                  Action
                  <lord-icon
                    src="https://cdn.lordicon.com/xkmjbjuw.json"
                    trigger="loop"
                    style={{ width: "25px", height: "25px" }}
                  ></lord-icon>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="text-white">
            {props.data.map((item, index) => (
              <tr key={index}>
                <td>{moment(item.date).format("DD-MM-YYYY")}</td>
                <td>{item.title}</td>
                <td>{item.amount}</td>
                <td>{item.transactionType}</td>
                <td>{item.category}</td>
                <td>
                  <div className="icons-handle">
                    {/* <EditNoteIcon
                      sx={{ cursor: "pointer" }}
                      key={item._id}
                      id={item._id}
                      onClick={() => handleEditClick(item._id)}
                    /> */}
                    <lord-icon
                      src="https://cdn.lordicon.com/lsrcesku.json"
                      trigger="hover"
                      colors="primary:#121331,secondary:#242424,tertiary:#ffc738,quaternary:#e4e4e4"
                      style={{ cursor: "pointer" }}
                      key={item._id}
                      id={item._id}
                      onClick={() => handleEditClick(item._id)}
                    ></lord-icon>

                    {/* <DeleteForeverIcon
                      sx={{ color: "red", cursor: "pointer" }}
                      key={index}
                      id={item._id}
                      onClick={() => handleDeleteClick(item._id)}
                    /> */}
                    <lord-icon
                      src="https://cdn.lordicon.com/xekbkxul.json"
                      trigger="hover"
                      stroke="bold"
                      style={{ cursor: "pointer" }}
                      colors="primary:#ffffff,secondary:#e83a30,tertiary:#646e78,quaternary:#ebe6ef"
                      key={index}
                      id={item._id}
                      onClick={() => handleDeleteClick(item._id)}
                    ></lord-icon>

                    {editingTransaction ? (
                      <>
                        <div>
                          <Modal show={show} onHide={handleClose} centered>
                            <Modal.Header closeButton>
                              <Modal.Title className="text-[#07074D]">
                                Update Transaction Details
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form onSubmit={handleEditSubmit}>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formName"
                                >
                                  <Form.Label className="mb-1 block text-base font-medium text-[#07074D]">
                                    Title
                                  </Form.Label>
                                  <Form.Control
                                    name="title"
                                    type="text"
                                    placeholder={editingTransaction[0].title}
                                    value={values.title}
                                    onChange={handleChange}
                                  />
                                </Form.Group>

                                {/* <Form.Group
                                  className="w-1/2 mt-1 block text-base font-medium text-[#07074D]"
                                  controlId="formAmount"
                                >
                                  <Form.Label>Amount</Form.Label>
                                  <Form.Control
                                    name="amount"
                                    type="number"
                                    placeholder={editingTransaction[0].amount}
                                    value={values.amount}
                                    onChange={handleChange}
                                  />
                                </Form.Group> */}
                                <div className="flex gap-4 mb-2">
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
                                      <>
                                        <option value="">Choose...</option>
                                        <option value="USD">USD</option>
                                        <option value="EURO">EURO</option>
                                        <option value="RUPEE">RUPEE</option>
                                      </>
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
                                      placeholder={editTransactions[0].amount}
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
                                    placeholder={editingTransaction[0].category}
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
                                    placeholder={
                                      editingTransaction[0].description
                                    }
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
                                    <option
                                      value={
                                        editingTransaction[0].transactionType
                                      }
                                    >
                                      {editingTransaction[0].transactionType}
                                    </option>
                                    <option value="Credit">Income</option>
                                    <option value="Expense">Expense</option>
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
                              <button
                                class=" hover:bg-red-500 text-red-700 font-semibold hover:text-black py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                // variant="outline-danger"
                                onClick={handleClose}
                              >
                                Close
                              </button>
                              <button
                                class=" hover:bg-green-500 text-green-700 font-semibold hover:text-black py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                onClick={handleEditClick}
                              >
                                Submit
                              </button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* <Details /> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-end mb-3">
          <button
            onClick={exportToExcel}
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center "
          >
            <svg
              class="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Download</span>
          </button>
        </div>
      </Container>
    </>
  );
};

export default TableData;
