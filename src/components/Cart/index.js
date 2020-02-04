import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import pathOr from 'ramda/es/pathOr';
import propOr from 'ramda/es/propOr';
import filter from 'ramda/es/filter';
import map from 'ramda/es/map';
import reduce from 'ramda/es/reduce';
import Spinner from 'react-bootstrap/Spinner';
import ProductList from './ProductList';
import Footer from './Footer';
import './style.css';

const Cart = () => {
  const [isLoading, toggleLoading] = useState(true);
  const [variables, setVariables] = useState({});
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const variable = `${process.env.REACT_APP_FORM_CONFIG_VARIABLE}`;
  const token = `${process.env.REACT_APP_BOT_KEY}`;
  const apiUrl = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_CHAT_UUID}`;

  useEffect(() => {
    axios({
      url: `${apiUrl}/variables/`,
      method: 'get',
      headers: {"bot-key" : token}
    })
      .then(response => {
        toggleLoading();
        const products = pathOr([], ['data', variable, 'products'], response);
        setVariables(propOr({}, 'data')(response));
        setProducts(products);
        setCartTotal(reduce((sum, product) => (
          sum + (propOr(0, 'quantity')(product) * propOr(0, 'price')(product))
        ), 0, products));
      });
  }, [variable, token, apiUrl]);

  const handleDeleteProduct = useCallback(
    productKey => {
      const newProducts = filter(product => propOr(null, 'key')(product) !== productKey, products);
      setProducts(newProducts);
      setVariables({ ...variables, [variable]: { products: newProducts } });
      setCartTotal(reduce((sum, product) => (
        sum + (propOr(0, 'quantity')(product) * propOr(0, 'price')(product))
      ), 0, newProducts));
    }, [products, variables, variable]
  );

  const handleChangeProductCount = useCallback(
    (productKey, count) => {
      const newProducts = map(product => (
        propOr(null, 'key')(product) === productKey ? { ...product, quantity: count } : product
      ), products);
      setProducts(newProducts);
      setVariables({ ...variables, [variable]: { products: newProducts } });
      setCartTotal(reduce((sum, product) => (
        sum + (propOr(0, 'quantity')(product) * propOr(0, 'price')(product))
      ), 0, newProducts));
    }, [products, variables, variable]
  );

  const handleSaveCart = useCallback(
    () => {
      toggleLoading(true);
      axios.post(`${apiUrl}/variables/`, variables, { headers: { "bot-key" : token } })
        .then(response => {
          propOr(false, 'status')(response) && toggleLoading();
          return axios.post(
            `${apiUrl}/push/`,
            { node: process.env.REACT_APP_ON_SUCCESS_NODE },
            { headers: { "bot-key" : token } }
          );
        })
        .then(response => (window.location = process.env.REACT_APP_ON_CLOSE_URL));
    }, [variables, apiUrl, token]
  );

  return (
    <div className="cart_wrapper">
      { isLoading && <div className="spinner_wrapper"><Spinner animation="border" variant="primary" /></div> }
      <ProductList
        isLoading={isLoading}
        products={products}
        onDeleteProduct={handleDeleteProduct}
        onChangeProductCount={handleChangeProductCount}
      />
      <Footer total={cartTotal} isLoading={isLoading} onSaveCart={handleSaveCart} />
    </div>
  );
};

export default React.memo(Cart);