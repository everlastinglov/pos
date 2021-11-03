import React, { Component } from "react";
import { Table } from "react-bootstrap";

import { Button, ButtonToolbar } from "react-bootstrap";
import { AddTorolModal } from "./AddTorolModal";
import { EditTorolModal } from "./EditTorolModal";

export class Torol extends Component {
  constructor(props) {
    super(props);
    this.state = { deps: [], addModalShow: false, editModalShow: false };
  }

  refreshList() {
    fetch(process.env.REACT_APP_API + "torol")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ deps: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }

  deleteDep(depid) {
    if (window.confirm("Are you sure?")) {
      fetch(process.env.REACT_APP_API + "torol/" + depid, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  }
  render() {
    const { deps, depid, depname } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>TorolId</th>
              <th>TorolName</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {deps.map((dep) => (
              <tr key={dep.TorolId}>
                <td>{dep.TorolId}</td>
                <td>{dep.TorolName}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          depid: dep.TorolId,
                          depname: dep.TorolName,
                        })
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={() => this.deleteDep(dep.TorolId)}
                    >
                      Delete
                    </Button>

                    <EditTorolModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      depid={depid}
                      depname={depname}
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
            Add Torol
          </Button>

          <AddTorolModal
            show={this.state.addModalShow}
            onHide={addModalClose}
          />
        </ButtonToolbar>
      </div>
    );
  }
}
