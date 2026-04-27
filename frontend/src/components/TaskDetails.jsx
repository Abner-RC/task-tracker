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
    </div>
  )
}

export default TaskDetails;