import { useState } from "react"
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // Remove user from storage.
    localStorage.removeItem('user');

    // Dispatch log-out action.
    dispatch({ type: 'LOGOUT' });
  }

  return { logout };
}