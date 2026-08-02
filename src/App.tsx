import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Header } from "./components/Header/Header";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/home",
      element: <Home></Home>,
    },
  ]);
  return (
    <>
      <Header></Header>
      <div className="content">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
