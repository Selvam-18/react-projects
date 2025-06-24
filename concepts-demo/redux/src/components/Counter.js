import { useSelector, useDispatch } from 'react-redux';
import classes from './Counter.module.css';
import { counterActions } from '../store/counterSlice';


const Counter = () => {
  
  const dispatch = useDispatch()
  const counterValue = useSelector(state => state.counter.counter)
  const show = useSelector(state => state.counter.showCounter)
  
  const toggleCounterHandler = () => {
    dispatch(counterActions.toggle())
  };

  function incrementHandler() {
    dispatch(counterActions.increment())
  }
  function decrementHandler() {
    dispatch(counterActions.decrement())
  }
  function increase() {
    dispatch(counterActions.increase(10))
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counterValue}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increase}>Increase by 10</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
