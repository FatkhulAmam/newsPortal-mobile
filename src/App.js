import React from 'react';
import Router from './routers';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';

import store from './redux/store';

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <Provider store={store().store}>
      <PersistGate loading={null} persistor={store().persistore}>
        <Router />
      </PersistGate>
    </Provider>
  );
};

export default App;
