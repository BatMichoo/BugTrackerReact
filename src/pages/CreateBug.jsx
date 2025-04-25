import { useLoaderData, redirect } from "react-router";
import CreateBugForm from "../components/forms/CreateBugForm";
import { createBug } from "../utils/bugAPI";
import { getUsers } from "../utils/userAPI";

const CreateBugPage = () => {
  const users = useLoaderData();

  return <CreateBugForm availableUsers={users} />;
};

export default CreateBugPage;

export const loader = async () => {
  const userResponse = await getUsers();

  return userResponse;
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const bugToBeCreated = {
    priority: formData.get("Priority"),
    assignedTo: formData.get("AssignedTo"),
    title: formData.get("Title"),
    description: formData.get("Description"),
  };

  try {
    const newBug = await createBug(bugToBeCreated);

    return redirect(`../${newBug.id}`);
  } catch (error) {
    throw new Response(JSON.stringify({ message: "Could not reach server." }), {
      status: 500,
    });
  }
};
