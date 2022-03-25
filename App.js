import React, {useState, useContext, useEffect, createContext} from 'react';
import Auth, {AuthEventEmitter, AuthEvents} from 'react-native-firebaseui-auth';
import {QueryClient, QueryClientProvider} from 'react-query';
import AppNav from './src/screens';
import SplashScreen from 'react-native-splash-screen';

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const queryClient = new QueryClient();

const App = () => {
  // Check Google Auth
  const [userAuthInfo, setUserAuthInfo] = useState(null);
  useEffect(() => {
    const authEvent = AuthEventEmitter.addListener(
      AuthEvents.AUTH_STATE_CHANGED,
      event => {
        console.log('user:', event.user);
      },
    );
    SplashScreen.hide();

    return () => authEvent.remove();
  }, []);

  if (!userAuthInfo) {
    const config = {
      providers: ['email'],
      tosUrl: 'https://google.com',
      privacyPolicyUrl: 'https://google.com',
    };
    Auth.signIn(config)
      .then(user => setUserAuthInfo(user))
      .catch(err => console.log(err));
    return null;
  }

  return (
    <AppContext.Provider
      value={{user: userAuthInfo, logout: () => setUserAuthInfo(null)}}>
      <QueryClientProvider client={queryClient}>
        <AppNav />
      </QueryClientProvider>
    </AppContext.Provider>
  );
};

export default App;
