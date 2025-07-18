import { Form, useFetcher } from 'react-router-dom';

import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
  const fetcher = useFetcher();
  const { data, state, formData} = fetcher;
  // console.log(state)
  // console.log(data)

  // console.log(formData)
  useEffect(()=>{
    if(state === 'idle' && data && data.message){
      window.alert(data.message)
    }
  }, [data, state])
  return (
    <fetcher.Form method="post"  action="/newsletter" className={classes.newsletter}>
      <input
      name='email'
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
