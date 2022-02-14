import React from 'react';

const MainUser = React.lazy(() =>
  import('../pages/Users/MainUser/MainUser').then(({ MainUser }) => ({
    default: MainUser,
  })),
);
const CreateUser = React.lazy(() =>
  import('../pages/Users/CreateUser/CreateUser').then(({ CreateUser }) => ({
    default: CreateUser,
  })),
);
const EditUser = React.lazy(() =>
  import('../pages/Users/EditUser/EditUser').then(({ EditUser }) => ({
    default: EditUser,
  })),
);

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

const mainRoutes = {
  users: {
    exact: true,
    pathName: '/users',
    element: MainUser,
  },
  createUser: {
    exact: false,
    pathName: '/users/create',
    element: CreateUser,
  },
  editUser: {
    exact: false,
    pathName: '/users/edit/:id',
    element: EditUser,
  },
  cities: {
    exact: true,
    pathName: '/cities',
    element: MainCities,
  },
  createCity: {
    exact: false,
    pathName: '/cities/create',
    element: CreateCity,
  },
  editCity: {
    exact: false,
    pathName: '/cities/edit/:id',
    element: EditCity,
  },
  contrAgents: {
    exact: true,
    pathName: '/contr-agents',
    element: MainContrAgents,
  },
  createContrAgent: {
    exact: false,
    pathName: '/contr-agents/create',
    element: CreateContrAgent,
  },
  editContrAgent: {
    exact: false,
    pathName: '/contr-agents/edit/:id',
    element: EditContrAgent,
  },
  calls: {
    exact: true,
    pathName: '/calls',
    element: MainCalls,
  },
  plannedCalls: {
    exact: false,
    pathName: '/calls/planned',
    element: PlannedCalls,
  },
  createCall: {
    exact: false,
    pathName: '/calls/create',
    element: CreateCall,
  },
  editCall: {
    exact: false,
    pathName: '/call/edit/:id',
    element: EditCall,
  },
};

export default mainRoutes;
