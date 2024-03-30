import ReactPaginate from "react-paginate";

import React from 'react'

const paginate = ({ currentPage , pages}) => {

  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={pages}
        pageRangeDisplayed={5}
        pageCount={currentPage ? currentPage : 1}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName="page-num"
        previousLinkClassName="page-next"
        nextLinkClassName="page-next"
        activeLinkClassName="active"
      />
    </div>
  )
}

export default paginate
