import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, Image } from "react-bootstrap";

export class AddProdModal extends Component {
  constructor(props) {
    super(props);
    this.state = { deps: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileSelected = this.handleFileSelected.bind(this);
  }

  photofilename = "*";
  imagesrc = process.env.REACT_APP_PHOTOPATH + this.photofilename;

  componentDidMount() {
    fetch(process.env.REACT_APP_API + "torol")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ deps: data });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(process.env.REACT_APP_API + "product", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ProductId: null,
        ProductName: event.target.ProductName.value,
        Type: event.target.Type.value,
        Brand: event.target.Brand.value,
        Price: event.target.Price.value,
        Quantity: event.target.Quantity.value,
        DateOfImporting: event.target.DateOfImporting.value,
        Barcode: event.target.Barcode.value,
        PhotoFileName: this.photofilename,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  handleFileSelected(event) {
    event.preventDefault();
    this.photofilename = event.target.files[0].name;
    const formData = new FormData();
    formData.append(
      "myFile",
      event.target.files[0],
      event.target.files[0].name
    );

    fetch(process.env.REACT_APP_API + "Product/SaveFile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.imagesrc = process.env.REACT_APP_PHOTOPATH + result;
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header clooseButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="ProductName">
                    <Form.Label>ProductName</Form.Label>
                    <Form.Control
                      type="text"
                      name="ProductName"
                      required
                      placeholder="ProductName"
                    />
                  </Form.Group>

                  <Form.Group controlId="Type">
                    <Form.Label>Type</Form.Label>
                    <Form.Control as="select">
                      {this.state.deps.map((dep) => (
                        <option key={dep.TorolId}>{dep.TorolName}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="Brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      type="text"
                      name="ProductName"
                      required
                      placeholder="Brand"
                    />
                  </Form.Group>

                  <Form.Group controlId="Price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="text"
                      name="Price"
                      required
                      placeholder="Price"
                    />
                  </Form.Group>

                  <Form.Group controlId="Quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="text"
                      name="Quantity"
                      required
                      placeholder="Quantity"
                    />
                  </Form.Group>

                  <Form.Group controlId="DateOfImporting">
                    <Form.Label>DateOfImporting</Form.Label>
                    <Form.Control
                      type="date"
                      name="DateOfImporting"
                      required
                      placeholder="DateOfImporting"
                    />
                  </Form.Group>

                  <Form.Group controlId="Barcode">
                    <Form.Label>Barcode</Form.Label>
                    <Form.Control
                      type="text"
                      name="Barcode"
                      required
                      placeholder="Barcode"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Add product
                    </Button>
                  </Form.Group>
                </Form>
              </Col>

              <Col sm={6}>
                <Image width="200px" height="200px" src={this.imagesrc} />
                <input onChange={this.handleFileSelected} type="File" />
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
