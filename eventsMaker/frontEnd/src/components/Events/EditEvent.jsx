import { Link, useNavigate, useParams  } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';


import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx'

import { fetchEvent, updateEvent } from '../../utils/http.js'

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams()
  const queryClient = useQueryClient()

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', params.id ],
    queryFn: ({signal}) => fetchEvent({ id: params.id, signal})
  })

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: (data) => {
      const newEvent = {...data.event};
      // console.log("new event", newEvent)
      queryClient.cancelQueries({queryKey: ['events', params.id ]})
      // console.log("Cancelling queries")
      const previousData = queryClient.getQueryData(['events', params.id])

      queryClient.setQueryData(['events', params.id ], newEvent)
      // console.log("Set Query Data")
      return { previousData }
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(['events', params.id], context.previousData)
    }
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ['events', params.id], 
    //     exact: true
    //   })
    //   navigate(`/events/${params.id}`)
    // } 
  })


  function handleSubmit(formData) {
    mutate({id: params.id, event: formData})
    navigate('../')
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if(isPending) {
    content = 
    <>
      <div className='center'>
        <LoadingIndicator />
      </div>
    </>
  }

  if(isError) {
    content = 
    <>
    <ErrorBlock title='Error fetching data' message={error.info?.message} />
      <div className='form-actions'>
        <Link to="../" className='button'>OK</Link>
      </div>
    </>
  }

  if(data) {
    content = <>
      <EventForm inputData={data} onSubmit={handleSubmit}>

        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
        
        
      </EventForm>
      {isError && <ErrorBlock title="Error fetching data" message={error.info?.message || 'Error fetching data'} />}
      </>
  }

  return (
    <Modal onClose={handleClose}>
     {content}
    </Modal>
  );
}
