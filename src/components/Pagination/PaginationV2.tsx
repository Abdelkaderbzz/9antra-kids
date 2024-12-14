import React from 'react'
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'
import GoTo from './components/GoTo/GoTo'
import PerPage from './components/PerPage/PerPage'
import { useSearchParams } from 'react-router-dom'

interface PaginationProps {
  totalItems: number
  itemsPerPage: any
}

const PaginationV2: React.FC<PaginationProps> = ({ totalItems, itemsPerPage }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  itemsPerPage = itemsPerPage || '10'
  let currentPage = Number(searchParams.get('page')) || 1
  let totalPages = Math.ceil(totalItems / Number(itemsPerPage))
  const handleNavigatePage = (isDiff: string) => {
    const validPage = isDiff === 'next' ? currentPage + 1 : currentPage - 1
    setSearchParams((prevParams) => {
      const updatedParams = {
        ...Object.fromEntries(prevParams),
        page: String(Math.min(validPage, totalPages)),
        pageSize: itemsPerPage,
      }
      return updatedParams
    })
  }
  const handlePageChange = (page: number) => {
    setSearchParams((prevParams) => {
      const updatedParams = {
        ...Object.fromEntries(prevParams),
        page: String(page),
        pageSize: String(itemsPerPage),
      }
      return updatedParams
    })
  }
  const formatPageNumber = (pageNumber: number) => {
    return pageNumber < 10 ? `0${pageNumber}` : `${pageNumber}`
  }
  const renderPageNumbers = () => {
    const pageNumbers = []
    const maxPageButtons = 6
    const numPagesToShow = Math.min(maxPageButtons, totalPages)
    const getPageButton = (pageNumber: number) => (
      <button
        key={pageNumber}
        onClick={() => {
          pageNumber !== currentPage && handlePageChange(pageNumber)
        }}
        className={`pagination-button ${currentPage === pageNumber && 'pagination-button-active'}`}
      >
        {formatPageNumber(pageNumber)}
      </button>
    )
    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(getPageButton(i))
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= numPagesToShow - 1; i++) {
          pageNumbers.push(getPageButton(i))
        }
        pageNumbers.push(
          <span key="ellipsis-start" className="pagination-button">
            ...
          </span>,
        )
        pageNumbers.push(getPageButton(totalPages))
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(getPageButton(1))
        pageNumbers.push(
          <span key="ellipsis-end" className="pagination-button">
            ...
          </span>,
        )
        for (let i = totalPages - (numPagesToShow - 2); i <= totalPages; i++) {
          pageNumbers.push(getPageButton(i))
        }
      } else {
        pageNumbers.push(getPageButton(1))
        pageNumbers.push(
          <span key="ellipsis-start" className="pagination-button">
            ...
          </span>,
        )
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(getPageButton(i))
        }
        pageNumbers.push(
          <button key="ellipsis-end" className="pagination-button">
            ...
          </button>,
        )
        pageNumbers.push(getPageButton(totalPages))
      }
    }

    return pageNumbers
  }
  return (
    <div className="pagination-container">
      <MdOutlineKeyboardDoubleArrowLeft
        onClick={() => handlePageChange(1)}
        className="arrow-first-item"
      />
      <div className="sub-pagination">
        <button
          className="prev-next-btns prev-btn"
          onClick={() => handleNavigatePage('prev')}
          disabled={currentPage === 1}
        >
          <BsArrowLeftShort />
          <p>Previous</p>
        </button>
        <div className="pagination-button-page-number">{renderPageNumbers()}</div>
        <button
          className="prev-next-btns next-btn"
          onClick={() => handleNavigatePage('next')}
          disabled={currentPage === totalPages}
        >
          <p>Next</p>
          <BsArrowRightShort />
        </button>
      </div>
      <MdOutlineKeyboardDoubleArrowRight
        onClick={() => handlePageChange(totalPages)}
        className="arrow-last-item"
      />
      <PerPage searchParams={searchParams} setSearchParams={setSearchParams} />
      <GoTo setSearchParams={setSearchParams} totalPages={totalPages} currentPage={currentPage} />
    </div>
  )
}

export default PaginationV2
