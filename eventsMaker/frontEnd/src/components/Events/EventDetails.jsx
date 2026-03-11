import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import Header from '../Header.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx'
import Modal from "../UI/Modal.jsx"
import { fetchEvent, deleteEvent } from '../../utils/http.js'

export default function EventDetails() {
  const [ isDeleting, setIsDeleting ] = useState(false)
  const params = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data, isPending, isError, error} = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({signal}) => fetchEvent({ id: params.id, signal })
  })

  const { mutate, isPending: isDeletionPending, isError: isDeletionError, error: deletionError } = useMutation({
    mutationFn: deleteEvent, 
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none'
      })
      navigate('/events')
    }
  })

  function handleStartDelete() {
    setIsDeleting(true)
  }

  function handleStopDelete() {
    setIsDeleting(false)
  }

  function handleDeleteEvent() {
    mutate({id: params.id})
  }
  let content;

  if(isPending) {
    content = 
    <div id="event-details-content" className='center'>
      <p>Fetching event data..</p>
    </div> 
  }

  if(isError) {
    content = 
    <div id="event-details-content" className='center'>
      <ErrorBlock title='Error fetching details' message={error.info?.message || 'Error fetching details'} />
    </div> 
  }

  if(data) {
    const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
    content = 
    <>
    {isDeleting && 
    <Modal onClose={handleStopDelete}>
      <h2>Confirmation</h2>
      <p>Confirm delete. This action cant be undone</p>
      <div className='form-actions'>
      {isDeletionPending ? <p>Deleting..</p> :
        <>
          <button onClick={handleStopDelete} className='button-text'>Cancel</button>
          <button onClick={handleDeleteEvent} className='button'>Delete</button>
        </>  
      }
      </div>
      {isDeletionError && <ErrorBlock title='Failed to delete event!' message={deletionError.info?.message || "Failed to delete event!"} />}
    </Modal>}
      <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{formattedDate} @ {data.time}</time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
    </>
  }
  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {content}
      </article>
    </>
  )
}
