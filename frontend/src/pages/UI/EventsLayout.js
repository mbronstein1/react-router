import React from 'react';
import EventsNavigation from '../../components/EventsNavigation';
import { Outlet } from 'react-router-dom';

const EventsLayout = () => {
  return (
    <>
      <EventsNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default EventsLayout;
