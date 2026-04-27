import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTaskContext } from '../hooks/useTaskContext';
import '../styles/components/CreateTaskForm.scss'

function CreateTaskForm({ task }) {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { tasks, dispatch } = useTaskContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [assignedDepartment, setAssignedDepartment] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [users, setUsers] = useState(null);
  const [departments, setDepartments] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${apiUrl}/user`);
      const json = await response.json();

      if (response.ok) {
        setUsers(json);
      }
    }
    const fetchDepartments = async () => {
      const response = await fetch(`${apiUrl}/departments`);
      const json = await response.json();

      if (response.ok) {
        setDepartments(json);
      }
    }
    fetchUsers();
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = { title, userId: assignedUser, departmentId: assignedDepartment };

    const response = await fetch(`${apiUrl}/tasks`, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setError(null);
      setEmptyFields([]);

      setTitle('');
      setAssignedUser('');
      setAssignedDepartment('');

      console.log('New task added', json);

      dispatch({
        type: "CREATE_TASK",
        payload: json
      });
    }
  }

  return (
    <form className="form form--create" onSubmit={handleSubmit}>
      <h1>Add a new Task</h1>
      <div className='form__inputs'>
        <div className='input-holder'>
          <label htmlFor='title'>Title</label>
          <input
            id='title'
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            spellCheck='false'
            className={`input ${emptyFields.includes('title') ? 'input--error' : ''}`}
          />
        </div>
        <div className='input-holder'>
          <label htmlFor='user'>User</label>
          <select
            id='user'
            onChange={(e) => setAssignedUser(e.target.value)}
            value={assignedUser}
            disabled={!users}
            className={`input ${emptyFields.includes('userId') ? 'input--error' : ''}`}
          >
            <option value='' disabled hidden>Select a User</option>
            {
              users &&
              users.map(u =>
                <option key={u._id} value={u._id}>{u.name}</option>
              )
            }
          </select>
        </div>
        <div className='input-holder'>
          <label htmlFor='department'>Department</label>
          <select
            id='department'
            onChange={(e) => setAssignedDepartment(e.target.value)}
            value={assignedDepartment}
            disabled={!departments}
            className={`input ${emptyFields.includes('departmentId') ? 'input--error' : ''}`}
          >
            <option value='' disabled hidden>Select a Department</option>
            {
              departments &&
              departments.map(dep =>
                <option key={dep._id} value={dep._id}>{dep.title}</option>
              )
            }
          </select>
        </div>
      </div>
      {
        error &&
        <div className="error">
          {error}
        </div>
      }
      <button type="submit">
        Add Task
        <svg xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="icon--sm">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
      </button>
    </form>
  );
}

export default CreateTaskForm;