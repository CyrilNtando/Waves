import React from 'react';
import { Link } from 'react-router-dom';
const Button = props => {
  const buttons = () => {
    let template = '';

    switch (props.type) {
      case 'default':
        template = (
          <Link to={props.LinkTo} className='link_default' {...props.addStyles}>
            {props.title}
          </Link>
        );
        break;
      default:
        template = '';
    }
    return template;
  };
  return <div className='my_link'>{buttons()}</div>;
};

export default Button;
