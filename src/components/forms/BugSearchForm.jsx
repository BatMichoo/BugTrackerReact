import AssignedToInput from "../inputs/AssignedToInput.jsx";
import CreatedOnInput from "../inputs/CreatedOnInput.jsx";
import PrioritySeachInput from "../inputs/PriorityInput.jsx";
import SearchBugIdInput from "../inputs/SearchBugIdInput.jsx";
import StatusInput from "../inputs/StatusInput.jsx";
import TitleInput from "../inputs/TitleInput.jsx";
import DateFilterInput from "../inputs/DateFilterInput.jsx";
import classes from "../forms/BugSearchForm.module.css";
import { Form, useSubmit } from "react-router";

const BugSearchForm = ({ filters, users }) => {
  const submit = useSubmit();

  function handleReset() {
    const emptyFormData = new FormData();

    submit(emptyFormData);
  }

  const dateParts = filters.createdOn?.split("_");
  const createdOn = dateParts ? dateParts[0] : undefined;
  const dateFilter = dateParts ? dateParts[1] : undefined;

  return (
    <Form method="POST">
      <ul className={classes["search-input-container"]}>
        <SearchBugIdInput selectedValue={filters.id ?? ""} />
        <PrioritySeachInput selectedValue={filters.priority ?? ""} />
        <StatusInput selectedValue={filters.status ?? ""} />
        <AssignedToInput
          availableValues={users}
          selectedValue={filters.assignedTo ?? ""}
        />
        <TitleInput selectedValue={filters.title ?? ""} />
        <CreatedOnInput selectedValue={createdOn} />
        <DateFilterInput selectedValue={dateFilter} />
      </ul>
      <div className="btn-container">
        <button className="submit-btn">Search</button>
        <button type="reset" className="submit-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </Form>
  );
};

export default BugSearchForm;
