import React, {Component} from 'react';

import API from '../utils/API';
import {Redirect} from 'react-router-dom';
import {Col, Row, Container} from '../components/Grid';
import {Input, FormBtn} from '../components/Form';

class NewContact extends Component {
  state = {
    quickref: '',
    name_first: '',
    name_last: '',
    meeting_info: '',
    mutualContacts: [],
    occupation: '',
    notes: ''
  };

  componentDidMount() {}

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.quickref) {
      API.saveContact({
        ...this.state
      })
        .then(res => {
            return <Redirect to="/contacts" />;
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="12">
            <form>
              <Input
                value={this.state.quickref}
                onChange={this.handleInputChange}
                name="quickref"
                placeholder="dude from cafe who sneezed on me(required)"
                type="text"
              />
              <Input
                value={this.state.name_first}
                onChange={this.handleInputChange}
                name="name_first"
                placeholder="Bob"
              />
              <Input
                value={this.state.name_last}
                onChange={this.handleInputChange}
                name="name_last"
                placeholder="Ross"
              />
              <Input
                value={this.state.meeting_info}
                onChange={this.handleInputChange}
                name="meeting_info"
                placeholder="cafe blah"
                type="text"
              />
              <FormBtn
                // disabled={!(this.state.email && this.state.password)}
                onClick={this.handleFormSubmit}>
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
