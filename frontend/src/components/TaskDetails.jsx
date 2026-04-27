import '../styles/components/TaskDetails.scss'

function TaskDetails({ task }) {
  return (
    <div className="task-details">
      <h2>{task.title}</h2>
      <div className='task-details__assigned'>
        <p>User: <strong>-</strong></p>
        <p>Department: <strong>-</strong></p>
      </div>
      <p className='date'>-</p>
    </div>
  )
}

export default TaskDetails;