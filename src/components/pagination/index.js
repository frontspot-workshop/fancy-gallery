import React, {Component} from "react";
import './pagination.css'

class Pagination extends Component {

    state = {
        currentButtonId: 1
    }

    handlePaginationClick = (i) => {
        console.log(i)
        this.setState({
            currentButtonId: i,
        })
    }

    render() {
        const {totalPages} = this.props;

        let pageElements = [];

        let pageElementClass;
        for (let i = 1; i <= totalPages; i++) {
            if (this.state.currentButtonId === i) {
                pageElementClass = "page-element active"
            } else {
                pageElementClass = "page-element"
            }
            pageElements.push(
                <div id={i} key={i} className={pageElementClass}
                     onClick={() => this.handlePaginationClick(i)}>{i}</div>
            )
        }

        return (
            <div className="pagination-block">
                {pageElements}
            </div>
        )
    }
}

export default Pagination;