// import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';

export default function EventsPage() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [fetchedEvents, setFetchedEvents] = useState();
  // const [error, setError] = useState();

  // useEffect(() => {
  //   async function fetchEvents() {
  //     setIsLoading(true);
  //     // const response = await fetch('http://localhost:8080/events');

  //     // if (!response.ok) {
  //     //   setError('Fetching events failed.');
  //     // } else {
  //     //   const resData = await response.json();
  //     //   setFetchedEvents(resData.events);
  //     // }
  //     setIsLoading(false);
  //   }

  //   fetchEvents();
  // }, []);

  const {events} = useLoaderData()
  return (
    <>
      {/* <div style={{ textAlign: 'center' }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div> */}

      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>


      
    </>
  );
}
async function loadEvents() {

  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw new Response(JSON.stringify({message: "Could not fetch data"}), {status: 500})
  } else {
    const resData = await response.json();
    return resData.events;
  }
  
}
export async function loader() {
  // const response = await fetch('http://localhost:8080/events');

  // if (!response.ok) {
  //   throw new Response(JSON.stringify({message: "Could not fetch data"}), {status: 500})
  // } else {
  //   const resData = await response.json();
  //   return resData.events;
  // }

  return{
    events: loadEvents()
  }
}


