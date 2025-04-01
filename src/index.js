import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import store from "store/configureStore";
import { RouterProvider } from "react-router-dom";
import configureRouter from 'routes/configureRouter';
// import App from './components/App/App';
import './index.css';

const router = configureRouter();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
</Provider>
);

