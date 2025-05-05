import { Form, useNavigate } from "react-router";
import PrioritySeachInput from "../inputs/PriorityInput";
import AssignedToInput from "../inputs/AssignedToInput";
import TitleInput from "../inputs/TitleInput";
import StatusInput from "../inputs/StatusInput";
import BugButtons from "../bugs/BugButtons";

const BugEditForm = ({ bug, availableUsers }) => {
  const navigate = useNavigate();

  function handleOnCancel() {
    navigate(`../${bug.id}`);
  }
  return (
    <Form method="PUT">
      <div>
        <TitleInput title={bug.title} />
        <PrioritySeachInput selectedValue={bug.priority} />
        <StatusInput selectedValue={bug.status} />
        <AssignedToInput
          availableValues={availableUsers}
          selectedValue={bug.assignedTo?.id}
        />
        <textarea
          name="Description"
          rows={10}
          cols={50}
          defaultValue={bug.description}
        />
      </div>
      <BugButtons isEditing={true} onCancel={handleOnCancel} />
    </Form>
  );
};

export default BugEditForm;
