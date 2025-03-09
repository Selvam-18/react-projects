import ReactIMG from "../../assets/react-core-concepts.png";
import "./Header.css";

const reactDescriptions = ['Crucial', 'Fundamental', 'Essential'];

function genRandomNum(max) {
  return Math.floor(Math.random() * (max + 1));
}

export default function Header() {
  const displayDescription = reactDescriptions[genRandomNum(reactDescriptions.length - 1)];
  return (<header>
    <img src={ReactIMG} alt="Stylized atom" />
    <h1>React Essentials</h1>
    <p>
      {displayDescription} React concepts you will need for almost any app you are
      going to build!
    </p>
  </header>);
}