import { useState } from "react"
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signUp = async (email, name, departmentId, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${apiUrl}/user/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, departmentId, password })
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      localStorage.setItem('user', JSON.stringify(json));

      // Update the authentication context.
      dispatch({
        type: 'LOGIN',
        payload: json,
      });

      setIsLoading(false);
    }
  }

  return { signUp, isLoading, error };
}