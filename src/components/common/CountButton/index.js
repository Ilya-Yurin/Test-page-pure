import React, { useCallback } from 'react';
import './style.css';

const CountButton = ({ count, onChangeCount }) => {
  const onChange = useCallback(({ target }) => onChangeCount(target.value), [onChangeCount]);
  const onIncrease = useCallback(() => onChangeCount(++count), [count, onChangeCount]);
  const onDecrease = useCallback(() => (
    count > 0 && onChangeCount(--count)
  ), [count, onChangeCount]);

  return (
    <div className="count_buttons">
      <button className="count_buttons__button count_buttons__button__minus" onClick={onDecrease}>-</button>
      <input className="count_buttons_button__input" value={count} onChange={onChange} />
      <button className="count_buttons__button count_buttons__button__plus" onClick={onIncrease}>+</button>
    </div>
  );
};

export default React.memo(CountButton);