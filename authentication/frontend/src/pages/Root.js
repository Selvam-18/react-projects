import { Outlet, redirect, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';

import { getTokenDuration } from '../util/auth';
import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';

function RootLayout() {
  // const navigation = useNavigation();
  const token = useLoaderData();
  const submit = useSubmit()

  
  useEffect(() => {
    if(!token) {
      console.log('No token available')
      return;
    }

    if(token === 'EXPIRED'){
      submit(null, {action: '/logout', method: 'POST'})
      return;
    }
    
    const duration = getTokenDuration()
    console.log("Token Duration: ", duration)




    console.log('Token Time started')

    setTimeout(() => {
      console.log('Token Expired')
      submit(null, {action: '/logout', method: 'POST'})
    }, duration);

  }, [token, submit])


  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
