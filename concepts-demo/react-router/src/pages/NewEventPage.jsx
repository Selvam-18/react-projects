import { redirect } from 'react-router-dom';
import EventForm from '../components/EventForm'

export default function NewEventPage() {
    return(
        <EventForm method='POST' />
    )
}


// export async function action({request, params}) {
//     const data = await request.formData();

//     const eventDetails = {
//         title: data.get('title'),
//         image: data.get('image'),
//         date: data.get('date'),
//         description: data.get('description'),
//     }

    

//     const response = await fetch('http://localhost:8080/events', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(eventDetails)
//     })

//     if(response.status === 422) {
//         return response;
//     }

//     if(!response.ok) {
//         throw new Response(JSON.stringify({message: 'Unable to submit data'}), {
//             status: 500
//         })
//     }

//     return redirect('/events')
// }