import React, { Component } from 'react';
import DeleteBtn from '../components/DeleteBtn';
import Jumbotron from '../components/Jumbotron';
import API from '../utils/API';
import { Link, Redirect } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { List, ListItem } from '../components/List';
import { Input, FormBtn, Label } from '../components/Form';

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authenticated: false,
      contacts: [],
      allContacts: [],
      query: ''
    };
  }

  componentWillMount() {
    this.props.authenticate(this);
    // this.searchContacts("z");
  }
  componentDidMount() {
    //console.log('state of auth', this.props);
    this.loadContacts();
    console.log('state of auth', this.props);
  }

  loadContacts = () => {
    API.getContacts()
      .then(res => {
        this.setState({ contacts: res.data, allContacts: res.data });
        // console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  handleSearch = event => {
    event.preventDefault();
    if (this.state.query !== '') {
      API.searchContacts(this.state.query)
        .then(res => {
          this.setState({ contacts: res.data });
          console.log(res.data);
        })
        .catch(err => console.log(err));
    }
  };

  clearSearch = event => {
    event.preventDefault();
    this.setState({ contacts: this.state.allContacts, query: "" });
  }

  handleQueryChange = event => {
    this.setState({ query: event.target.value });
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
            <Col size="12">
              <Jumbotron>
                <h1
                  style={{
                    marginBottom: "10px"
                  }}
                >Contacts</h1>
                <a
                  className="mx-auto"
                  id="toggle"
                  style={{
                    color: 'lightskyblue',
                    display: 'inline-block',
                    fontFamily: "'Patrick Hand', cursive",
                    fontSize: 'small',
                    marginBottom: '20px',
                    textAlign: 'center'
                  }}
                  href="/AnimationView">
                  switch to sliding view
                </a>

                <form>

                  <Row>
                    <Input
                      style={{width: "80vw"}}
                      value={this.state.query}
                      onChange={this.handleQueryChange}
                      name="search"
                      placeholder="search"
                      type="text"
                    />
                  </Row>
                  <Row className="mx-auto" style={{ display: "flex", justifyContent: "center" }}>
                    <Col size="12">
                      <FormBtn style={{ justifyContent: "center",  display: "inline-block", float: "none"}} onClick={this.handleSearch}>Search</FormBtn>
                      <FormBtn style={{ justifyContent: "center",  display: "inline-block", float: "none"}} onClick={this.clearSearch}>Clear</FormBtn>
                    </Col>
                  </Row>
                </form>

              </Jumbotron>
              {this.state.contacts.length ? (
                <List>
                  {this.state.contacts.map(contact => (
                    <ListItem key={contact._id}>
                      <DeleteBtn
                        onClick={() => this.deleteContact(contact._id)}
                      />
                      <h4
                        style={{
                          borderBottom: ".1rem solid pink",
                          color: "navy",
                          fontFamily: "Shadows Into Light Two, cursive",
                          marginBottom: "1rem",
                          marginTop: ".5rem",
                          paddingLeft: ".5rem",
                          width: "95%"
                        }}
                      >{contact.name_first} {contact.name_last}
                      </h4>
                      <span className="contact-label">PERSONAL DETAILS</span>
                      <p>{contact.quickref}</p>
                      <span className="contact-label">MEETING NOTES</span>
                      <p>{contact.meeting_info}</p>
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
