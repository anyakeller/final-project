import React, {Component, useState, useCallback} from 'react';
import ContactCard from '../../components/ContactCard';
import {List} from '../../components/List';
import {useTransition, animated} from 'react-spring';
import './style.css';

export default function AnimationDiv(props) {
  const [index, set] = useState(0);
  const onClick = useCallback(
    () => set(state => (state + 1) % props.contacts.length),
    []
  );
  const transitions = useTransition(props.contacts[index], item => item._id, {
    from: {opacity: 0, transform: 'translate3d(100%,0,0)'},
    enter: {opacity: 1, transform: 'translate3d(0%,0,0)'},
    leave: {opacity: 0, transform: 'translate3d(-50%,0,0)'}
  });


  return (
    <div className="simple-trans-main" onClick={onClick}>
      {transitions.map(({item, props, key}) => (
        <animated.div key={key} className="bg" style={{...props}}>
          <ContactCard key={item._id} contactData={item}></ContactCard>
        </animated.div>
      ))}
    </div>
  );
}
