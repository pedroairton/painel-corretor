import "./App.scss";
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Layout } from "./components/Layout/Layout";
import { authService } from "./services/auth.service";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
      loader: async () => {
        const token = localStorage.getItem("auth_token");
        if (token) {
          try {
            await authService.me();
            return redirect("/home");
          } catch (error: any) {
            if (error.response.status === 401) {
              console.log("Usuário Não autenticado");
              localStorage.removeItem("auth_token");
            }
          }
        }
        return null;
      }
    },
    {
      path: "/",
      element: <Layout />,
      loader: async () => {
        // temporario
        const token = localStorage.getItem("auth_token");
        if (!token) {
          return redirect("/login");
        }
        try {
          await authService.me();
        } catch (error: any) {
          if (error.response.status === 401) {
            console.log("Usuário Não autenticado");
            localStorage.removeItem("auth_token");
            return redirect("/login");
          }
        }
        return null;
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
