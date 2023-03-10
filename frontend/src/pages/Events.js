import { json, useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

const EventsPage = () => {
  const eventData = useLoaderData();

  // For error handling option 1 below
  // if (eventData.isError) {
  //   return <p>{eventData.message}</p>;
  // }

  const events = eventData.events;

  return <>{<EventsList events={events} />}</>;
};

export default EventsPage;

export async function loader() {
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

  // React-router-dom automatically parses and returns response w/ loader
  // so there is no need to parse it into json and return the data
  // you can just return the response you get from the fetch api as is
  return response;

  // Instead of
  // const data = await response.json();
  // return data.events;
}
