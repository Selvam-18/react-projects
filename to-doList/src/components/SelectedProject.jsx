import Tasks from "./Tasks.jsx"

export default function SelectedProject ({project, onDelete, onAddTask, onDeleteTask, tasks}) {
    const formattedDate = new Date(project.dueDate).toLocaleDateString('en-US', {
        year: '2-digit',
        month: '2-digit',
        date: '2-digit'
    })
    return(
        <div className="w-[35rem] mt-16" > 
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-indigo-600 mb-2">{project.title}</h1>
                    <button className="text-white hover:text-stone-950" onClick={onDelete}>Delete</button>
                </div>
                <p className="mb-4 text-xl text-black">{formattedDate}</p>
                <p className="text-black text-xl whitespace-pre-wrap">{project.description}</p>
            </header>
            <Tasks onAddTask={onAddTask} onDeleteTask={onDeleteTask} tasks={tasks }/>
        </div>)
}