import Todos from './components/Todos';
import './App.css';
import NewTodo from './components/NewTodo';
import TodoContextProvider from './store/todo-contenxt';



function App() {
    return (
    <TodoContextProvider>
      <NewTodo />
      <Todos />
    </TodoContextProvider>
  );
}

export default App;
