import { redirect } from "react-router-dom";

export function getTokenDuration() {
    const storeExpirationTime = localStorage.getItem('expiration')
    const expirationTime = new Date(storeExpirationTime)
    console.log("The expiration time: ", expirationTime.getTime())
    const currentTime = new Date()
    console.log("The current time: ", currentTime.getTime())
    const duration = expirationTime.getTime() - currentTime.getTime()
    
    return duration
}

export function getAuthToken() {
    const token = localStorage.getItem('token')

    if(!token){
        return null
    }

    const duration = getTokenDuration()


    if(duration < 0) {
        return "EXPIRED"
    }

    return token;
}

export function tokenLoader() {
    return getAuthToken()
}

export function checkAuthLoader() {
    const token = getAuthToken();

    if(!token) {
        return redirect('/auth')
    }
    
    return null;
}