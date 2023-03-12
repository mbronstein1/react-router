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
import RootLayout from './pages/UI/RootLayout';
import EventsLayout from './pages/UI/EventsLayout';
import Error from './pages/Error';
import HomePage from './pages/Home';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventDetailsPage, { loader as detailsLoader, action as deleteEventAction } from './pages/EventDetails';
import NewEventPage from './pages/NewEvent';
import EditEventPage from './pages/EditEvent';
import { action as formEventAction } from './components/EventForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            // Loader property allows you to fetch data BEFORE page renders
            // as opposed to useEffect which is AFTER page renders
            loader: eventsLoader,
          },
          {
            path: ':id',
            // By putting loader on parent, it allows all children to access it
            // id is necessary when you want child components to access the loader in the parent
            loader: detailsLoader,
            id: 'event-detail',
            children: [
              { index: true, element: <EventDetailsPage />, action: deleteEventAction },
              { path: 'edit', element: <EditEventPage />, action: formEventAction },
            ],
          },
          { path: 'new', element: <NewEventPage />, action: formEventAction },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
