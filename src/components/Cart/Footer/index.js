import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css';

const Footer = ({ total, isLoading, onSaveCart }) => (
  <div className="cart_footer">
    <Row>
      <Col md={4}>Сумма заказа</Col>
      { !isLoading && <Col md={{ span: 4, offset: 4 }}>{total} руб.</Col> }
    </Row>

    <Row>
      <Col md={{ span: 10, offset: 1 }}>
        <Button variant="primary" disabled={isLoading} block onClick={onSaveCart}>Сохранить</Button>
      </Col>
    </Row>
  </div>
);

export default React.memo(Footer);