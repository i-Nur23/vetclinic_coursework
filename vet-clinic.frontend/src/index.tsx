import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import './index.css'
import Home from "./views/Home";

const router = createBrowserRouter([
    {path: '/', element: <Home/>}
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <App>
      <RouterProvider router={router} />
    </App>
);


reportWebVitals();
