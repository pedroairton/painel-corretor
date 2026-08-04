import "./App.scss";
import { createBrowserRouter, Navigate, redirect, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Layout } from "./components/Layout/Layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/",
      element: <Layout/>,
      loader: async () => {
        // temporario
        const isAuth = true
        if(!isAuth){
          return redirect('/login')
        }
        return null
      },
      children: [
        {
          index: true,
          element: <Navigate to="/home" replace={true}></Navigate>,
        },
        {
          path: "/home",
          element: <Home></Home>,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
