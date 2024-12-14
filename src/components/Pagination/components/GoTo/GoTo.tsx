import { HiArrowRight } from 'react-icons/hi'
import { useState } from 'react'
import { NavigateOptions, URLSearchParamsInit } from 'react-router-dom'
interface GoToProps {
  currentPage: number
  totalPages: number
  setSearchParams: (
    nextInit?: URLSearchParamsInit | ((prev: URLSearchParams) => URLSearchParamsInit) | undefined,
    navigateOpts?: NavigateOptions | undefined,
  ) => void
}
const GoTo = ({ setSearchParams, currentPage, totalPages }: GoToProps) => {
  const [pageToGo, setPageToGo] = useState(currentPage)
  const handleGoTo = () => {
    if (pageToGo <= totalPages)
      setSearchParams((prevParams) => {
        const updatedParams = {
          ...Object.fromEntries(prevParams),
          page: String(pageToGo),
        }
        return updatedParams
      })
  }
  return (
    <div className="pagination-go-to">
      <span>Go to</span>
      <input
        max={totalPages}
        min={1}
        value={pageToGo}
        onChange={(e) => setPageToGo(Number(e.target.value))}
        type="number"
      />
      <HiArrowRight onClick={() => handleGoTo()} />
    </div>
  )
}

export default GoTo
