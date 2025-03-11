import BugSearchForm from "./forms/BugSearchForm.jsx";
import { BugContextProvider } from "./store/BugContext.jsx";
import BugResultTable from "./tables/BugResultTable.jsx";

const ContentRoot = () => {
  return (
    <div id="content-root">
      <div className="work-container">
        <div className="search-container">
          <h2>Search for bugs</h2>
          <BugSearchForm />
        </div>
        <div>
          <button className="create-bug submit-btn">Create New</button>
        </div>
        <div className="item-container">
          <BugContextProvider>
            <BugResultTable />
          </BugContextProvider>
        </div>
      </div>
    </div>
  );
};

export default ContentRoot;
