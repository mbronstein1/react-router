import { Suspense } from 'react';
import { Await, defer, json, useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

const EventsPage = () => {
  const eventData = useLoaderData();

  // For error handling option 1 below
  // if (eventData.isError) {
  //   return <p>{eventData.message}</p>;
  // }

  // For defer functionality,
  // instead of directly returning component w/ loader data...
  // const events = eventData.events;
  // return <EventsList events={events} />;

  //... we return the Await component provided by react-router-dom
  // This component gets a resolve prop that our data is passed to,
  // then in between the component we pass a function that renders the component we want
  // with the data that is passed via props
  // We also wrap the Await component w/ a react Suspense component which allows us to
  // display something before the returned promise is resolved
  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={eventData.loaderEvents}>{events => <EventsList events={events} />}</Await>
    </Suspense>
  );
};

export default EventsPage;

const loadEvents = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // Option 1 for error handling
    // return { isError: true, message: 'Could not fetch events.' };

    //Option 2 for error handling
    // throw new Response(JSON.stringify({ message: 'Could not fetch events' }), { status: 500 });

    //Option 3 for error handling (provided by react-router-dom)
    // json property creates a response and stringifies/parses data for you
    throw json({ message: 'Could not fetch events' }, { status: 500 });
  }

  const data = await response.json();
  return data.events;

  // React-router-dom automatically parses and returns response w/ loader
  // so there is no need to parse it into json and return the data
  // you can just return the response you get from the fetch api as is
  // i.e.
  // return response;

  // Instead of
  // const data = await response.json();
  // return data.events;
};

export function loader() {
  // defer allows us to load and render a component while we wait for the
  // promise from the executed function to be returned
  return defer({
    loaderEvents: loadEvents(),
  });
}
