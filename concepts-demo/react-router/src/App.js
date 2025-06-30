// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import MainNavigation from './components/MainNavigation';
import HomePage from './pages/HomePage';
import EventsPage, {loader as eventLoader} from './pages/Events';
import EventsDetailPage, {loader as eventDetailLoader, action as eventDeleteAction } from './pages/EventsDetailpage';
import NewEventPage from './pages/NewEventPage';
import Root from './pages/Root';
import EditEventPage from './pages/EditEventPage';
import ErrorPage from './pages/ErrorPage';
// import EventsNavigation from './components/EventsNavigation';
import EventsLayout from './pages/EventsLayout';
import { action as manipulativeAction } from './components/EventForm'
import NewsletterPage, {action as newsletterAction} from './pages/Newsletter';

function App() {

  const router = createBrowserRouter([
    {
      path: '/', 
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {index: true, element: <HomePage />},
        {
          path: 'events', 
          element: <EventsLayout />, 
          children:[
            {
              index: true, 
              element: <EventsPage />, 
              loader: eventLoader 
            },
            {
              path: ':eventId',  
              loader: eventDetailLoader, 
              id: 'event-details',
              children:[
                {index:true, element: <EventsDetailPage />, action: eventDeleteAction},
                {path: 'edit', element: <EditEventPage />, action: manipulativeAction},
              ]
            },
            {path: 'new', element: <NewEventPage />, action: manipulativeAction},
        ]},
        {
          path: 'newsletter',
          element: <NewsletterPage />,
          action: newsletterAction
        }

    ]},
  ])
  return <RouterProvider router={router} />;
}

export default App;
