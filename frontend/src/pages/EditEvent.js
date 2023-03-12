import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import EventForm from '../components/EventForm';

const EditEventPage = () => {
  // useRouteLoaderData is necessary when child components want access to loader in parent - argument is id defined in App.js
  const data = useRouteLoaderData('event-detail');

  return <EventForm event={data.event} method='PATCH' />;
};

export default EditEventPage;
