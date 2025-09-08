import { useRef, useContext } from "react";
import classes from "./NewTodo.module.css"
import { TodoContext } from "../store/todo-contenxt";

const NewTodo: React.FC = () => {
    const todoCtx = useContext(TodoContext)
    const toDoInputRef = useRef<HTMLInputElement>(null)
    function submitTodo(event: React.FormEvent) {
        event.preventDefault()

        const newTodo = toDoInputRef.current!.value;

        if(newTodo?.trim().length === 0){
            //Throw error
            return
        }

        todoCtx.addTodo(newTodo)

    }
    return(
        <form onSubmit={submitTodo} className={classes.form}>
            <label htmlFor="new-todo">New Todo</label>
            <input type="text" id="text" ref={toDoInputRef}/>
            <button>Add Todo</button>
        </form>
    )
}

export default NewTodo;