import Player from './components/Player.jsx';
import TimeChallenge from './components/TimeChallenge.jsx';

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimeChallenge title='Easy' targetTime={1}/>
        <TimeChallenge title='Not Easy' targetTime={5}/>
        <TimeChallenge title='Tough' targetTime={10}/>
        <TimeChallenge title='Pro only' targetTime={15}/>
      </div>
    </>
  );
}

export default App;
