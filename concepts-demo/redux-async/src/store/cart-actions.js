import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export function sendData(cartDetails) {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
              status: 'sending',
              title: 'Sending!!',
              message: 'Sending data'
            }))

        async function sendRequest() {
            const response = await fetch('https://redux-firebase-8498a-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json', {
            method: 'PUT',
            body: JSON.stringify({items: cartDetails.items, totalQuantity: cartDetails.totalQuantity})
            })
          
            if (!response.ok) {
                throw new Error('Error')
            }
        }
        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!!',
                message: 'Data sent successfully!'
            }))   
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!!',
                message: 'Failed to send data'
            }))
        }
    }
}

export function fetchCartData() {
    return async (dispatch) => {
        async function fetchData() {
            const response = await fetch('https://redux-firebase-8498a-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json')
    
            if(!response.ok) {
                throw new Error("Failed to fetch data")
            }
    
            const resData = await response.json()
            
            return resData;
        }

        try {
            const cartData = await fetchData()

            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!!',
                message: 'Failed to fetch data'
            }))
        }
    }
}