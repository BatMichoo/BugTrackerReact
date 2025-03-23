import BugSearchForm from "../components/forms/BugSearchForm.jsx";
import { BugContextProvider } from "../components/store/BugContext.jsx";
import { Link } from "react-router";
import BugResultTable from "../components/tables/BugResultTable.jsx";

const WorkflowPage = () => {
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
        <BugContextProvider>
          <BugResultTable />
        </BugContextProvider>
      </div>
    </div>
  );
};

export default WorkflowPage;
