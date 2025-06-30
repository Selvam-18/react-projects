import { useLoaderData, useParams, useRouteLoaderData, redirect, Await } from "react-router-dom";
import { Suspense } from 'react';
import EventItem from '../components/EventItem'
import EventsList from "../components/EventsList";

export default function EventsDetailPage() {
    // const params = useParams();
    const {event, events} = useRouteLoaderData('event-details')
    console.log(event)

    // console.log(data)
    return( 
        <>
        <Suspense fallback={<p style={{textAlign:'center'}}>Loading event</p>}>
            <Await resolve={event}>
                {(loadedEvent) => <EventItem event={loadedEvent}/> }
            </Await>
        </Suspense>


        <Suspense fallback={<p style={{textAlign:'center'}}>Loading... events</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents}/> }
            </Await>
        </Suspense>


        </>
    )
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


async function loadEvent(id) {
    const response = await fetch('http://localhost:8080/events/' + id)

    if(!response.ok) {
        throw new Response(JSON.stringify({message: 'Error fetching event'}), {
            status: 500
        })
    } else {
        const resData = await response.json()
        return resData.event;
    }
}


export async function loader({params}) {
    const id = params.eventId;
    
    return{
        event: await loadEvent(id),
        events: loadEvents()
    }

    // const response = await fetch('http://localhost:8080/events/' + id)

    // if(!response.ok) {
    //     throw new Response(JSON.stringify({message: 'Error fetching event'}), {
    //         status: 500
    //     })
    // } else {
    //     return response;
    // }
}

export async function action({request, params}) {
    const eventId = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method
    })
    
    if(!response.ok) {
        throw new Response(JSON.stringify({message: 'Unable to delete event'}), {
            status: 500
        })
    }

    return redirect('/events')
}