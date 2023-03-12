import React, { Suspense } from 'react';
import { useRouteLoaderData, json, redirect, defer, Await } from 'react-router-dom';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

const EventDetailsPage = () => {
  // const params = useParams();
  // const data = useLoaderData();

  // useRouteLoaderData is necessary when child components want access to loader in parent - argument is id defined in App.js
  const data = useRouteLoaderData('event-detail');

  return (
    <>
      {/* This allows data to load at different times and render on the page when each data is returned */}
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading event...</p>}>
        <Await resolve={data.event}>{event => <EventItem event={event} />}</Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading all events...</p>}>
        <Await resolve={data.events}>{events => <EventsList events={events} />}</Await>
      </Suspense>
    </>
  );
};

export default EventDetailsPage;

const loadEvent = async id => {
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json({ message: 'Could not fetch details for selected event' }, { status: 500 });
  }

  const data = await response.json();
  return data.event;
};

const loadEvents = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw json({ message: 'Could not fetch events' }, { status: 500 });
  }

  const data = await response.json();
  return data.events;
};

export async function loader({ request, params }) {
  const id = params.id;

  return defer({
    // await waits for the page component to be loaded until the awaited function data is returned
    event: await loadEvent(id),
    // then this loader wouldn't run until the page w/ the loadEvent loader finishes
    events: loadEvents(),
  });
}

export const action = async ({ request, params }) => {
  const id = params.id;
  const response = await fetch(`http://localhost:8080/events/${id}`, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: 'Could not delete event' }, { status: 500 });
  }

  return redirect('/events');
};
