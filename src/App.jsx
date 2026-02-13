import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthGuard from "./auth/AuthGuard";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CreatePost from "./Pages/CreatePost"; // ✅ ADD THIS

const DefaultRoute = () => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));

  // ✅ If logged in → Dashboard
  if (loginData) {
    return <Navigate to="/Dashboard" replace />;
  }

  // ✅ If not logged in → Register
  return <Navigate to="/Register" replace />;
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultRoute />,
    },
    {
      path: "/Login",
      element: (
        <AuthGuard required={false}>
          <Login />
        </AuthGuard>
      ),
    },
    {
      path: "/Register",
      element: (
        <AuthGuard required={false}>
          <Register />
        </AuthGuard>
      ),
    },
    {
      path: "/Dashboard",
      element: (
        <AuthGuard required={true}>
          <Dashboard />
        </AuthGuard>
      ),
    },

    // ✅ NEW ROUTE ADDED
    {
      path: "/create-post",
      element: (
        <AuthGuard required={true}>
          <CreatePost />
        </AuthGuard>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />

      <ToastContainer
        position="top-right"
        autoClose={1000}
        theme="light"
      />
    </>
  );
}

export default App;