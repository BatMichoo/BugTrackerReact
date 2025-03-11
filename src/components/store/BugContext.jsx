import { createContext, useEffect, useState } from "react";

const serverEndpoint = "https://localhost:7272/bugs";
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1MDYyZjFlYy01NjU5LTRkOGYtYWJlNy0yMTUyMWIwZGUyYTUiLCJzdWIiOiJmOWY2YzNkOC1lOWNhLTQ1ZjEtYmQ5OS04NGYyODNmMDIyODUiLCJ1bmlxdWVfbmFtZSI6InVzZXIxMjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQXogVGkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiTWFuYWdlciIsIlVzZXIiXSwiZXhwIjoxNzQxNjg5OTc3LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjcyIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzA5NCJ9.WjD3bGYdfZjuJltmqR2ISFgS9iRe9bLtR3Hp1tj8cK4";

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

  return (
    <BugContext.Provider value={contextValue}>{children}</BugContext.Provider>
  );
};
