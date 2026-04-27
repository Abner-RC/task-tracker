import { useState } from "react"
import { useAuthContext } from "./useAuthContext";

export const useLogIn = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const logIn = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${apiUrl}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      // Save the user to local storage.
      localStorage.setItem('user', JSON.stringify(json));

      // Update the authentication context.
      dispatch({
        type: 'LOGIN',
        payload: json,
      });

      setIsLoading(false);
    }
  }

  return { logIn, isLoading, error };
}