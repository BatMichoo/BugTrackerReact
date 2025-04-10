import BugSearchForm from "../components/forms/BugSearchForm.jsx";
import { Link, useLoaderData } from "react-router";
import BugResultTable from "../components/tables/BugResultTable.jsx";
import { getBugs } from "../utils/backendAPI.js";

const WorkflowPage = () => {
  const bugResult = useLoaderData();
  return (
    <div className="work-container">
      <div className="search-container">
        <h2>Search for bugs</h2>
        <BugSearchForm />
      </div>
      <div>
        <Link to="bugs/new" className="create-bug submit-btn">
          Create New
        </Link>
      </div>
      <div className="item-container">
        <BugResultTable resultData={bugResult} />
      </div>
    </div>
  );
};

export default WorkflowPage;

export const loader = async () => {
  const bugResponse = await getBugs();

  return bugResponse;
};
