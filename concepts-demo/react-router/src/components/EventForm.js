import { useNavigate, useNavigation, useActionData, Form, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation()
  const actionData = useActionData()
  function cancelHandler() {
    navigate('..');
  }
  const isSubmiting = navigation.state === 'submitting';

  return (
    <Form method={method} className={classes.form}>
      {actionData && actionData.errors && (
        <ul>
          {Object.values(actionData.errors).map((item) => <li>{item}</li>)}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required  defaultValue={event && event.title}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event && event.image}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event && event.date}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event && event.description}/>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmiting}>
          Cancel
        </button>
        <button disabled={isSubmiting}>{isSubmiting ? 'Submitting...': 'Submit'}</button>
      </div>
    </Form>
  );
}

export default EventForm;


export async function action({request, params}) {
    const method = request.method;
    const data = await request.formData();

    const eventDetails = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description'),
    }

    let url = 'http://localhost:8080/events';

    
    if(method === 'PATCH') {
      const eventId = params.eventId;
      url = 'http://localhost:8080/events/' + eventId
    }

    

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventDetails)
    })

    if(response.status === 422) {
        return response;
    }

    if(!response.ok) {
        throw new Response(JSON.stringify({message: 'Unable to submit data'}), {
            status: 500
        })
    }

    return redirect('/events')
}