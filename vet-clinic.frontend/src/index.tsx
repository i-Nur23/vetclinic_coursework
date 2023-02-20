import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RouterProvider, createBrowserRouter, Router, createRoutesFromElements, Route} from "react-router-dom";
import './index.css'
import Home from "./views/Home";
import Authentification from "./views/Authentification";
import {store} from "./store/store";
import {Provider} from "react-redux";

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
    </Route>
  ))

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>
);


reportWebVitals();
