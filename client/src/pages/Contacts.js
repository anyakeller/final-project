import React, {Component} from 'react';
import DeleteBtn from '../components/DeleteBtn';
import Jumbotron from '../components/Jumbotron';
import API from '../utils/API';
import {Link, Redirect} from 'react-router-dom';
import {Col, Row, Container} from '../components/Grid';
import {List, ListItem} from '../components/List';

class Contacts extends Component {
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
    this.props.authenticateApp();
  }
  componentDidMount() {
    //console.log('state of auth', this.props);
    this.loadContacts();
    console.log('state of auth', this.props);
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
              {this.state.contacts.length ? (
                <List>
                  {this.state.contacts.map(contact => (
                    <ListItem key={contact._id}>
                      <DeleteBtn
                        onClick={() => this.deleteContact(contact._id)}
                      />
                      <p>quickref: {contact.quickref}</p>
                      <p>First Name: {contact.name_first}</p>
                      <p>Last Name: {contact.name_last}</p>
                    </ListItem>
                  ))}
                </List>
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

export default Contacts;
