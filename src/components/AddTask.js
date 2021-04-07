import { useState } from 'react'

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!text) {
            alert('Please add a task')
            return
        }

        onAdd({text, day, reminder})

        setText('')
        setReminder(false)
        setDay('')
    }

    return (
        <form className='add-form container' onSubmit={onSubmit}>
            <div className='form-control'>
                <label htmlFor="">Task</label>
                <input type="text" placeholder='Add task' value={text} onChange={(e => setText(e.target.value))} />
            </div>
            <div className='form-control'>
                <label htmlFor="">Day & Time</label>
                <input type="text" placeholder='Add day and time' value={day} onChange={(e => setDay(e.target.value))} />
            </div>
            <div className='form-control form-control-check'>
                <label htmlFor="">Set Reminder</label>
                <input type="checkbox" checked={reminder} value={reminder} onChange={(e => setReminder(e.currentTarget.checked))} />
            </div>

            <input type="submit" value="Save Task" className='btn btn-block'/>
        </form>
    )
}

export default AddTask
