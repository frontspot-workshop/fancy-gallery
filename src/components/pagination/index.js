import React from "react";
import './pagination.css'
import getPaginationClasses from "./get-pagination-classes";

const Pagination = props => {
    const {lastPage, handlePaginationClick, currentPage} = props;
    const firstPage = 1;
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
        rightStepClass
    } = getPaginationClasses(firstPage, currentPage, lastPage, pageElementClass)


    let pageElements = [
        <div id="left-step" key="left-step" className={leftStepClass}
             onClick={() => handlePaginationClick(previousPage)}>{"<"}</div>,

        <div id="first-page" key="first-page" className={firstPageClass}
             onClick={() => handlePaginationClick(firstPage)}>{firstPage}</div>,

        <div id="left-gap" key="left-gap" className={leftGapClass}
             onClick={() => handlePaginationClick(previousPage - 1)}>{"..."}</div>,

        <div id="previous-page" key="previous-page" className={previousPageClass}
             onClick={() => handlePaginationClick(previousPage)}>{previousPage}</div>,

        <div id="current-page" key="current-page" className={currentPageClass}
             onClick={() => handlePaginationClick(currentPage)}>{currentPage}</div>,

        <div id="next-page" key="next-page" className={nextPageClass}
             onClick={() => handlePaginationClick(nextPage)}>{nextPage}</div>,

        <div id="right-gap" key="right-gap" className={rightGapClass}
             onClick={() => handlePaginationClick(nextPage + 1)}>{"..."}</div>,

        <div id="last-page" key="last-page" className={lastPageClass}
             onClick={() => handlePaginationClick(lastPage)}>{lastPage}</div>,

        <div id="right-step" key="right-step" className={rightStepClass}
             onClick={() => handlePaginationClick(nextPage)}>{">"}</div>
    ];

    return (
        <div className="pagination-block">
            {pageElements}
        </div>
    )
}

export default Pagination;