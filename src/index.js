import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import configureRouter from 'routes/configureRouter';
// import App from './components/App/App';
import './index.css';

const router = configureRouter();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
</React.StrictMode>
);

