import React, {Component} from 'react';
import DeleteBtn from '../components/DeleteBtn';
import Jumbotron from '../components/Jumbotron';
import API from '../utils/API';
import {Link, Redirect} from 'react-router-dom';
import {Col, Row, Container} from '../components/Grid';
import {List, ListItem} from '../components/List';
import {Input, FormBtn, Label} from '../components/Form';

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
        this.setState({contacts: res.data, allContacts: res.data});
        // console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  handleSearch = event => {
    event.preventDefault();
    if (this.state.query !== '') {
      API.searchContacts(this.state.query)
        .then(res => {
          this.setState({contacts: res.data});
          console.log(res.data);
        })
        .catch(err => console.log(err));
    }
  };

	clearSearch = event =>{
    event.preventDefault();
		this.setState({contacts: this.state.allContacts,query:""});
	}

  handleQueryChange = event => {
    this.setState({query: event.target.value});
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
                <a
                  className="mx-auto"
                  style={{
                    color: 'lightskyblue',
                    display: 'inline-block',
                    fontFamily: "'Patrick Hand', cursive",
                    fontSize: 'small',
                    textAlign: 'center'
                  }}
                  href="/AnimationView">
                  switch to sliding view
                </a>
                <form>
                  <FormBtn onClick={this.handleSearch}>Search</FormBtn>
                  <Label>Search</Label>
                  <Input
                    value={this.state.query}
                    onChange={this.handleQueryChange}
                    name="search"
                    placeholder="frank"
                    type="text"
                  />
                  <FormBtn onClick={this.clearSearch}>Clear Search</FormBtn>
                </form>
              </Jumbotron>
              {this.state.contacts.length ? (
                <List>
                  {this.state.contacts.map(contact => (
                    <ListItem key={contact._id}>
                      <DeleteBtn
                        onClick={() => this.deleteContact(contact._id)}
                      />
                      <span className="contact-label">QUICK REFERENCE</span>
                      <p> {contact.quickref}</p>
                      <span className="contact-label">FIRST NAME</span>
                      <p> {contact.name_first}</p>
                      <span className="contact-label">LAST NAME</span>
                      <p> {contact.name_last}</p>
                      <span className="contact-label">MEETING NOTES</span>
                      <p> {contact.meeting_info}</p>
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
