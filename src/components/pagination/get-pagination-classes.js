const getPaginationClasses = (firstPage, currentPage, lastPage, pageElementClass) => {

    let leftStepClass = pageElementClass;
    let firstPageClass = pageElementClass;
    let leftGapClass = pageElementClass;
    let previousPageClass = pageElementClass;
    let currentPageClass = pageElementClass + "active";
    let nextPageClass = pageElementClass;
    let rightGapClass = pageElementClass;
    let lastPageClass = pageElementClass;
    let rightStepClass = pageElementClass;


    const gapLeap = Math.ceil(lastPage/10.0);
    let rightGapLeap = gapLeap;
    let leftGapLeap = gapLeap;
    if(currentPage + gapLeap + 1 > lastPage){
        rightGapLeap = lastPage - currentPage - 2;
    }
    if(currentPage - gapLeap - 1 < firstPage){
        leftGapLeap = currentPage - firstPage - 2;
    }
    const noPages = typeof lastPage == "undefined" || lastPage === null || lastPage <= 0;

    if (noPages){
        currentPageClass = " hidden";
    }

    if (noPages || currentPage < 2 ) {
        leftStepClass += " hidden";
    }

    if (noPages || currentPage === firstPage ) {
        firstPageClass += " hidden";
    }

    if (noPages || currentPage - firstPage < 3 ) {
        leftGapClass += " hidden";
    }

    if (noPages || currentPage - firstPage < 2) {
        previousPageClass += " hidden";
    }

    if (noPages || lastPage - currentPage < 2) {
        nextPageClass += " hidden";
    }

    if (noPages || lastPage - currentPage <= 2) {
        rightGapClass += " hidden";
    }

    if (noPages || currentPage === lastPage) {
        lastPageClass += " hidden";
        rightStepClass += " hidden";
    }

    return {
        leftStepClass: leftStepClass,
        firstPageClass: firstPageClass,
        leftGapClass: leftGapClass,
        previousPageClass: previousPageClass,
        currentPageClass: currentPageClass,
        nextPageClass: nextPageClass,
        rightGapClass: rightGapClass,
        lastPageClass: lastPageClass,
        rightStepClass: rightStepClass,
        rightGapLeap: rightGapLeap,
        leftGapLeap: leftGapLeap,
    }
}

export default getPaginationClasses;