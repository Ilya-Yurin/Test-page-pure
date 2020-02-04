import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './components/common/Header';
import Cart from './components/Cart';
import './App.css';

const AppEntry = React.memo(() => (
  <div className="app">
    <Container>
      <Row>
        <Col md={{span: 6, offset: 3}}>
          <Header logo="./logo192.png" title="Корзина"/>
          <Cart />
        </Col>
      </Row>
    </Container>
  </div>
));

export default AppEntry;
