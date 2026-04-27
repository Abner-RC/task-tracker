import { useState } from 'react';
import '../styles/pages.scss'

function SignUp() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, name, department, password);
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
              onChange={(e) => setDepartment(e.target.value)}
              value={department}
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
        <button type="submit">Sign Up</button>
      </form>
    </main>
  )
}

export default SignUp;