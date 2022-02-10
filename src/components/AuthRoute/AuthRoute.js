import { observer } from 'mobx-react-lite';
import { Navigate, useLocation } from 'react-router-dom';

export const AuthRoute = observer(({ children, type }) => {
  const isAuth = JSON.parse(localStorage.getItem('isAuth'));
  const location = useLocation();

  if (type === 'authorized') {
    return isAuth ? children : <Navigate to="/login" state={{ from: location }} />;
  }

  if (type === 'unauthorized') {
    return !isAuth ? children : <Navigate to="/" />;
  }

  return null;
});
