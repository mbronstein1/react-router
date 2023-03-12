import React from 'react';
import { json, redirect } from 'react-router-dom';
import EventForm from '../components/EventForm';

const NewEventPage = () => {
  return <EventForm />;
};

export default NewEventPage;

export const action = async ({ request }) => {
  // React-router-dom actions receive a request and access the form data with
  // the formData method
  const data = await request.formData();
  // You can access each field with the get method and pass the name of the field
  // as notated in the form (EventForm.js)
  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  const response = await fetch('http://localhost:8080/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Failed to save event' }, { status: 500 });
  }

  return redirect('/events');
};
