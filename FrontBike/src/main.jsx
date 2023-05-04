import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ListBikes from './pages/bike/ListBikes.jsx';
import InteractiveList from './pages/bike/InteractiveList.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/hello",
    element: <div>Hello world!</div>,
  },
  {
    path: "/bike",
    element: <ListBikes />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);