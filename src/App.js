import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { Forget } from './pages/Auth/Forget';
import { NotFound } from './pages/NotFound/NotFound';
import { Main } from './pages/Main/Main';
import { AuthRoute } from './components/AuthRoute/AuthRoute';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { Users } from './pages/Users/Users';
import { CreateUser } from './pages/Users/CreateUser/CreateUser';
import { EditUser } from './pages/Users/EditUser/EditUser';
import { MainUser } from './pages/Users/MainUser/MainUser';

export const App = observer(() => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AuthRoute type="unauthorized">
            <Login />
          </AuthRoute>
        }
      />
      <Route
        path="/register"
        element={
          <AuthRoute type="unauthorized">
            <Register />
          </AuthRoute>
        }
      />
      <Route
        path="/forget"
        element={
          <AuthRoute type="unauthorized">
            <Forget />
          </AuthRoute>
        }
      />

      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <AuthRoute type="authorized">
              <Main />
            </AuthRoute>
          }
        />
        <Route path="/users" element={<Users />}>
          <Route
            index
            element={
              <AuthRoute type="authorized">
                <MainUser />
              </AuthRoute>
            }
          />
          <Route
            path="create"
            element={
              <AuthRoute type="authorized">
                <CreateUser />
              </AuthRoute>
            }
          />
          <Route
            path="edit/:id"
            element={
              <AuthRoute type="authorized">
                <EditUser />
              </AuthRoute>
            }
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={
          <AuthRoute type="unauthorized">
            <NotFound />
          </AuthRoute>
        }
      />
    </Routes>
  );
});
