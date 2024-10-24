import { AuthnContext } from "../contexts/AuthnContext";
import { useContext } from "react";

export const useAuthnContext = () => {
    const context = useContext(AuthnContext)

    if (!context) {
        throw Error('useAuthnContext must be used inside a AuthnContextProvider');
    } else {
        console.log(context);
    }

    return context
}