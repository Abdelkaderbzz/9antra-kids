import { DebounceInput } from 'react-debounce-input'

import { BsSortUp } from 'react-icons/bs'
import { IoFilterSharp, IoTodayOutline } from 'react-icons/io5'
import { FiFilter } from 'react-icons/fi'

const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  const searchValue = e.target.value
  console.log(searchValue)
}
const ViewHeaderSearchFilters = () => {
  return (
    <div className="header_search_filters">
      <DebounceInput
        placeholder={'Search...'}
        className="header_search_filters_input"
        minLength={0}
        debounceTimeout={500}
        onChange={handleSearch}
      />
      <div className="header_search_filters_btns">
        <button className="header_search_filters_btn">
          <IoFilterSharp />
          <span>statuses</span>
        </button>
        <button className="header_search_filters_btn">
          <IoTodayOutline />
          <span>today</span>
        </button>
        <button className="header_search_filters_btn">
          <BsSortUp />
          <span>sort</span>
        </button>
        <button className="header_search_filters_btn">
          <FiFilter />
          <span>filters</span>
        </button>
      </div>
    </div>
  )
}

export default ViewHeaderSearchFilters
