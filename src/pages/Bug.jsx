import { useLoaderData } from "react-router";
import { getBug } from "../utils/bugAPI";
import classes from "../components/bugs/Bug.module.css";
import BugDetails from "../components/bugs/BugDetails";
import BugEditForm from "../components/forms/BugEditForm";
import BugButtons from "../components/bugs/BugButtons";

const BugDetailsPage = () => {
  const bug = useLoaderData();

  return (
    <div className={classes["bug-container"]}>
      <BugDetails bug={bug} />
    </div>
  );
};

export default BugDetailsPage;

export const loader = async ({ params }) => {
  const bugId = params.bugId;
  const isFullyIncluded = true;

  if (bugId) {
    const bug = await getBug(bugId, isFullyIncluded);

    return bug;
  }
};
