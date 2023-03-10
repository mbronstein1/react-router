import React from 'react';
import { useRouteLoaderData, json } from 'react-router-dom';
import EventItem from '../components/EventItem';

const EventDetailsPage = () => {
  // const params = useParams();
  // const data = useLoaderData();

  // useRouteLoaderData is necessary when child components want access to loader in parent - argument is id defined in App.js
  const data = useRouteLoaderData('event-detail');

  return <EventItem event={data.event} />;
};

export default EventDetailsPage;

export async function loader({ request, params }) {
  const id = params.id;
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json({ message: 'Could not fetch details for selected event' }, { status: 500 });
  }

  return response;
}
