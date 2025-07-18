import { useContext } from "react";
import Modal from "../UI/Modal.jsx";
import Input from "../UI/Input.jsx";
import { currencyFormatter } from "../util/currencyFormat.js";
import CartContext from "../store/CartContext.jsx";
import Button from "../UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";


const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function CheckoutCart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );

  const totalPrice = cartCtx.items.reduce(
    (totalAmount, item) => totalAmount + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleClearCart() {
    userProgressCtx.hideCheckout()
    cartCtx.clearCart()
    clearData()
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    // console.log(customerData);

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );

    // fetch("http://localhost:3000/orders", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     order: {
    //       items: cartCtx.items,
    //       customer: customerData,
    //     },
    //   }),
    // });
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if(isSending) {
    actions = <span>Placing Order</span>
  }

  if(data && !error) {
    return <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClearCart}>
        <h2>Success!</h2>
        <p>Order Placed Successfully.</p>
        <p>Food will be delivered soon.</p>
        <p className="modal-actions" >
            <Button onClick={handleClearCart}>OK</Button>    
        </p>
    </Modal>
  }
  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Price:{currencyFormatter.format(totalPrice)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to place order" error={error} />}

        <p className="modal-actions"> {actions} </p>
      </form>
    </Modal>
  );
}
