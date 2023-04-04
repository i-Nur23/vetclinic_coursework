import React from 'react';
import ReactDOM from 'react-dom/client';
import ClientApp from './ClientApp';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import './index.css'
import Home from "./views/Home";
import Authentification from "./views/Authentification";
import {Provider} from "react-redux";
import {persistor, store} from './store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {ProtectedRoutes} from "./utils/ProtectedRoutes";
import {Level} from "./utils/Level";
import {Profile} from './views/Client/Profile'
import {Pets} from "./views/Client/Pets";
import WorkerApp from "./WorkerApp";
import {WorkerLogin} from "./views/Worker/WorkerLogin";
import {AddUsers, AdminCatalog, AdminHome, UsersList} from "./views/Admin";
import {ManagerHome, ScheduleBuilder, ServiceListControl} from "./views/Manager";

/*const router = createBrowserRouter([
  {path: '/', element: <ClientApp/>, children:
      [ {index: true, element: <AdminHome/>},
        {path: 'auth', element: <Authentification/>}]
  },
])*/

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<ClientApp/>}>
        <Route index element={<Home/>}/>
        <Route path="auth" element={<Authentification/>}/>
          <Route element={<ProtectedRoutes role={Level.Client}/>}>
            <Route path='client'>
              <Route path='profile' element={<Profile/>}/>
              <Route path='pets' element={<Pets/>}/>
            </Route>
          </Route>
      </Route>
      <Route path="workers" element={<WorkerApp/>}>
        <Route index element={<WorkerLogin/>}/>
        <Route element={<ProtectedRoutes role={Level.Admin}/>}>
          <Route path='admin'>
            <Route path='home' element={<AdminHome/>}/>
            <Route path='addusers' element={<AddUsers/>}/>
            <Route path='catalog' element={<AdminCatalog/>}/>
            <Route path='users' element={<UsersList/>}/>
          </Route>
        </Route>
        <Route element={<ProtectedRoutes role={Level.Manager}/>}>
          <Route path='manager'>
            <Route path='home' element={<ManagerHome/>}/>
            <Route path='schedule' element={<ScheduleBuilder/>}/>
            <Route path='services' element={<ServiceListControl/>}/>
          </Route>
        </Route>
      </Route>
    </Route>

  ))

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);


reportWebVitals();
