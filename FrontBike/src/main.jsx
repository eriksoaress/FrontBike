import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import NewBike from './pages/bike/NewBike.jsx'
import Bike from './pages/bike/Bike.jsx'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ListBikes from './pages/bike/ListBikes.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },

  {
    path: "/hello",
    element: <div>Hello world!</div>,
  },
  {
    path: "/new",
    element: <NewBike />,
  },
  {
    path: "/list",
    element: <ListBikes />,
  },
  {
    path: "/bike/:id",
    element: <Bike />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);