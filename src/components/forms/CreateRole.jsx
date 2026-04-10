import { createRole } from "../../utils/userAPI";
import { useRoles } from "../stores/useContexts";

// TODO: Add permissions

export default function CreateRole({ onCleanUp }) {
  const { refresh } = useRoles();
  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const roleName = data.get("roleName");

    try {
      const role = await createRole(roleName);
      refresh();
      onCleanUp();

      if (role) {
        // onCleanUp();
      } else {
        // setError(response);
      }
    } catch (error) {
      console.log(JSON.stringify({ message: error.message }), {
        status: error.statusCode,
      });
    }
  }
  return (
    <form method="POST" onSubmit={onSubmit}>
      <input type="text" name="roleName" />
      <button type="submit">Create</button>
      <button type="button" onClick={onCleanUp}>
        Cancel
      </button>
    </form>
  );
}
