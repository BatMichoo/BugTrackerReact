import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/RootLayout.jsx";
import HomePage from "./pages/Home.jsx";
import LoginPage, { action as loginAction } from "./pages/Login.jsx";
import WorkflowPage, { loader as workflowLoader } from "./pages/Workflow.jsx";
import BugDetailsPage from "./pages/BugDetails.jsx";
import CreateBugPage from "./pages/CreateBug.jsx";
import ErrorPage from "./pages/Error.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
        path: "workflow",
        children: [
          {
            index: true,
            element: <WorkflowPage />,
            loader: workflowLoader,
          },
          {
            path: "bugs/:bugId",
            element: <BugDetailsPage />,
          },
          {
            path: "bugs/new",
            element: <CreateBugPage />,
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
