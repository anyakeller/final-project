import React, {Component} from 'react';
import DeleteBtn from '../../components/DeleteBtn';
import {ListItem, List} from '../List';
import {useTransition, animated} from 'react-spring';
import API from '../../utils/API';

class ContactCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactData: {
        name_first: this.props.contactData.name_first,
        name_last: this.props.contactData.name_last,
        quickref: this.props.contactData.quickref,
        meeting_info: this.props.contactData.meeting_info
      }
    };
  }

  updateContact = () => {
    console.log('updateContact clicked');
    // API.updateContact(this.props.key,this.state.contactData);
  };

  handleDataChange = event => {
    const {name, value} = event.target;
    let currentContactData = this.state.contactData;
    currentContactData[name] = value;
    this.setState({
      contactData: currentContactData
    });
  };

  render() {
    return (
      <List>
        <ListItem id="contact-card">
          <form>
            <fieldset disabled={this.props.isEditMode ? '' : 'disabled'}>
              <span className="contact-label">First</span>
              <h4
                style={{
                  borderBottom: '.1rem solid pink',
                  color: 'navy',
                  fontFamily: 'Shadows Into Light Two, cursive',
                  marginBottom: '1rem',
                  marginTop: '.5rem',
                  paddingLeft: '.5rem',
                  display: 'inline-block',
                  marginRight: '1rem'
                }}>
                <input
                  onChange={this.handleDataChange}
                  style={{
                    border: 'none'
                  }}
                  type="text"
                  name="name_first"
                  value={this.state.contactData.name_first}
                />
              </h4>
              <span className="contact-label">Last</span>
              <h4
                style={{
                  borderBottom: '.1rem solid pink',
                  color: 'navy',
                  fontFamily: 'Shadows Into Light Two, cursive',
                  marginBottom: '1rem',
                  marginTop: '.5rem',
                  paddingLeft: '.5rem',
                  display: 'inline-block'
                }}>
                <input
                  onChange={this.handleDataChange}
                  style={{
                    border: 'none'
                  }}
                  type="text"
                  name="name_last"
                  value={this.state.contactData.name_last}
                />
              </h4>
              {this.props.isEditMode ? (
                <i
                  onClick={this.props.editModeOff}
                  className="far fa-save fa-3x"
                  style={{
										float:"right",
                    color: 'lightskyblue',
                    cursor: 'pointer',
                    display: 'inline'
                  }}></i>
              ) : (
                ''
              )}
              <br />
              <span className="contact-label">PERSONAL DETAILS</span>
              <p>
                <input
                  onChange={this.handleDataChange}
                  style={{
                    border: 'none',
                    borderBottom: '0.01rem solid lightskyblue',
                    width: '100%'
                  }}
                  type="text"
                  name="quickref"
                  value={this.state.contactData.quickref}
                />
              </p>
              <span className="contact-label">MEETING NOTES</span>
              <p>
                <input
                  onChange={this.handleDataChange}
                  style={{
                    border: 'none',
                    borderBottom: '0.01rem solid lightskyblue',
                    width: '100%'
                  }}
                  type="text"
                  name="meeting_info"
                  value={this.state.contactData.meeting_info}
                />
              </p>
            </fieldset>
          <DeleteBtn onClick={e => this.props.del(this.props._id)} />
          </form>
        </ListItem>
      </List>
    );
  }
}

export default ContactCard;
