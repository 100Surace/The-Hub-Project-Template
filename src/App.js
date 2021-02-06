import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import store from './redux/actions/store';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <Provider store={store}>
      <ToastProvider autoDismiss>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {routing}
        </ThemeProvider>
      </ToastProvider>
    </Provider>
  );
};

export default App;
