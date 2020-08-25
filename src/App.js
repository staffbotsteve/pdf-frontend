import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import PublicRoute from 'routes/PublicRoute';

import Home from 'containers/Home';
import NotFound from 'containers/NotFound';
import ROUTES from './constants/routes.json';
import Report from './containers/Report';

const App = (props) => (
  <SnackbarProvider maxSnack={3}>

    <div className="app-container">
      <Switch>
        <PublicRoute
          exact
          path="/"
          component={Home}
          props={props}
        />

        <PublicRoute
          path={ROUTES.REPORT_PAGE.url}
          component={Report}
          props={props}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  </SnackbarProvider>
);

export default withRouter(App);
