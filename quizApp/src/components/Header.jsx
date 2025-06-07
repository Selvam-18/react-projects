import logoImg from "../assets/quiz-logo.png";


export default function Header() {
    return(
        <header>
            <img src={logoImg} alt="App Logo"/>
            <h1>Quiz App</h1>
        </header>
    )
}