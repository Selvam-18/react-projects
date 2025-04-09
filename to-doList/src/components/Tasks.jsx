import NewTask from "./NewTask.jsx";

export default function Tasks({tasks, onAddTask, onDeleteTask}) {
    return<section>
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Tasks</h2>
        <NewTask onAddTask={onAddTask} onDeleteTask={onDeleteTask}/>
        {tasks.length === 0 && (<p className="text-black my-4">This project does not have any tasks yet.</p>)}
        
        {tasks.length > 0 && (
            <ul className="p-4 mt-8 rounded-md bg-stone-100">
                {tasks.map((tasks) => (
                    <li key={tasks.id} className="flex justify-between my-4">
                        <span>{tasks.text}</span>
                        <button onClick={() => onDeleteTask(tasks.id)} className="text-stone-700 hover:text-indigo-500 ">Clear</button>
                    </li>
                ))}
            </ul>
        )}
    </section>
}