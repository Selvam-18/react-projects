import { useState } from "react";
import SideBar from "./components/SideBar.jsx";
import NewProject from "./components/NewProject.jsx";
import LandingPage from "./components/LandingPage.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects:[], 
    tasks: []
  });

  function handleAddTask (text) {
    setProjectState( (prev) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prev.selectedProjectId,
        id: taskId
      }

      return{
        ...prev,
        tasks: [newTask, ...prev.tasks]
    }
  })
};

  function handleDeleteTask(id) {
    setProjectState( prev => {
      return {
       ...prev,
       tasks: prev.tasks.filter(
        (eachTask) => eachTask.id !== id
       )
      };
     })
  }

  function handleStartNewProject() {
    setProjectState( prev => {
     return {
      ...prev,
      selectedProjectId: null,
     };
    })
  };

  function handleAddProject (projectData) {
    setProjectState( (prev) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
      }

      return{
        ...prev,
        selectedProjectId: undefined,
        projects:[...prev.projects, newProject]
      }
    })
  }

  function handleCancelAddProject() {
    setProjectState( prev => {
      return {
       ...prev,
       selectedProjectId: undefined,
      };
     })
  }

  function handleSelectProject(id) {
    setProjectState( prev => {
      return {
       ...prev,
       selectedProjectId: id,
      };
     })
  }

  function handleDeleteProject() {
    setProjectState( prev => {
      return {
       ...prev,
       selectedProjectId: undefined,
       projects: prev.projects.filter(
        (eachProject) => eachProject.id !== prev.selectedProjectId
       )
      };
     })
  }

  console.log(projectState);

  const selectedProject = projectState.projects.find((project) => project.id === projectState.selectedProjectId)
   
  let content = <SelectedProject 
  project={selectedProject} 
  onDelete={handleDeleteProject}  
  onAddTask={handleAddTask} 
  onDeleteTask={handleDeleteTask}
  tasks={projectState.tasks}/>;

  if(projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  } else if(projectState.selectedProjectId === undefined) {
    content = <LandingPage onStartNewProject={handleStartNewProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar onStartNewProject={handleStartNewProject} 
      projects={projectState.projects} 
      onSelectProject={handleSelectProject}
      selectedProjectId={projectState.selectedProjectId}
      />
      
      {content}
      {/* <NewProject /> */}
    </main>
  );
}

export default App;
