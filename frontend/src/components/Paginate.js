import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  categoryData = '',
  params,
  history
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const newPages = [...Array(pages).keys()]
  const size = 3
  const newSizePages = newPages.slice(0, size)


  const nextHandler = () => {
    if (newPages.length == currentPage) {
      return
    }
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    console.log(currentPage)
  }

  const previousHandler = () => {
    // let newpreviousPage = currentPage - 1
    // setCurrentPage(newpreviousPage)
    // setPreviousPage(newpreviousPage)
    // console.log(previousPage)
    let newCurrentPage = currentPage - 1
    if (newCurrentPage === 1) {
      return
    }
  }
  return (
    pages > 1 && ( // <Pagination className="pagination responsive">
      //   {[...Array(pages).keys()].map((x) => (
      //     <LinkContainer
      //       key={x + 1}
      //       to={
      //         !isAdmin
      //           ? keyword
      //             ? `/search/${keyword}/page/${x + 1}`
      //             : categoryData
      //             ? `/category/${categoryData}/page/${x + 1}`
      //             : `/page/${x + 1}`
      //           : `/admin/productlist/${x + 1}`
      //       }>
      //       <Pagination.Item active={x + 1 === page}>Next</Pagination.Item>
      //     </LinkContainer>
      //   ))}
      // </Pagination>

      <nav aria-label="Page navigation example " class="table-responsive mb-2">
        <ul class="pagination-sm pagination paginationSmallMobile">
          {[...Array(pages).keys()].map((x) => (
            <LinkContainer
              key={x + 1}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : categoryData
                      ? `/category/${categoryData}/page/${x + 1}`
                      : `/page/${x + 1}`
                  : `/admin/productlist/${x + 1}`
              }>
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          ))}
        </ul>
      </nav>

      // <nav aria-label="Page navigation example">
      //   <ul class="pagination justify-content-center">
      //     <li class="page-item">
      //       <a
      //         class="page-link"
      //         href="#"
      //         tabindex="-1"
      //         onClick={previousHandler}>
      //         Previous
      //       </a>
      //     </li>
      //     {newSizePages.map((x) => (
      //       <li class="page-item">
      //         <a class="page-link" href="#">
      //           {x + 1}
      //         </a>
      //       </li>
      //     ))}
      //     <li class="page-item">
      //       <Link to={`/page/${currentPage}`} class="page-link" onClick={nextHandler}>
      //         Next
      //       </Link>
      //     </li>
      //   </ul>
      // </nav>
    )
  )
}

export default Paginate
