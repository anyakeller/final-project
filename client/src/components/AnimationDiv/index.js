import React, {Component, useState, useCallback} from 'react';
import ContactCard from '../../components/ContactCard';
import {List} from '../../components/List';
import {useTransition, animated} from 'react-spring';
import './style.css';

export default function AnimationDiv(props) {
  const [direction, setDirection] = useState(1); //1 or -1
  const [index, set] = useState(0);
  const onClickRight = () => {
    setDirection(1);
    return set(state => (state + 1) % props.contacts.length);
  };
  const onClickLeft = () => {
    setDirection(-1);
    set(state => {
      if (state === 0) return props.contacts.length - 1;
      else return (state - 1) % props.contacts.length;
    });
  };
  const transitions = useTransition(props.contacts[index], item => item._id, {
    from: {opacity: 0, transform: `translate3d(${100 * direction}%,0,0)`},
    enter: {opacity: 1, transform: 'translate3d(0%,0,0)'},
    leave: {opacity: 0, transform: `translate3d(${-50 * direction}%,0,0)`}
  });

  return (
    <div>
      <button onClick={onClickLeft}>Left</button>
      <div className="simple-trans-main">
        {transitions.map(({item, props, key}) => (
          <animated.div key={key} className="bg" style={{...props}}>
            <ContactCard key={item._id} contactData={item}></ContactCard>
          </animated.div>
        ))}
      </div>
      <button onClick={onClickRight}>Right</button>
    </div>
  );
}
