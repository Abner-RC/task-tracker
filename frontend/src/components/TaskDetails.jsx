import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTaskContext } from '../hooks/useTaskContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import '../styles/components/TaskDetails.scss'

function TaskDetails({ task }) {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { tasks, dispatch } = useTaskContext();
  const { user } = useAuthContext();

  const [assignedUser, setAssignedUser] = useState('');
  const [assignedDepartment, setAssignedDepartment] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${apiUrl}/user/${task.userId}`);
      const json = await response.json();

      if (response.ok) {
        setAssignedUser(json);
      }
    }
    const fetchDepartment = async () => {
      const response = await fetch(`${apiUrl}/departments/${task.departmentId}`);
      const json = await response.json();

      if (response.ok) {
        setAssignedDepartment(json);
      }
    }
    fetchUser();
    fetchDepartment();
  }, []);

  const handleDelete = async () => {
    if (!user) return;

    const response = await fetch(`${apiUrl}/tasks/${task._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: 'DELETE_TASK',
        payload: json,
      });
    }
  }

  return (
    <div className="task-details">
      <h2>{task.title}</h2>
      <div className='task-details__assigned'>
        <p>User: <strong>{assignedUser.name}</strong></p>
        <p>Department: <strong>{assignedDepartment.title}</strong></p>
      </div>
      <p className='date'>
        {formatDistanceToNow(
          new Date(task.createdAt),
          { addSuffix: true }
        )}
      </p>
      <button type='button' onClick={handleDelete} className='task-details__delete-button'>
        <svg xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className='task-details__delete-button__icon'>
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </button>
    </div>
  )
}

export default TaskDetails;