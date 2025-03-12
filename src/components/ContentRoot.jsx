import BugSearchForm from "./forms/BugSearchForm.jsx";
import { AuthContext } from "./store/AuthContext.jsx";
import { BugContextProvider } from "./store/BugContext.jsx";
import BugResultTable from "./tables/BugResultTable.jsx";
import { use } from "react";

const ContentRoot = () => {
  const { isLoggedIn } = use(AuthContext);

  return (
    <div id="content-root">
      {isLoggedIn ? (
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
      ) : (
        <div>Please Log In</div>
      )}
    </div>
  );
};

export default ContentRoot;
