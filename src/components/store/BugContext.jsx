import { createContext, useEffect, useState, use } from "react";
import { AuthContext } from "./AuthContext";

const serverEndpoint = "https://localhost:7272/bugs";

export const BugContext = createContext({
  bugs: {
    filters: null,
    pageInfo: {
      currentPage: 1,
      elementsPerPage: 25,
      pageCount: 1,
      hasPrevious: false,
      hasNext: false,
      totalElementCount: 0,
    },
    items: null,
    sortings: null,
  },
  getBugs: () => {},
});

export const BugContextProvider = ({ children }) => {
  const { authToken } = use(AuthContext);
  const [bugs, setBugs] = useState({});

  useEffect(() => {
    async function loadBugs() {
      const response = await fetch(serverEndpoint, {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      });

      if (response.ok) {
        const bugs = await response.json();
        setBugs(bugs);
      }
    }

    loadBugs();
  }, []);

  const contextValue = {
    bugs: bugs,
    getBugs: () => {},
  };

  return <BugContext value={contextValue}>{children}</BugContext>;
};
