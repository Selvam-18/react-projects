import Button from "./Button.jsx";


export default function SideBar({onStartNewProject, projects, onSelectProject, selectedProjectId}) {
    return(
        <aside className="w-1/3 px-8 py-16 bg-indigo-600 text-white md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-white ">Your projects</h2>
            <div>   
                <Button onClick= {onStartNewProject} >+ Add Project</Button>
            </div>
            <ul className="mt-8"> 
                {projects.map((project) => {
                    let cssClasses = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-white hover:bg-indigo-800 ";
                    if(project.id === selectedProjectId) {
                        cssClasses += " bg-indigo-800 text-white"
                    } else {
                        cssClasses += " text-white"
                    }
                    return (
                        <li  key={project.id}>
                            <button className={cssClasses} onClick={() => onSelectProject(project.id)}> 
                                {project.title} 
                            </button>
                        </li>)
                }
            )}
            </ul>
        </aside>
    )
}