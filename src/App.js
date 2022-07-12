import { Redirect, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '@hooks/useStore';
import { AuthRoute } from './components/AuthRoute/AuthRoute';
import MainLayout from './layouts/MainLayout/MainLayout';
import Authentication from './pages/Auth/Authentication';
import NotFound from './pages/NotFound/NotFound';
import { useEffect } from 'react';
import Loader from './components/Loader/Loader';
import moment from 'moment';

const App = observer(() => {
  const { authStore } = useStore();

  useEffect(() => {
    moment.locale('ru');
  }, []);

  useEffect(() => {
    authStore.getMe();
  }, []);

  if (authStore.isLoading) return <Loader />;

  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/users" />} />

      <AuthRoute
        isAuth={authStore.isAuth}
        type="unauthorized"
        path={['/login', '/register', '/forget']}
        routeComponent={Authentication}
      />
      <AuthRoute
        isAuth={authStore.isAuth}
        type="authorized"
        path={['/users', '/cities', '/contr-agents', '/calls', '/workers', '/orders', '/analytics']}
        routeComponent={MainLayout}
      />

      <Route exact path="*" component={NotFound} />
    </Switch>
  );
});

export default App;
