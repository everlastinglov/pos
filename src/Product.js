import React, { Component } from "react";
import { Table } from "react-bootstrap";

import { Button, ButtonToolbar } from "react-bootstrap";
import { AddProdModal } from "./AddProdModal";
import { EditProdModal } from "./EditProdModal";

export class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { emps: [], addModalShow: false, editModalShow: false };
  }

  refreshList() {
    fetch(process.env.REACT_APP_API + "product")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ emps: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }

  deleteEmp(empid) {
    if (window.confirm("Are you sure?")) {
      fetch(process.env.REACT_APP_API + "product/" + empid, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  }
  render() {
    const {
      emps,

      empid,
      empname,
      empType,
      empBrand,
      empPrice,
      empQty,
      empDoi,
      empBcode,

      photofilename,
    } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ProductId</th>
              <th>ProductName</th>
              <th>Type</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>DOI</th>
              <th>Barcode</th>
              <th>PhotosFileName</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {emps.map((emp) => (
              <tr key={emp.ProductId}>
                <td>{emp.ProductId}</td>
                <td>{emp.ProductName}</td>
                <td>{emp.Type}</td>
                <td>{emp.Brand}</td>
                <td>{emp.Price}</td>
                <td>{emp.Quantity}</td>
                <td>{emp.DateOfImporting}</td>
                <td>{emp.Barcode}</td>
                <td>{emp.PhotosFileName}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          empid: emp.ProductId,
                          empname: emp.ProductName,
                          emp: emp.Type,
                          empBrand: emp.Brand,
                          empPrice: emp.Price,
                          empQty: emp.Quantity,
                          empDoi: emp.DateOfImporting,
                          empBcode: emp.Barcode,
                          photofilename: emp.PhotoFileName,
                        })
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={() => this.deleteEmp(emp.ProductId)}
                    >
                      Delete
                    </Button>

                    <EditProdModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      empid={empid}
                      empname={empname}
                      empType={empType}
                      empBrand={empBrand}
                      empPrice={empPrice}
                      empQty={empQty}
                      empDoi={empDoi}
                      empBcode={empBcode}
                      photofilename={photofilename}
                    />
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Product
          </Button>

          <AddProdModal show={this.state.addModalShow} onHide={addModalClose} />
        </ButtonToolbar>
      </div>
    );
  }
}
