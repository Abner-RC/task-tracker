import { useEffect, useState } from 'react';
import { useTaskContext } from '../hooks/useTaskContext'
import { useAuthContext } from '../hooks/useAuthContext';
import '../styles/pages.scss'
import TaskDetails from '../components/TaskDetails';
import CreateTaskForm from '../components/CreateTaskForm';
import UserDetails from '../components/UserDetails';

function Home() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { tasks, dispatch } = useTaskContext();
  const { user } = useAuthContext();

  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${apiUrl}/user`);
      const json = await response.json();

      if (response.ok) {
        setUsers(json);
      }
    }
    const fetchTasks = async () => {
      const response = await fetch(`${apiUrl}/tasks`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({
          type: 'SET_TASKS',
          payload: json
        });
      }
    }
    fetchUsers();

    if (user) {
      fetchTasks();
    }
  }, [dispatch, user]);

  return (
    <main className='page page--home'>
      <section className='page--home__section page--home__section--content'>
        <section className='container-holder'>
          <h2>Active Tasks</h2>
          <div className='container container--tasks visible'>
            {
              tasks &&
              tasks.map(task =>
                <TaskDetails key={task._id} task={task} />
              )
            }
          </div>
        </section>
        <section className='container-holder'>
          <h2>Users Created</h2>
          <div className='container container--users visible'>
            {
              users &&
              users.map(user =>
                <UserDetails key={user._id} userData={user} />
              )
            }
          </div>
        </section>
      </section>
      <section className='page--home__section page--home__section--form'>
        <section className='container-holder'>
          <h2>Create a task</h2>
          <div className='container'>
            <CreateTaskForm />
          </div>
        </section>
      </section>
    </main>
  )
}

export default Home;