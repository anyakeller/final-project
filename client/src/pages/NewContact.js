import React, {Component} from 'react';

import API from '../utils/API';
import {Redirect} from 'react-router-dom';
import {Col, Row, Container} from '../components/Grid';
import {Input, FormBtn, Label} from '../components/Form';

class NewContact extends Component {
  state = {
    loading: true,
    authenticated: false,
    formdata: {
      quickref: '',
      name_first: '',
      name_last: '',
      meeting_info: '',
      mutualContacts: [],
      occupation: '',
      notes: ''
    }
  };

  componentWillMount() {
    this.props.authenticate(this);
  }

  componentDidMount() {
    console.log('state of auth', this.props.authenticated);
  }

  handleInputChange = event => {
    const {name, value} = event.target;
    let currentformdata = this.state.formdata;
    currentformdata[name] = value;
    this.setState({
      formdata: currentformdata
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.formdata.quickref) {
      API.saveContact({
        ...this.state.formdata
      })
        .then(res => {
					console.log("ASDfadsadsf");
					this.props.history.push("/contacts");
          return <Redirect to="/contacts" />;
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    if (this.state.loading) return <div></div>;
    else if (this.state.authenticated)
      return (
        <Container fluid>
          <Row>
            <Col size="12">
              <form>
                <Label>Quick Reference</Label>
                <Input
                  value={this.state.formdata.quickref}
                  onChange={this.handleInputChange}
                  name="quickref"
                  placeholder="e.g. Dude who taught me how to paint"
                  type="text"
                />
                <Label>First Name</Label>
                <Input
                  value={this.state.formdata.name_first}
                  onChange={this.handleInputChange}
                  name="name_first"
                  type="text"
                  placeholder="Bob"
                />
                <Label>Last Name</Label>
                <Input
                  value={this.state.formdata.name_last}
                  onChange={this.handleInputChange}
                  name="name_last"
                  type="text"
                  placeholder="Ross"
                />
                <Label>Meeting Notes</Label>
                <Input
                  value={this.state.formdata.meeting_info}
                  onChange={this.handleInputChange}
                  name="meeting_info"
                  placeholder="Had a lot of cameras around and kept talking about happy trees. Great hair."
                  type="text"
                />
                <FormBtn
                  // disabled={!(this.state.email && this.state.password)}
                  onClick={this.handleFormSubmit}>
                  Add Contact
                </FormBtn>
              </form>
            </Col>
          </Row>
        </Container>
      );
    else return <Redirect to="/login" />;
  }
}

export default NewContact;
