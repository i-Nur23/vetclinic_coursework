import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RouterProvider, createBrowserRouter, Router} from "react-router-dom";
import './index.css'
import Home from "./views/Home";
import Authentification from "./views/Authentification";
import {store} from "./store/store";
import {Provider} from "react-redux";

const router = createBrowserRouter([
    {path: '/', element: <Home/>},
    {path: '/auth', element: <Authentification/>}
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App>
      <RouterProvider router={router} />
    </App>
  </Provider>
);


reportWebVitals();
