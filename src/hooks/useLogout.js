import { useAuthnContext } from "./useAuthnContext";

export const useLogout = () => {
    const { dispatch } = useAuthnContext();

    const logout = async () => {
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
    }

    return { logout };
}
