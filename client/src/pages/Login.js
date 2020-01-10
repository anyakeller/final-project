import React, {Component} from 'react';

import API from '../utils/API';
import {Redirect} from 'react-router-dom';
import {Col, Row, Container} from '../components/Grid';
import {Input, FormBtn, Label} from '../components/Form';

class Login extends Component {
  state = {
    loading: true,
    authenticated: false,
    email: '',
    password: ''
  };

  componentDidMount() {
    this.props.authenticate(this);
  }

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      API.loginUser({
        email: this.state.email,
        password: this.state.password
      })
        .then(res => {
          if (res.status === 200) {
            this.props.authenticate(this);
            return <Redirect to="/contacts" />;
          }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    if (this.state.loading) return <div></div>;
    else if (!this.state.authenticated) return (
      <Container fluid>
        <Row>
          <Col size="10">
            <h5 style={{ fontFamily: "'Permanent Marker', cursive", color: "rgb(50, 50, 50)", textAlign: "center", textShadow: "1px 1px 1px lightgrey"}}>Login</h5>
            <form>
              <Label>Email</Label>
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="bross@pbs.org"
              />
              <Label>Password</Label>
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="* * * * *"
                type="password"
              />

              <FormBtn
                disabled={!(this.state.email && this.state.password)}
                onClick={this.handleFormSubmit}>
                Submit
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <p className="mx-auto"
          style= {{border: "none", color: "#495057", display: "inline-block", fontFamily: "'Patrick Hand', cursive", fontSize: "small", textAlign: "center"}}
          >
            Don't have an account? <a 
            style= {{color: "lightskyblue"}} href="/signup">Sign up</a></p>
        </Row>
      </Container>
    );
    else return <Redirect to="/" />;
  }
}

export default Login;
