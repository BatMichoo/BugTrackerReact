import { Form, useNavigate } from "react-router";
import PrioritySeachInput from "../inputs/PriorityInput";
import AssignedToInput from "../inputs/AssignedToInput";
import TitleInput from "../inputs/TitleInput";
import StatusInput from "../inputs/StatusInput";
import BugButtons from "../bugs/BugButtons";
import classes from "./BugEditForm.module.css";

const BugEditForm = ({ bug, availableUsers }) => {
  const navigate = useNavigate();

  function handleOnCancel() {
    navigate(`../${bug.id}`);
  }
  return (
    <Form method="PUT" className={classes["edit-form"]}>
      <h1>Edit bug with Id: {bug.id}</h1>
      <div>
        <TitleInput selectedValue={bug.title} />
        <PrioritySeachInput selectedValue={bug.priority} />
        <StatusInput selectedValue={bug.status} />
        <AssignedToInput
          availableValues={availableUsers}
          selectedValue={bug.assignedTo?.id}
        />
        <textarea
          name="Description"
          rows={20}
          cols={100}
          defaultValue={bug.description}
        />
      </div>
      <BugButtons isEditing={true} onCancel={handleOnCancel} />
    </Form>
  );
};

export default BugEditForm;
