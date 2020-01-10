import React, { Component } from 'react';
import DeleteBtn from '../../components/DeleteBtn';
import { ListItem, List } from '../List';
import { useTransition, animated } from 'react-spring';

class ContactCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List>
        <ListItem id="contact-card">
          <DeleteBtn onClick={e => this.props.del(this.props._id)} />
          <span className="contact-label">QUICK REFERENCE</span><p> {this.props.contactData.quickref}</p>
          <span className="contact-label">FIRST NAME</span><p> {this.props.contactData.name_first}</p>
          <span className="contact-label">LAST NAME</span><p> {this.props.contactData.name_last}</p>
          <span className="contact-label">MEETING NOTES</span><p> {this.props.contactData.meeting_info}</p>
        </ListItem>
      </List>
    );
  }
}

export default ContactCard;
