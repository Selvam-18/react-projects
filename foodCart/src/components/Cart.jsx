import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";
import Modal from "../UI/Modal.jsx";
import Button from "../UI/Button.jsx";
import CartItem from "./CartItem.jsx";
import { currencyFormatter } from "../util/currencyFormat.js";
import  UserProgressContext  from "../store/UserProgressContext.jsx";

export default function Cart() {
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)
    const totalPrice = cartCtx.items.reduce((totalAmount, item) => totalAmount + item.quantity * item.price, 0) 

    function handleCloseCart() {
        userProgressCtx.hideCart()
    }

    function handleGoToCheckout() {
        userProgressCtx.showCheckout()
    }
    return (
        <Modal 
            className="cart"
            open={userProgressCtx.progress === 'cart'} 
            onClose={userProgressCtx.progress === 'cart' ? handleCloseCart: null}
            >
            <h1>Cart Details</h1>
            <ul>
                {cartCtx.items.map((item) =>
                    <CartItem 
                        key={item.id} 
                        name={item.name} 
                        quantity={item.quantity} 
                        price={item.price} 
                        onIncrement={() => cartCtx.addItem(item)}
                        onDecrement={()=> cartCtx.removeItem(item.id)}
                    />
                )}
            </ul>
            <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}> Cancel </Button>
                {cartCtx.items.length > 0 && <Button onClick={handleGoToCheckout}>Checkout Cart</Button>}
            </p>
        </Modal>
    )
}