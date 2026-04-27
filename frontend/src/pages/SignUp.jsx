import { useEffect, useState } from 'react';
import '../styles/pages.scss'
import { useSignUp } from '../hooks/useSignUp';

function SignUp() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { signUp, error, isLoading } = useSignUp();

  const [departments, setDepartments] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await fetch(`${apiUrl}/departments`);
      const json = await response.json();

      if (response.ok) {
        setDepartments(json);
      }
    }
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signUp(email, name, departmentId, password);
  }

  return (
    <main className='page page--sign-up'>
      <form className="form container" onSubmit={handleSubmit} autoComplete='off'>
        <h1 className='page__title'>
          Sign Up |<span>Create a new Task Tracker user</span>
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
            <label htmlFor='name'>Name</label>
            <input
              id='name'
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              spellCheck='false'
            />
          </div>
          <div className='input-holder'>
            <label htmlFor='department'>Department</label>
            <select
              id='department'
              type="text"
              onChange={(e) => setDepartmentId(e.target.value)}
              value={departmentId}
              spellCheck='false'
              disabled={!departments}
            >
              <option value='' disabled hidden>Select a department</option>
              {
                departments &&
                departments.map(dep =>
                  <option key={dep._id} value={dep._id}>{dep.title}</option>
                )
              }
            </select>
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
          Sign Up
          <svg xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="icon--sm">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
        </button>
      </form>
    </main>
  )
}

export default SignUp;