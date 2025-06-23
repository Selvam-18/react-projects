import logoIMg from "../assets/logo.jpg"
import Button from "../UI/Button"
import { useContext } from "react"
import CartContext from "../store/CartContext.jsx"
import UserProgressContext  from "../store/UserProgressContext.jsx"

export default function Header() {

    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)


    const cartItems = cartCtx.items.reduce((noOfItems, item) => {
        return noOfItems + item.quantity
    }, 0)

    function handleShowCart() {
        userProgressCtx.showCart()
    }
    return(
        <header id="main-header">
            <div id="title">
                <img src={logoIMg} alt="logo"/>
                <h1>FoodCart</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({cartItems})</Button>
            </nav>
        </header>
    )
}