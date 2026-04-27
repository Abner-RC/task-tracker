import { useState } from 'react';
import { useLogIn } from "../hooks/useLogIn";
import '../styles/pages.scss'

function LogIn() {
  const { logIn, error, isLoading } = useLogIn();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await logIn(email, password);
  }

  return (
    <main className='page page--log-in'>
      <form className="form container" onSubmit={handleSubmit} autoComplete='off'>
        <h1 className='page__title'>
          Log In |<span>Get access with your user credentials</span>
        </h1>
        <div className='form__inputs'>
          <div className='input-holder'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              spellCheck='false'
            />
          </div>
          <div className='input-holder'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              spellCheck='false'
            />
          </div>
        </div>
        {
          error &&
          <div className="error">{error}</div>
        }
        <button type="submit" disabled={isLoading}>
          Log In
          <svg xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="icon--sm">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
        </button>
      </form>
    </main>
  )
}

export default LogIn;