import { Redirect, Route } from 'react-router-dom';

export const AuthRoute = ({ isAuth, type, path, routeComponent, ...props }) => {
  if (type === 'authorized') {
    if (!isAuth) {
      return <Route {...props} render={() => <Redirect to="/login" />} />;
    }
    return <Route component={routeComponent} {...props} />;
  }

  if (type === 'unauthorized') {
    if (isAuth) {
      return <Route {...props} render={() => <Redirect to="/" />} />;
    }
    return <Route component={routeComponent} {...props} />;
  }

  return null;
};
