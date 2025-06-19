import {
  Link,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router";
import classes from "./BugResultTable.module.css";
import "../buttons/button.css";
import { deleteBug } from "../../utils/bugAPI";
import PageSizeInput from "../inputs/PageSizeInput";
import { PRIORITY_COLORS, STATUS_COLORS } from "../../utils/colors.js";
import { PRIORITY_MAPPING, STATUS_MAPPING } from "../../utils/bugEnums.js";
import { getPermissions } from "../../utils/auth.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import Modal from "../modals/Modal.jsx";

const MODAL_CONTENT = {
  confirmed: <p>Deleting...</p>,
  success: (
    <>
      <h3>Delete confirmed!</h3>
      <p>
        <FontAwesomeIcon
          icon="info"
          color="blue"
          style={{ marginRight: "0.5em" }}
        />
        Successfully deleted bug!
      </p>
    </>
  ),
  failed: <p>Failed to delete bug!</p>,
};

function getStartingItemCount(pageInfo) {
  if (pageInfo.currentPage == 0) {
    return 0;
  }

  const startingItemCount =
    1 + (pageInfo.currentPage - 1) * pageInfo.elementsPerPage;

  return startingItemCount;
}

function getItemsOnPageCount(pageInfo) {
  if (pageInfo.totalElementCount == 0) {
    return 0;
  }

  const lastItemNumber = pageInfo.currentPage * pageInfo.elementsPerPage;

  if (pageInfo.totalElementCount < pageInfo.elementsPerPage) {
    return pageInfo.totalElementCount;
  } else if (lastItemNumber > pageInfo.totalElementCount) {
    return pageInfo.totalElementCount;
  }

  return lastItemNumber;
}

const BugResultTable = ({ resultData }) => {
  const startingItemCount = getStartingItemCount(resultData?.pageInfo);
  const itemsOnPage = getItemsOnPageCount(resultData?.pageInfo);

  const navigate = useNavigate();
  const navigation = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  const canDelete = getPermissions().find((p) => p == "Delete");

  const modalRef = useRef();

  // const [bugs, setBugs] = useState(resultData?.items);
  const [bugToDeleteId, setBugToDeleteId] = useState(null);

  useEffect(() => {
    if (bugToDeleteId !== null) {
      if (modalRef.current) {
        modalRef.current.open();
      }
    }
  }, [bugToDeleteId]);

  function changePageOnClick(pageNumber) {
    setSearchParams((prevState) => {
      const newParams = new URLSearchParams(prevState);

      newParams.set("pageInput", pageNumber);

      return newParams;
    });
  }

  function updatePageSizeOnChange(event) {
    const pageSize = event.target.value;

    if (searchParams.get("pageSizeInput") !== pageSize) {
      setSearchParams((prevState) => {
        const newParams = new URLSearchParams(prevState);

        newParams.set("pageSizeInput", pageSize);

        return newParams;
      });
    }
  }

  return (
    <>
      {bugToDeleteId !== null ? (
        <Modal
          ref={modalRef}
          action={async () => await deleteBug(bugToDeleteId)}
          onSuccess={() =>
            // setBugs((prevB) => {
            //   const newBugs = prevB.filter((b) => b.id !== bugToDeleteId);
            //   return newBugs;
            // })
            (resultData.items = resultData.items.filter(
              (b) => b.id !== bugToDeleteId,
            ))
          }
          cleanUp={() => setBugToDeleteId(null)}
          displayContent={MODAL_CONTENT}
        />
      ) : null}
      <table className={classes["item-table"]}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Title</th>
            <th>Created By</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resultData && resultData.pageInfo.totalElementCount == 0 ? (
            <tr>
              <td colSpan={7}>
                {navigation.state == "loading" ? (
                  <FontAwesomeIcon icon="spinner" spinPulse />
                ) : (
                  "No Results."
                )}
              </td>
            </tr>
          ) : (
            resultData?.items &&
            resultData.items.map((b) => {
              return (
                <tr
                  key={b.id}
                  className={classes["item-row"]}
                  onDoubleClick={() => navigate(`bugs/${b.id}`)}
                >
                  <td>{b.id}</td>
                  <td>
                    <span
                      className={classes.badge}
                      style={{
                        backgroundColor:
                          PRIORITY_COLORS[PRIORITY_MAPPING[b.priority]],
                      }}
                    >
                      {PRIORITY_MAPPING[b.priority]}
                    </span>
                  </td>
                  <td>
                    <span
                      className={classes.badge}
                      style={{
                        backgroundColor:
                          STATUS_COLORS[STATUS_MAPPING[b.status]],
                      }}
                    >
                      {STATUS_MAPPING[b.status]}
                    </span>
                  </td>
                  <td>{b.title}</td>
                  <td>{b.createdBy.name}</td>
                  <td>{b.assignedTo?.name}</td>
                  <td className={classes["actions-container"]}>
                    <Link to={"bugs/" + b.id}>
                      <FontAwesomeIcon icon="magnifying-glass" />
                    </Link>
                    <Link
                      to={"bugs/" + b.id + "/edit"}
                      className={classes["edit-btn"]}
                    >
                      <FontAwesomeIcon icon="pen" />
                    </Link>
                    {canDelete ? (
                      <button
                        className={classes["delete-btn"]}
                        onClick={() => setBugToDeleteId(b.id)}
                      >
                        <FontAwesomeIcon icon="trash" />
                      </button>
                    ) : undefined}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={7}>
              <div className={classes["footer-content"]}>
                <span>
                  {startingItemCount + " - " + itemsOnPage} /{" "}
                  {resultData.pageInfo.totalElementCount}
                </span>
                <span>
                  Per page:{" "}
                  <PageSizeInput
                    selectedValue={resultData.pageInfo.elementsPerPage}
                    onChange={updatePageSizeOnChange}
                  />
                </span>
                <span>
                  {resultData?.pageInfo?.hasPrevious ? (
                    <span
                      className={classes["page-control"]}
                      onClick={() =>
                        changePageOnClick(resultData.pageInfo.currentPage - 1)
                      }
                    >
                      <FontAwesomeIcon icon="chevron-left" size="sm" />
                    </span>
                  ) : undefined}
                  <span>{resultData.pageInfo.currentPage}</span>
                  {" / "}
                  <span>{resultData.pageInfo.pageCount}</span>
                  {resultData?.pageInfo?.hasNext ? (
                    <span
                      className={classes["page-control"]}
                      onClick={() =>
                        changePageOnClick(resultData.pageInfo.currentPage + 1)
                      }
                    >
                      <FontAwesomeIcon icon="chevron-right" size="sm" />
                    </span>
                  ) : undefined}
                </span>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default BugResultTable;
