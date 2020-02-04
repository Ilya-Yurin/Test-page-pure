import React from 'react';
import mapObjIndexed from 'ramda/es/mapObjIndexed';
import values from 'ramda/es/values';
import isEmpty from 'ramda/es/isEmpty';
import Product from './Product';
import './style.css';

const CartList = ({ products, isLoading, onDeleteProduct, onChangeProductCount }) => (
  <div className="cart_products">
    {
      (!isEmpty(products) && !isLoading) &&
      values(mapObjIndexed((product, key) => (
        <Product
          key={`key_${++key}`}
          product={product}
          onDelete={onDeleteProduct}
          onChangeCount={onChangeProductCount}
        />
      ), products))
    }
    {
      (isEmpty(products) && !isLoading) && 'Корзина пуста'
    }
  </div>
);

export default React.memo(CartList);