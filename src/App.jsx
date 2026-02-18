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
import CreatePost from "./Pages/CreatePost";
import PostDetails from "./Pages/PostDetails";
import Analytics from "./Pages/Analytics";

const DefaultRoute = () => {
  const loginData = JSON.parse(localStorage.getItem("loginData"));

  if (loginData) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/register" replace />;
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultRoute />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: (
        <AuthGuard required={true}>
          <Dashboard />
        </AuthGuard>
      ),
    },
    {
      path: "/create-post",
      element: (
        <AuthGuard required={true}>
          <CreatePost />
        </AuthGuard>
      ),
    },

    // ✅ correct post details route
    {
      path: "/post/:id",
      element: (
        <AuthGuard required={true}>
          <PostDetails />
        </AuthGuard>
      ),
    },

    {
      path: "/analytics",
      element: (
        <AuthGuard required={true}>
          <Analytics />
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