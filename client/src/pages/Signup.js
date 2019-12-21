import React, {Component} from 'react';

import API from '../utils/API';
import {Redirect} from 'react-router-dom';
import {Col, Row, Container} from '../components/Grid';
import {Input, FormBtn} from '../components/Form';

class Signup extends Component {
  state = {
    loading: true,
    authenticated: false,
    formdata: {
      email: '',
      username: '',
      password: '',
      passwordConf: ''
    }
  };

  componentDidMount() {
    this.props.authenticate(this);
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
    if (this.state.formdata.email && this.state.formdata.password) {
      API.signup({
        username: this.state.formdata.username,
        email: this.state.formdata.email,
        password: this.state.formdata.password,
        passwordConf: this.state.formdata.passwordConf
      })
        .then(res => {
          if (res.status === 200) {
            this.props.authenticate(this);
            return <Redirect to="/" />;
          }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    if (this.state.loading) return <div></div>;
    else if (!this.state.authenticated)
    return (
      <Container fluid>
        <Row>
          <Col size="12">
            <form>
              <Input
                value={this.state.formdata.username}
                onChange={this.handleInputChange}
                name="username"
                placeholder="username (required)"
              />
              <Input
                value={this.state.formdata.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="email (required)"
              />
              <Input
                value={this.state.formdata.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="(required)"
                type="password"
              />
              <Input
                value={this.state.formdata.passwordConf}
                onChange={this.handleInputChange}
                name="passwordConf"
                placeholder="(required)"
                type="password"
              />

              <FormBtn
                // disabled={!(this.state.email && this.state.password)}
                onClick={this.handleFormSubmit}>
                Sign up
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
    else return <Redirect to="/contacts" />;
  }
}

export default Signup;
