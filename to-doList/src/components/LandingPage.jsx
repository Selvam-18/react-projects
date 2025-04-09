import noProjectImage from "../assets/no-projects.png";
import Button from "./Button.jsx";

export default function LandingPage ({onStartNewProject}) {
    return(
        <div className="mt-24 text-center w-2/3">
            <img src={noProjectImage} alt="Empty task list" className="w-16 h-16 object-contain mx-auto"/>
            <h2 className="text-xl font-bold text-indigo-500 my-4">No Project Selected</h2>
            <p className="text-black mb-4">Get started with project</p>
            <p className="mt-8">
               <Button onClick={onStartNewProject} > Create New Project </Button>
            </p>
        </div>       
    )
}