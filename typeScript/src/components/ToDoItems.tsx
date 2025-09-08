import classes from "./TodoItem.module.css"

const ToDoItems: React.FC<{items: string, id: number, removeTodo: (id: number) => void}> = (props) => {

    return <li className={classes.item} key={props.id} onClick={() => props.removeTodo(props.id)}>{props.items} {props.id}</li>
    
}

export default ToDoItems;