import React from 'react';
import Image from 'react-bootstrap/Image';
import HorizontalLine from '../HorizontalLine';
import './style.css';

const Header = ({ logo, title }) => (
  <div className="header__wrapper">
    <div className="header">
      <div className="header__logo">
        <Image src={logo} roundedCircle/>
      </div>
      <div className="header__title">
        {title}
      </div>
    </div>
    <HorizontalLine />
  </div>
);

export default React.memo(Header);