 import React, { Fragment, useEffect } from 'react';
 import { Provider as PaperProvider, withTheme } from 'react-native-paper';
 import Nav from './components/Nav';
 import Spinner from './components/utils/Spinner';
 import { navigationRef, navigate } from './services/RootNavigation';
//  import factory from './components/redux/store';
 import useThemeStyle from './components/utils/useThemeStyle';
 import SplashScreen from 'react-native-splash-screen'
//  const { store } = factory();

const App = () => {

  const [theme ] = useThemeStyle();

  useEffect(() => {
    SplashScreen.hide();
  },[])

return (
      <PaperProvider theme={theme}>
        <Fragment>
          <Nav color={theme.colors.primary} refer={navigationRef}/>        
          <Spinner/>
        </Fragment>
      </PaperProvider>
  );
};

export default App;