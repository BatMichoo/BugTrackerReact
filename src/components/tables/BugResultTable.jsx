import { Await, Link, useNavigate, useSearchParams } from "react-router";
import classes from "./BugResultTable.module.css";
import "../buttons/button.css";
import { deleteBug } from "../../utils/bugAPI";
import PageSizeInput from "../inputs/PageSizeInput";
import { PRIORITY_COLORS, STATUS_COLORS } from "../../utils/colors.js";
import { PRIORITY_MAPPING, STATUS_MAPPING } from "../../utils/bugEnums.js";
import { getPermissions } from "../../utils/auth.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef, Suspense } from "react";
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
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const canDelete = getPermissions().find((p) => p == "Delete");

  const modalRef = useRef();

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
          (resultData.items = resultData.items.filter(
            (b) => b.id !== bugToDeleteId,
          ))
          }
          cleanUp={() => setBugToDeleteId(null)}
          displayContent={MODAL_CONTENT}
        />
      ) : null}
      <table className={classes["item-table"] + " section"}>
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
        <Suspense
          fallback={
            <tbody>
              <tr>
                <td colSpan={7} style={{ padding: "1em" }}>
                  <FontAwesomeIcon
                    icon="spinner"
                    spinPulse
                    size="3x"
                    color="lightblue"
                  />
                </td>
              </tr>
            </tbody>
          }
        >
          <Await resolve={resultData}>
            {(resolvedData) => {
              return resolvedData &&
                resolvedData.pageInfo.totalElementCount == 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={7}>"No Results." </td>
                  </tr>
                </tbody>
              ) : (
                <>
                  <tbody>
                    {resolvedData?.items &&
                      resolvedData.items.map((b) => {
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
                                    PRIORITY_COLORS[
                                    PRIORITY_MAPPING[b.priority]
                                    ],
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
                              <Link to={"bugs/" + b.id} className="button">
                                <FontAwesomeIcon icon="magnifying-glass" />
                              </Link>
                              <Link
                                to={"bugs/" + b.id + "/edit"}
                                className={classes["edit-btn"] + " button"}
                              >
                                <FontAwesomeIcon icon="pen" />
                              </Link>
                              {canDelete ? (
                                <button
                                  className={"button " + classes["delete-btn"]}
                                  onClick={() => setBugToDeleteId(b.id)}
                                >
                                  <FontAwesomeIcon icon="trash" />
                                </button>
                              ) : undefined}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={7}>
                        <div className={classes["footer-content"]}>
                          <span>
                            {getStartingItemCount(resolvedData.pageInfo) +
                              " - " +
                              getItemsOnPageCount(resolvedData.pageInfo)}{" "}
                            / {resolvedData.pageInfo.totalElementCount}
                          </span>
                          <span>
                            Per page:{" "}
                            <PageSizeInput
                              selectedValue={
                                resolvedData.pageInfo.elementsPerPage
                              }
                              onChange={updatePageSizeOnChange}
                            />
                          </span>
                          <span>
                            {resolvedData?.pageInfo?.hasPrevious ? (
                              <span
                                className={classes["page-control"]}
                                onClick={() =>
                                  changePageOnClick(
                                    resultData.pageInfo.currentPage - 1,
                                  )
                                }
                              >
                                <FontAwesomeIcon
                                  icon="chevron-left"
                                  size="sm"
                                />
                              </span>
                            ) : undefined}
                            <span>{resolvedData.pageInfo.currentPage}</span>
                            {" / "}
                            <span>{resolvedData.pageInfo.pageCount}</span>
                            {resolvedData?.pageInfo?.hasNext ? (
                              <span
                                className={classes["page-control"]}
                                onClick={() =>
                                  changePageOnClick(
                                    resolvedData.pageInfo.currentPage + 1,
                                  )
                                }
                              >
                                <FontAwesomeIcon
                                  icon="chevron-right"
                                  size="sm"
                                />
                              </span>
                            ) : undefined}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </>
              );
            }}
          </Await>
        </Suspense>
      </table>
    </>
  );
};

export default BugResultTable;
