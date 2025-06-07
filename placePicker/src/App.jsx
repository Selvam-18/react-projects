import { useRef, useState, useEffect, useCallback } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';


  const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) ||[];
  const storedPlaces = storedIds.map((id) => AVAILABLE_PLACES.find((place)=> place.id === id));

function App() {
  // const modal = useRef();
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces ] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  //NO need to use useEffect, as the effect is computed synchronously.
  // useEffect(()=> {
  //   const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) ||[];
  //   const storedPlaces = storedIds.map((id) => AVAILABLE_PLACES.find((place)=> place.id === id));
  //   console.log(storedPlaces);

  //   setPickedPlaces(storedPlaces);
  // }, []);
  
  // Using useEffect, since the effect runs asynchronously
  useEffect(()=>{
    console.log("fetching location");
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES, 
        position.coords.latitude, 
        position.coords.longitude
      );
  
      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  
  function handleStartRemovePlace(id) {
    // modal.current.open();
    setModalIsOpen(true);
    // console.log(id);

    //the below line is just used to store the id value in Ref.
    //This is one of the quick and catchy method to store the data, which doesn't change during component rerendering
    selectedPlace.current = id;
    // console.log(selectedPlace.current);
  }

  function handleStopRemovePlace() {
    // console.log(selectedPlace.current);
    // modal.current.close();
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    console.log("executing bro");
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      // console.log(place);
      // console.log(...prevPickedPlaces);
      return [place, ...prevPickedPlaces];
    });

    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) ||[];
    if(storedIds.indexOf(id) == -1) {
      localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storedIds]));
    }
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    // modal.current.close();
    setModalIsOpen(false);
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) ||[];
    localStorage.setItem('selectedPlaces', JSON.stringify(storedIds.filter((id)=> id !== selectedPlace.current)))
  }, []);

  return (
    <>
      <Modal open={modalIsOpen} close={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe"/>
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
