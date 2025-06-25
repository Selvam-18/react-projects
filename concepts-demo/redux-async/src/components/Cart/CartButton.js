import classes from './CartButton.module.css';
import {  useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {
  // const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const cartCount = useSelector(state => state.cart.totalQuantity)

  function handleCart() {
    dispatch(uiActions.toggle())
  }

  return (
    <button className={classes.button} onClick={handleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartCount}</span>
    </button>
  );
};

export default CartButton;
