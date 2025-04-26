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
import BugEditPage from "./pages/BugEdit.jsx";
import ErrorPage from "./pages/Error.jsx";
import LogoutPage, { action as logoutAction } from "./pages/Logout.jsx";
import RegisterPage, { action as registerAction } from "./pages/Register.jsx";

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
        path: "register",
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: "logout",
        element: <LogoutPage />,
        action: logoutAction,
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
                children: [
                  {
                    path: "edit",
                    element: <BugEditPage />,
                    loader: bugLoader,
                  },
                ],
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
