import React from "react";
import ToDoItems from "./ToDoItems";
import classes from "./Todos.module.css"
import { useContext } from "react";
import { TodoContext } from '../store/todo-contenxt'

interface Todo {
  id: number;
  text: string;
}

const Todos: React.FC = () => {
     const todoCtx = useContext(TodoContext)
    return(

        <ul className={classes.todos}>
            {todoCtx.items.map((todo) => 
                <ToDoItems key={todo.id} items={todo.text} id={todo.id} removeTodo={todoCtx.removeTodo}/>
                // <li>{todo}</li>
            )}
        </ul>
           
    )
}

export default Todos;