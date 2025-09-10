import { useEffect, useRef, useState } from "react";
import Dialog from "../components/modals/Dialog";
import ChangePasswordForm from "../components/forms/ChangePasswordForm";
import EditSearchesForm from "../components/forms/EditSearchesForm";
import { getRoles } from "../utils/auth";

function AccountPage() {
  const [requiredAction, setRequiredAction] = useState(undefined);
  const dialogRef = useRef();

  const hasElevatedAccess =
    getRoles().filter((r) => r == "Manager" || r == "Admin").length > 0;

  let dialogContent;

  switch (requiredAction) {
    case "password":
      dialogContent = (
        <ChangePasswordForm onCleanUp={() => setRequiredAction(undefined)} />
      );
      break;
    case "searches":
      dialogContent = (
        <EditSearchesForm onCleanUp={() => setRequiredAction(undefined)} />
      );
      break;
    default:
      dialogContent = undefined;
      break;
  }

  useEffect(() => {
    if (requiredAction) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [requiredAction]);

  return (
    <div>
      <Dialog ref={dialogRef}>{dialogContent}</Dialog>
      <h1>Account</h1>
      {hasElevatedAccess ? <div>Admin panel</div> : undefined}
      <div>
        <button onClick={() => setRequiredAction("password")} type="button">
          Change Password
        </button>
        {/* <button onClick={() => setRequiredAction("searches")} type="button"> */}
        {/*   Edit saved Searches */}
        {/* </button> */}
      </div>
    </div>
  );
}

export default AccountPage;

// export async function action({ request }) {
//   const data = await request.formData();
//
//   const oldPassword = data.get("oldPassword");
//   const newPassword = data.get("newPassword");
//
//   const passwords = {
//     oldPassword,
//     newPassword,
//   };
//
//   try {
//     await changePassword(passwords);
//   } catch (error) {
//     throw new Response(
//       JSON.stringify({ message: "Could not change password." }),
//       {
//         status: 400,
//       },
//     );
//   }
// }
