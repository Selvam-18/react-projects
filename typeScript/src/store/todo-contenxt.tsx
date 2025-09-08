import { useState } from "react";
import React from "react";

interface Todo {
  id: number;
  text: string;
}

type TodoContextObject = {
    items: Todo[],
    addTodo: (text: string) => void,
    removeTodo: (id: number) => void}

export const TodoContext = React.createContext<TodoContextObject>({
    items: [],
    addTodo: () => {},
    removeTodo: () => {}
})

const TodoContextProvider: React.FC = (props) => {
  const [ todo, setTodo ] = useState<Todo[]>([])
  
    function addTodoHandler(text: string) {
      const id = todo.length;
      const newTodo = {
        id: id,
        text: text
      }
      setTodo((prevTodo) => {
        return [...prevTodo, newTodo]
      })
    }
  
    function removeTodoHandler(removeId: number) {
      setTodo((prevTodo) => {
        return prevTodo.filter(todo => todo.id !== removeId)
      })
    }

    const contextValue: TodoContextObject = {
      items: todo,
      addTodo: addTodoHandler,
      removeTodo: removeTodoHandler
    }
  
  return <TodoContext.Provider value={contextValue}>
    {props.children}
  </TodoContext.Provider>
}

export default TodoContextProvider;