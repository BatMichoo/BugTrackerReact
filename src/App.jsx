import { AuthContextProvider } from "./components/store/AuthContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/RootLayout.jsx";
import HomePage from "./pages/Home.jsx";
import LoginPage from "./pages/Login.jsx";
import WorkflowPage from "./pages/Workflow.jsx";
import BugDetailsPage from "./pages/BugDetails.jsx";
import CreateBugPage from "./pages/CreateBug.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "workflow",
        children: [
          {
            index: true,
            element: <WorkflowPage />,
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
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}

export default App;
