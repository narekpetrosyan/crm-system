import mainRoutes from './MainRoutes';
import _ from 'lodash';

export const getRoutesByPermissions = (permissions) => {
  const permItems = permissions.length ? permissions.map((it) => +it.id) : [];
  const newRoutes = _.filter(
    Object.values(mainRoutes).map((el) => {
      return el.permissions.length
        ? _.uniq(el.permissions.map((item) => permItems.includes(item) && el))
        : el;
    }),
    _.size,
  );

  return _.flatten(newRoutes).filter(Boolean);
};

export const getNavigationRoutesByPermissions = (permissions) => {
  const navLinks = Object.values(mainRoutes)
    .map((el) => el.iconName && el)
    .filter(Boolean);

  const permItems = permissions.length ? permissions.map((it) => +it.id) : [];
  const newRoutes = _.filter(
    Object.values(navLinks).map((el) => {
      return el.permissions.length
        ? _.uniq(el.permissions.map((item) => permItems.includes(item) && el))
        : el;
    }),
    _.size,
  );

  return _.flatten(newRoutes).filter(Boolean);
};
