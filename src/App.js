import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState(
    [
    ]
  )

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/api/tasks')
    const data = await res.json()

    return data
  }

  // add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/api/addTask',
    {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/deleteTask/${id}`, 
    {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task._id !== id))
  }

  // Toggle reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task._id ===id ? {...task, reminder:!task.reminder} : task))
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length>0 ? <Tasks onDelete={deleteTask} onToggle={toggleReminder} tasks={tasks} /> : 'No tasks to show'}
    </div>
  );
}

export default App;
