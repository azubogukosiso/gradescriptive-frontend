import { useEffect, createContext, useReducer } from 'react';

export const AuthnContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthnContextProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        user ? dispatch({ type: 'LOGIN', payload: user }) : null;
    }, [])

    return (
        <AuthnContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </AuthnContext.Provider>
    )
}
