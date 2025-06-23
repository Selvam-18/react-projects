import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (item) => {},
    clearCart: () => {}
});


// Reducer function
function cartReducer(state, action) {
    if(action.type === 'ADD_ITEM') {
        // console.log("Inside reduce function")
        // console.log("state value",state.items)
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        )
        // console.log("Existing index", existingCartItemIndex)


        const updatedItems = [...state.items]
        // console.log("After spreading",updatedItems)

        if(existingCartItemIndex > -1) {

            const existingItem = state.items[existingCartItemIndex]

            const updatingItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            // console.log(updatedItems)
            // console.log("Item updated")

            updatedItems[existingCartItemIndex] = updatingItem
        } else {
            updatedItems.push({...action.item, quantity: 1})
            // console.log(updatedItems)
            // console.log("Item updated")
        }

        return {...state, items: updatedItems}
    }
    if(action.type === 'REMOVE_ITEM'){
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        )

        const existingCartItem = state.items[existingCartItemIndex]
        const updatedItems = [...state.items]

        if(existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1)
        } else {
            const updatedItem = {...existingCartItem, quantity: existingCartItem.quantity - 1}
            updatedItems[existingCartItemIndex] = updatedItem 
        }

        return {...state, items: updatedItems}
    }

    if(action.type === 'CLEAR_CART') {
        return {...state, items: []}
    }
    return state
}

export function CartContextProvider({ children }) {
    const [ cart, dispatchCartAction] = useReducer(cartReducer, {items: []})
    function addItem(item) {
        dispatchCartAction({type: 'ADD_ITEM', item: item})
        console.log("Dispatch called")
    }

    function removeItem(id) {
        dispatchCartAction({type: 'REMOVE_ITEM', id: id })
    }

    function clearCart() {
        dispatchCartAction({type: 'CLEAR_CART'})
    }
    const cartContext = {
        items: cart.items,
        addItem: addItem,
        removeItem: removeItem,
        clearCart: clearCart
    }

    console.log(cartContext)

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;