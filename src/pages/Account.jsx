import { useState } from "react";
import { Form } from "react-router";
import { changePassword } from "../utils/userAPI";

function AccountPage() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  function handleOnClick() {
    setIsChangingPassword((state) => !state);
  }

  return (
    <div>
      <h1>Account</h1>
      {isChangingPassword ? (
        <Form method="post">
          <div>
            <label htmlFor="oldPassword">Old Password</label>
            <input name="oldPassword" type="password" />
            <label htmlFor="newPassword">New Password</label>
            <input name="newPassword" type="password" />
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input name="confirmNewPassword" type="password" />
          </div>
        </Form>
      ) : undefined}
      <button
        onClick={handleOnClick}
        type={isChangingPassword ? "submit" : "button"}
      >
        {isChangingPassword ? "Submit" : "Change Password"}
      </button>
      {isChangingPassword ? (
        <button onClick={handleOnClick} type="button">
          Cancel
        </button>
      ) : undefined}
    </div>
  );
}

export default AccountPage;

export async function action({ request }) {
  const data = await request.formData();

  const oldPassword = data.get("oldPassword");
  const newPassword = data.get("newPassword");

  const passwords = {
    oldPassword,
    newPassword,
  };

  try {
    await changePassword(passwords);
  } catch (error) {
    throw new Response(
      JSON.stringify({ message: "Could not change password." }),
      {
        status: 400,
      },
    );
  }
}
