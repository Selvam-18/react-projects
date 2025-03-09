import { useState } from "react";
import Header from "./components/Header/Header.jsx";
import CoreConcepts from "./components/CoreConcepts.jsx";
import TabButton from "./components/TabButton.jsx";
import {CORE_CONCEPTS} from "./data.js";
import {EXAMPLES} from "./data-with-examples.js"

function App() {
  const [selectedTopic, setSelectedTopic] = useState();

  //console.log(selectedTopic);

  function handleClick (selectedButton) {
    setSelectedTopic(selectedButton);
    console.log(selectedTopic);
  }

  //Using variable
  let tabContent = <p>Select a topic</p>;

  if(selectedTopic) {
    tabContent =( 
    <div id="tab-content">
      <h3>{EXAMPLES[selectedTopic].title}</h3>
      <p>{EXAMPLES[selectedTopic].description}</p>
      <pre>
        <code>
        {EXAMPLES[selectedTopic].code}
        </code>
      </pre>
    </div>);
  }

  return (
    <div>
      <Header/>
      <main>
        <section id="core-concepts">
        <h2>Core Concepts</h2>
        <ul>
          {CORE_CONCEPTS.map((contentItem) => <CoreConcepts key={contentItem.title} {...contentItem} />)}

          {//Replaced with dynamic listing
          /* <CoreConcepts 
            title={CORE_CONCEPTS[0].title}
            description={CORE_CONCEPTS[0].description}
            img={CORE_CONCEPTS[0].img} 
          />
          <CoreConcepts {...CORE_CONCEPTS[1]} />
          <CoreConcepts {...CORE_CONCEPTS[2]} />
          <CoreConcepts {...CORE_CONCEPTS[3]} /> */}
        </ul>
        </section>

        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton isSelected={selectedTopic === 'components'} onSelect={() => { handleClick('components') }}> Components </TabButton>
            <TabButton isSelected={selectedTopic === 'jsx'} onSelect={() => { handleClick('jsx') }}> JSX </TabButton>
            <TabButton isSelected={selectedTopic === 'props'} onSelect={() => { handleClick('props') }}> Props </TabButton>
            <TabButton isSelected={selectedTopic === 'state'} onSelect={() => { handleClick('state') }}> State </TabButton>
          </menu>

           { //Using Ternary operator
           /* !selectedTopic ? <p>Select a topic</p> : <div>
                <h3>{EXAMPLES[selectedTopic].title}</h3>
                <p>{EXAMPLES[selectedTopic].description}</p>
                <pre>
                  <code>
                  {EXAMPLES[selectedTopic].code}
                  </code>
                </pre>
              </div> */
              } 

            { //Using AND operator 
            /* {!selectedTopic && <p>Select a topic</p>} 
            {selectedTopic && 
            <div>
              <h3>{EXAMPLES[selectedTopic].title}</h3>
              <p>{EXAMPLES[selectedTopic].description}</p>
              <pre>
                <code>
                {EXAMPLES[selectedTopic].code}
                </code>
              </pre>
            </div> } */}

            
            {tabContent}
        </section>
      </main>
    </div>
  );
}

export default App;
