import { useState } from "react"

export default function NewTask({onAddTask}) {
    const [task, setTask] = useState("");
    function handleChange(event) {
        setTask(event.target.value);
    }
    function handleClick() {
        if(task.trim() === '') {
            return;
        }
        onAddTask(task)
        setTask('');
    }
    return(
    <div className="flex items-center gap-4">
        <input onChange={handleChange} type="text"value={task}  className="2-64 px-2py-1 rounded-sm bg-stone-200"/>
        <button onClick={handleClick} className="text-indigo-600  hover:text-black">+ Add Task</button>
    </div>
    )
    
}