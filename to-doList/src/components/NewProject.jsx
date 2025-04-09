import { useRef } from "react";
import Input from "./Input.jsx";
import Modal from "./Modal.jsx";

export default function NewProject({onAdd, onCancel}) {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const dueDateRef = useRef();

    const modalRef = useRef();

    function handleSave () {
        const enteredTitle = titleRef.current.value;
        const enteredDescription = descriptionRef.current.value;
        const enteredDueDate = dueDateRef.current.value;

        //Evaluation of the content
        if(enteredTitle.trim() === '' ||
            enteredDescription.trim() === '' ||
            enteredDueDate.trim() === '') 
            {
                modalRef.current.open();
                return;
            }

        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        });
    };

    

    // onAddNewProject({
    //     title: enteredTitle,
    //     description: enteredDescription,
    //     dueDate: enteredDueDate
    // }); 

    return( 
        <>
            <Modal ref={modalRef} buttonCaption="OK">
                <h2 className="text-xl font-bold text-indigo-600 my-4">Insufficient Data</h2>
                <p className="text-stone-800 mb-4">Fill out all the required contents</p>
                <p className="text-stone-800 mb-4">Have a productive day :&#41;</p>
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button onClick={onCancel} className="text-stone-800 hover:text-stone-500">Cancel</button>
                    </li>
                    <li>
                        <button 
                        className="px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-800 border-2"
                        onClick={handleSave}>
                            Save
                        </button>
                    </li>
                </menu>
                <div>
                    {/* <p>
                        <label></label>
                        <input />
                        </p> */}

                    <Input type="text" ref={titleRef} label="Title" />
                    <Input ref={descriptionRef} label="Description" textarea />
                    <Input type="date" ref={dueDateRef} label="Due Date" />
                </div>
            </div>
        </>
    )
}