import React, { Component } from "react";

import API from "../utils/API";
import {  Redirect } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";

class NewContact extends Component {
  state = {
		name_first: "",
    name_last: "",
    deets: ""
  };

  componentDidMount() {
  }

  
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="12">
 
            <form>
              <Input
                value={this.state.name_first}
                onChange={this.handleInputChange}
                name="name_first"
                placeholder="Bob (required)"
              />
              <Input
                value={this.state.name_last}
                onChange={this.handleInputChange}
                name="name_last"
                placeholder="Ross (required)"
              />
              <Input
                value={this.state.deets}
                onChange={this.handleInputChange}
                name="deets"
                placeholder="(required)"
                type="text"
              />
              <FormBtn
                // disabled={!(this.state.email && this.state.password)}
                onClick={this.handleFormSubmit}
              >
                signup
              </FormBtn>
            </form>
          </Col>
          
        </Row>

      </Container>
    );
  }
}

export default NewContact;
