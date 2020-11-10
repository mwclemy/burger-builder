import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const App = props =>  {
  const {isAuthenticated, onCheckAuthState } = props
  useEffect(() => {
    onCheckAuthState();
  }, [onCheckAuthState]);
   
  let routes = (
    <Switch>
          <Route path="/auth" render={(props) => <Auth {...props}/>}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
    </Switch>
  );
  if (isAuthenticated) {
    routes = (
      <Switch>
          <Route path="/checkout" component={(props) => <Checkout {...props}/>}/>
          <Route path="/orders" component={(props) => <Orders {...props}/>}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={(props) => <Auth {...props}/>}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
      </Switch>
    );

  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
        {routes}
        </Suspense>
      </Layout>
    </div>
  );
  
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    building: state.burgerBuilder.building
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));