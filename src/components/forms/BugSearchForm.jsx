import Button from "../buttons/Button.jsx";
import AssignedToInput from "../inputs/AssignedToInput.jsx";
import CreatedOnInput from "../inputs/CreatedOnInput.jsx";
import PrioritySeachInput from "../inputs/PriorityInput.jsx";
import SearchBugIdInput from "../inputs/SearchBugIdInput.jsx";
import SelectableInput from "../inputs/SelectableInput.jsx";
import StatusInput from "../inputs/StatusInput.jsx";
import TitleInput from "../inputs/TitleInput.jsx";

import "./bugSearchForm.css";

const DATE_AVAILABLE_FILTERS = [
  "Before",
  "Before Incl",
  "On",
  "After",
  "After Incl",
];

const BugSearchForm = () => {
  return (
    <form method="post">
      <ul className="search-input-container">
        <SearchBugIdInput />
        <PrioritySeachInput selectedValue="" />
        <StatusInput selectedValue="" />
        <AssignedToInput selectedValue="" availableValues={[]} />
        <TitleInput />
        <div className="search-input">
          <CreatedOnInput>
            <SelectableInput
              labelText="Date filters"
              labelTitle="Date Filters"
              name="date-filters"
              selectedValue="On"
              availableValues={DATE_AVAILABLE_FILTERS}
            />
          </CreatedOnInput>
        </div>
      </ul>
      <div className="btn-container">
        <Button type="button" className="submit-btn">
          Search
        </Button>
        <Button className="submit-btn">Reset</Button>
      </div>
    </form>
  );
};

export default BugSearchForm;
