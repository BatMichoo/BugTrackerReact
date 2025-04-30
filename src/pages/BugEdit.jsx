import { redirect, useLoaderData } from "react-router";
import { loader as bugLoader } from "./Bug";
import { loader as userLoader } from "./CreateBug";
import classes from "../components/bugs/Bug.module.css";
import BugEditForm from "../components/forms/BugEditForm";
import { updateBug } from "../utils/bugAPI";

const BugEditPage = () => {
  const loaderData = useLoaderData();

  return (
    <div className={classes["bug-container"]}>
      <BugEditForm {...loaderData} />
    </div>
  );
};

export default BugEditPage;

export const loader = async ({ params }) => {
  const bug = await bugLoader({ params });

  const availableUsers = await userLoader();

  return {
    bug,
    availableUsers,
  };
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const id = params.bugId;

  const bugToBeUpdated = {
    id,
    priority: formData.get("Priority"),
    status: formData.get("Status"),
    assigneeId: formData.get("AssignedTo"),
    title: formData.get("Title"),
    description: formData.get("Description"),
  };

  try {
    const newBug = await updateBug(bugToBeUpdated);

    return redirect(`../${newBug.id}`);
  } catch (error) {
    throw new Response(JSON.stringify({ message: "Could not reach server." }), {
      status: 500,
    });
  }
};
