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
          <h4
            style={{
              borderBottom: ".1rem solid pink",
              color: "navy",
              fontFamily: "Shadows Into Light Two, cursive",
              marginBottom: "1rem",
              marginTop: ".5rem",
              paddingLeft: ".5rem",
              width: "95%"
            }}>
            {this.props.contactData.name_first} {this.props.contactData.name_last}
          </h4>
          <span className="contact-label">PERSONAL DETAILS</span><p> {this.props.contactData.quickref}</p>
          <span className="contact-label">MEETING NOTES</span><p> {this.props.contactData.meeting_info}</p>
        </ListItem>
      </List>
    );
  }
}

export default ContactCard;
