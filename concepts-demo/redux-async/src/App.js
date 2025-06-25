import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';


import { sendData, fetchCartData } from './store/cart-actions';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { cartActions } from './store/cart-slice';

let firstRender = true;

function App() {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.ui.cartIsVisible)
  const cartDetails = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification)


  useEffect(()=>{
    dispatch(fetchCartData());
  }, [dispatch])


  useEffect(() => {

    if(firstRender) {
      firstRender = false;
      return;
    }

    if(cartDetails.changed){
      dispatch(sendData(cartDetails))
    }

  }, [cartDetails, dispatch])


  return (
    <>
    {notification && <Notification 
        status={notification.status} 
        title={notification.title} 
        message={notification.message} 
      />}
    <Layout>
      {cart && <Cart />}
      <Products />
    </Layout>
    </>
  );
}

export default App;
