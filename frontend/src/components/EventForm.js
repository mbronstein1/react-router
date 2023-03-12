import { useNavigate, Form, useNavigation, useActionData, json, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();

  // returns the response from the action (similar to loader)
  // in this case the returned response is the error object from the backend
  const data = useActionData();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    // react-router-dom Form component is required for form actions to be sent correctly
    <Form method={method} className={classes.form}>
      {/* Validating and displaying error object returned from backend */}
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map(err => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor='title'>Title</label>
        <input id='title' type='text' name='title' required defaultValue={event ? event.title : ''} />
      </p>
      <p>
        <label htmlFor='image'>Image</label>
        <input id='image' type='url' name='image' required defaultValue={event ? event.image : ''} />
      </p>
      <p>
        <label htmlFor='date'>Date</label>
        <input id='date' type='date' name='date' required defaultValue={event ? event.date : ''} />
      </p>
      <p>
        <label htmlFor='description'>Description</label>
        <textarea id='description' name='description' rows='5' required defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type='button' onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

export const action = async ({ request, params }) => {
  // Extract the specific method passed to form
  const method = request.method;
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

  let url = 'http://localhost:8080/events';

  if (method === 'PATCH') {
    url = `http://localhost:8080/events/${params.id}`;
  }

  const response = await fetch(url, {
    method,
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
