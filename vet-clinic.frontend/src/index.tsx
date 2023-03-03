import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
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

/*const router = createBrowserRouter([
  {path: '/', element: <App/>, children:
      [ {index: true, element: <Home/>},
        {path: 'auth', element: <Authentification/>}]
  },
])*/

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index element={<Home/>}/>
      <Route path="auth" element={<Authentification/>}/>
        <Route path='client' element={<ProtectedRoutes role={Level.Client}/>}>
          <Route path='profile' element={<Profile/>}/>
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
