import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import EditPost from "./components/EditPost";
import Notfound from "./components/Notfound";
import AddPost from "./components/AddPost";
import Profile from "./components/Profile";
import UserContextProvider from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PostDetails from "./components/PostDetails";

let routing = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { index: true, element: <Register /> },
      { path: "/register", element: <Register /> },
      {
        path: "/editPost/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <EditPost />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-post",
        element: (
          <ProtectedRoute>
            {" "}
            <AddPost />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            {" "}
            <Profile />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/postDetails/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <PostDetails />{" "}
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={routing} />
      </UserContextProvider>
    </>
  );
}

export default App;
