import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout, {
  loader as profileLoader,
} from "./components/RootLayout.jsx";
import HomePage from "./pages/Home.jsx";
import LoginPage, { action as loginAction } from "./pages/Login.jsx";
import WorkflowPage, {
  loader as workflowLoader,
  action as workflowAction,
} from "./pages/Workflow.jsx";
import BugDetailsPage, { loader as bugLoader } from "./pages/BugDetails.jsx";
import CreateBugPage, {
  action as createBugAction,
  loader as usersLoader,
} from "./pages/CreateBug.jsx";
import ErrorPage from "./pages/Error.jsx";
import LogoutPage from "./pages/Logout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: profileLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: "logout",
        element: <LogoutPage />,
      },
      {
        path: "workflow",
        children: [
          {
            index: true,
            element: <WorkflowPage />,
            loader: workflowLoader,
            action: workflowAction,
          },
          {
            path: "bugs",
            children: [
              {
                path: ":bugId",
                element: <BugDetailsPage />,
                loader: bugLoader,
              },
              {
                path: "new",
                element: <CreateBugPage />,
                action: createBugAction,
                loader: usersLoader,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
