import { useState } from "react";
import { changePassword } from "../../utils/userAPI";
import classes from "./ChangePasswordForm.module.css";

export default function ChangePasswordForm({ onCleanUp }) {
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    const form = document.getElementById("password-form");
    const data = new FormData(form);

    const oldPassword = data.get("oldPassword");
    const newPassword = data.get("newPassword");

    const passwords = {
      oldPassword,
      newPassword,
    };

    try {
      const response = await changePassword(passwords);

      if (response.ok) {
        onCleanUp();
      } else {
        setError(response);
      }
    } catch (error) {
      throw new Response(JSON.stringify({ message: error.message }), {
        status: error.statusCode,
      });
    }
  }
  return (
    <form
      id="password-form"
      onSubmit={onSubmit}
      className={classes["change-form"]}
    >
      <div>
        <p>
          <label htmlFor="oldPassword">Old Password</label>
          <input name="oldPassword" type="password" id="oldPassword" />
        </p>
        <p>
          <label htmlFor="newPassword">New Password</label>
          <input name="newPassword" type="password" id="newPassword" />
        </p>
        <p>
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            name="confirmNewPassword"
            type="password"
            id="confirmNewPassword"
          />
        </p>
        {error ? <div>{error}</div> : undefined}
      </div>
      <button type="submit">Submit</button>
      <button onClick={onCleanUp} type="button">
        Cancel
      </button>
    </form>
  );
}
