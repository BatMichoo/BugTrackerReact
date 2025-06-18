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
import BugDetailsPage, { loader as bugLoader } from "./pages/Bug.jsx";
import CreateBugPage, {
  action as createBugAction,
  loader as usersLoader,
} from "./pages/CreateBug.jsx";
import BugEditPage, {
  loader as editLoader,
  action as editAction,
} from "./pages/BugEdit.jsx";
import ErrorPage from "./pages/Error.jsx";
// import LogoutPage, { action as logoutAction } from "./pages/Logout.jsx";
import RegisterPage, { action as registerAction } from "./pages/Register.jsx";
import AccountPage from "./pages/Account.jsx";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBell,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faFloppyDisk,
  faThumbsDown,
  faThumbsUp,
  faPenSquare,
  faArrowRightRotate,
  faTimes,
  faPlus,
  faTrash,
  faPen,
  faMagnifyingGlass,
  faInfo,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

library.add(faBell);
library.add(faPenSquare);
library.add(faCheck);
library.add(faTimes);
library.add(faPlus);
library.add(faTrash);
library.add(faPen);
library.add(faMagnifyingGlass);
library.add(faInfo);
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faFloppyDisk);
library.add(faThumbsUp);
library.add(faThumbsDown);
library.add(faArrowRightRotate);
library.add(faSpinner);

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
        path: "account",
        element: <AccountPage />,
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
                path: ":bugId/edit",
                element: <BugEditPage />,
                loader: editLoader,
                action: editAction,
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
