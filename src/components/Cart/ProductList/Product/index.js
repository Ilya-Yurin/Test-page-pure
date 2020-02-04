import React, { useCallback } from 'react';
import propOr from 'ramda/es/propOr';
import mapObjIndexed from 'ramda/es/mapObjIndexed';
import values from 'ramda/es/values';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CountButton from '../../../common/CountButton';
import HorizontalLine from '../../../common/HorizontalLine';
import './style.css';

const Product = ({ product, onDelete, onChangeCount }) => {
  const onClick = useCallback(
    () => onDelete(product['key']), [product, onDelete]
  );

  const handleChangeCount = useCallback(count => onChangeCount(product['key'], count), [product, onChangeCount]);

  const renderProductDetail = detail => (
    values(mapObjIndexed((num, key) => <div key={`key_${key}`}>{`${key}: ${num}`}</div>, detail))
  );

  return (
    <div className="product_item">
      <Row>
        <Col className="product-item--name" md={6}>
          <div>{ propOr(0, 'key')(product) }</div>
         { renderProductDetail(propOr({}, 'detail')(product)) }
        </Col>
        <Col md={{ span: 4, offset: 2 }}>
          { propOr(0, 'price')(product) } руб.
        </Col>
      </Row>

      <Row>
        <Col md={{ span: 4, offset: 1 }}>
          <CountButton count={propOr(0, 'quantity')(product)} onChangeCount={handleChangeCount} />
        </Col>
        <Col md={{ span: 4, offset: 1 }}>
          <Button variant="success" onClick={onClick}>Удалить</Button>
        </Col>
      </Row>

      <HorizontalLine />
    </div>
  );
};

export default React.memo(Product);