import React from 'react';

const MainUser = React.lazy(() => import('../pages/Users/MainUser/MainUser'));
const CreateUser = React.lazy(() => import('../pages/Users/CreateUser/CreateUser'));
const EditUser = React.lazy(() => import('../pages/Users/EditUser/EditUser'));

const MainCities = React.lazy(() => import('../pages/Cities/MainCities/MainCities'));
const CreateCity = React.lazy(() => import('../pages/Cities/CreateCity/CreateCity'));
const EditCity = React.lazy(() => import('../pages/Cities/EditCity/EditCity'));

const MainContrAgents = React.lazy(() =>
  import('../pages/ContrAgents/MainContrAgents/MainContrAgents'),
);
const CreateContrAgent = React.lazy(() =>
  import('../pages/ContrAgents/CreateContrAgent/CreateContrAgent'),
);
const EditContrAgent = React.lazy(() =>
  import('../pages/ContrAgents/EditContrAgent/EditContrAgent'),
);

const MainCalls = React.lazy(() => import('../pages/Calls/MainCalls/MainCalls'));
const PlannedCalls = React.lazy(() => import('../pages/Calls/PlannedCalls/PlannedCalls'));
const CreateCall = React.lazy(() => import('../pages/Calls/CreateCall/CreateCall'));
const EditCall = React.lazy(() => import('../pages/Calls/EditCall/EditCall'));

const MainWorkers = React.lazy(() => import('../pages/Workers/MainWorkers/MainWorkers'));
const CreateWorker = React.lazy(() => import('../pages/Workers/CreateWorker/CreateWorker'));
const EditWorker = React.lazy(() => import('../pages/Workers/EditWorker/EditWorker'));

const MainOrders = React.lazy(() => import('../pages/Orders/MainOrders/MainOrders'));
const CreateOrder = React.lazy(() => import('../pages/Orders/CreateOrder/CreateOrder'));
const EditOrder = React.lazy(() => import('../pages/Orders/EditOrder/EditOrder'));

const MainAnalytics = React.lazy(() => import('../pages/Analytics/MainAnalytics/MainAnalytics'));

const mainRoutes = {
  users: {
    exact: true,
    pathName: '/users',
    element: MainUser,
    iconName: 'man-white',
    title: 'Пользователи',
    permissions: [1],
  },
  createUser: {
    exact: false,
    pathName: '/users/create',
    element: CreateUser,
    permissions: [2],
  },
  editUser: {
    exact: false,
    pathName: '/users/edit/:id',
    element: EditUser,
    permissions: [3],
  },

  cities: {
    exact: true,
    pathName: '/cities',
    element: MainCities,
    iconName: 'factory-white',
    title: 'Города',
    permissions: [18],
  },
  createCity: {
    exact: false,
    pathName: '/cities/create',
    element: CreateCity,
    permissions: [19],
  },
  editCity: {
    exact: false,
    pathName: '/cities/edit/:id',
    element: EditCity,
    permissions: [20],
  },

  contrAgents: {
    exact: true,
    pathName: '/contr-agents',
    element: MainContrAgents,
    iconName: 'man-white',
    title: 'Контрагенты',
    permissions: [5],
  },
  createContrAgent: {
    exact: false,
    pathName: '/contr-agents/create',
    element: CreateContrAgent,
    permissions: [6],
  },
  editContrAgent: {
    exact: false,
    pathName: '/contr-agents/edit/:id',
    element: EditContrAgent,
    permissions: [7],
  },

  calls: {
    exact: true,
    pathName: '/calls',
    element: MainCalls,
    iconName: 'phone-white',
    title: 'Звонки',
    permissions: [],
  },
  plannedCalls: {
    exact: false,
    pathName: '/calls/planned',
    element: PlannedCalls,
    permissions: [],
  },
  createCall: {
    exact: false,
    pathName: '/calls/create',
    element: CreateCall,
    permissions: [],
  },
  editCall: {
    exact: false,
    pathName: '/calls/edit/:id',
    element: EditCall,
    permissions: [],
  },

  workers: {
    exact: true,
    pathName: '/workers',
    element: MainWorkers,
    iconName: 'man-white',
    title: 'Работники',
    permissions: [9],
  },
  createWorker: {
    exact: false,
    pathName: '/workers/create',
    element: CreateWorker,
    permissions: [10],
  },
  editWorker: {
    exact: false,
    pathName: '/workers/edit/:id',
    element: EditWorker,
    permissions: [11],
  },

  orders: {
    exact: true,
    pathName: '/orders',
    element: MainOrders,
    iconName: 'man-white',
    title: 'Заказы',
    permissions: [13],
  },
  createOrder: {
    exact: false,
    pathName: '/orders/create',
    element: CreateOrder,
    permissions: [14],
  },
  editOrder: {
    exact: false,
    pathName: '/orders/edit/:id',
    element: EditOrder,
    permissions: [15],
  },

  analytics: {
    exact: true,
    pathName: '/analytics',
    element: MainAnalytics,
    iconName: 'man-white',
    title: 'Аналитика',
    permissions: [],
  },
};

export default mainRoutes;
