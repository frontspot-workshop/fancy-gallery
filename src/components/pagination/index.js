import React from "react";
import './pagination.css'
import getPaginationClasses from "./get-pagination-classes";
const FIRST_PAGE = 1;

const Pagination = props => {
    const {totalPages, changeCurrentPage, currentPage} = props;
    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;
    const pageElementClass = "page-element ";
    console.log("Current page ", currentPage)
    const {
        leftStepClass,
        firstPageClass,
        leftGapClass,
        previousPageClass,
        currentPageClass,
        nextPageClass,
        rightGapClass,
        lastPageClass,
        rightStepClass,
        rightGapLeap,
        leftGapLeap,
    } = getPaginationClasses(FIRST_PAGE, currentPage, totalPages, pageElementClass)


    const pageElements = [
        <div id="left-step" key="left-step" className={leftStepClass}
             onClick={() => changeCurrentPage(previousPage)}>{"<"}</div>,

        <div id="first-page" key="first-page" className={firstPageClass}
             onClick={() => changeCurrentPage(FIRST_PAGE)}>{FIRST_PAGE}</div>,

        <div id="left-gap" key="left-gap" className={leftGapClass}
             onClick={() => changeCurrentPage(previousPage - leftGapLeap)}>{"..."}</div>,

        <div id="previous-page" key="previous-page" className={previousPageClass}
             onClick={() => changeCurrentPage(previousPage)}>{previousPage}</div>,

        <div id="current-page" key="current-page" className={currentPageClass}
             onClick={() => changeCurrentPage(currentPage)}>{currentPage}</div>,

        <div id="next-page" key="next-page" className={nextPageClass}
             onClick={() => changeCurrentPage(nextPage)}>{nextPage}</div>,

        <div id="right-gap" key="right-gap" className={rightGapClass}
             onClick={() => changeCurrentPage(nextPage + rightGapLeap)}>{"..."}</div>,

        <div id="last-page" key="last-page" className={lastPageClass}
             onClick={() => changeCurrentPage(totalPages)}>{totalPages}</div>,

        <div id="right-step" key="right-step" className={rightStepClass}
             onClick={() => changeCurrentPage(nextPage)}>{">"}</div>
    ];

    return (
        <div className="pagination-block">
            {pageElements}
        </div>
    )
}

export default Pagination;