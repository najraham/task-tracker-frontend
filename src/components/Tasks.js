import Task from './Task'

const Tasks = ({ tasks, onDelete,onToggle }) => {
    
    return (
        <>
            {tasks.map((task) => (<Task onDelete={onDelete} onToggle={onToggle} key={task._id} task={task} />))}
        </>
    )
}

export default Tasks
