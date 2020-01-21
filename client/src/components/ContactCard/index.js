import React, {Component} from 'react';
import DeleteBtn from '../../components/DeleteBtn';
import {ListItem, List} from '../List';
import {useTransition, animated} from 'react-spring';
import API from '../../utils/API';

class ContactCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name_first: this.props.contactData.name_first,
      name_last: this.props.contactData.name_last,
      quickref: this.props.contactData.quickref,
      meeting_info: this.props.contactData.meeting_info
    };
  }

  updateContact = (id, contactData) => {
    API.saveContact(id, contactData);
  };

  render() {
    return (
      <List>
        <ListItem id="contact-card">
          <DeleteBtn onClick={e => this.props.del(this.props._id)} />
          <form>
            <h4
              style={{
                borderBottom: '.1rem solid pink',
                color: 'navy',
                fontFamily: 'Shadows Into Light Two, cursive',
                marginBottom: '1rem',
                marginTop: '.5rem',
                paddingLeft: '.5rem',
                width: '95%'
              }}>
              <input
                style={{
                  border: 'none'
                }}
                type="text"
                name="asfd"
                value={this.state.name_first + ' ' + this.state.name_last}
                disabled
              />
            </h4>
            <span className="contact-label">PERSONAL DETAILS</span>
            <p>
              <input
                style={{
                  border: 'none',
                  borderBottom: '0.01rem solid lightskyblue'
                }}
                type="text"
                name="asfd"
                value={this.state.quickref}
                disabled
              />
            </p>
            <span className="contact-label">MEETING NOTES</span>
            <p>
              <input
                style={{
                  border: 'none',
                  borderBottom: '0.01rem solid lightskyblue'
                }}
                type="text"
                name="asfd"
                value={this.state.meeting_info}
                disabled
              />
            </p>
          </form>
        </ListItem>
      </List>
    );
  }
}

export default ContactCard;
