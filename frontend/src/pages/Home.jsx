import { useEffect, useState } from 'react';
import '../styles/pages.scss'
import TaskDetails from '../components/TaskDetails';

function Home() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`${apiUrl}/tasks`);
      const json = await response.json();

      if (response.ok) {
        setTasks(json);
      }
    }
    fetchTasks();
  }, []);

  return (
    <main className='page page--home'>
      <section className='page--home__section page--home__section--content'>
        <section className='container-holder'>
          <h2>Active Tasks</h2>
          <div className='container visible'>
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
          <div className='container'>
            -
          </div>
        </section>
      </section>
      <section className='page--home__section page--home__section--form'>
        <section className='container-holder'>
          <h2>Create a task</h2>
          <div className='container'>
            -
          </div>
        </section>
      </section>
    </main>
  )
}

export default Home;