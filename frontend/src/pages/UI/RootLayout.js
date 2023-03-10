import React from 'react';
import MainNavigation from '../../components/MainNavigation';
import { Outlet /*useNavigation*/ } from 'react-router-dom';

const RootLayout = () => {
  // const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
      </main>
    </>
  );
};

export default RootLayout;
