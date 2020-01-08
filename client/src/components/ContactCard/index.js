import React, {Component} from 'react';
import DeleteBtn from '../../components/DeleteBtn';
import {ListItem, List} from '../List';
import {useTransition, animated} from 'react-spring';

class ContactCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
			<List>
			<ListItem>
        <DeleteBtn onClick={e => this.props.del(this.props._id)} />
        <p>quickref: {this.props.contactData.quickref}</p>
        <p>First Name: {this.props.contactData.name_first}</p>
        <p>Last Name: {this.props.contactData.name_last}</p>
			</ListItem>
			</List>
    );
  }
}

export default ContactCard;
