import React, {Component} from 'react';
import Jumbotron from '../components/Jumbotron';
import AnimationDiv from '../components/AnimationDiv';
import {Col, Row, Container} from '../components/Grid';
import API from '../utils/API';
import {Link, Redirect} from 'react-router-dom';

class AnimationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authenticated: false,
      contacts: []
    };
  }

  componentWillMount() {
    this.props.authenticate(this);
  }
  componentDidMount() {
    this.loadContacts();
  }

  loadContacts = () => {
    API.getContacts()
      .then(res => {
        this.setState({contacts: res.data});
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  deleteContact = id => {
    API.deleteContact(id)
      .then(res => this.loadContacts())
      .catch(err => console.log(err));
  };

  render() {
    if (this.state.loading) return <div></div>;
    else if (this.state.authenticated)
      return (
        <Container fluid>
          <Row>
            <Col size="md-12 sm-12">
              <Jumbotron>
                <h1>Contacts</h1>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col size="md-12 sm-12">
              {this.state.contacts.length ? (
                <AnimationDiv
                  contacts={this.state.contacts}
                  del={this.deleteContact}
                />
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Col>
          </Row>
        </Container>
      );
    else return <Redirect to="/login" />;
  }
}

export default AnimationView;
