import { DebounceInput } from 'react-debounce-input'
import { ReactComponent as SearchIcon } from '@src/assets/icons/client/Magnifer.svg'
import { ReactComponent as Sort } from '@src/assets/icons/client/Sort.svg'

interface SearchPropsType {
  placeholder: string
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleFilter?: () => void
  minLength?: number
  debounceTimeout?: number
  className?: string
  value?: string
}

const Search = ({
  placeholder = 'Search',
  debounceTimeout = 500,
  handleSearch,
  handleFilter,
  minLength = 0,
  className,
  value,
  ...props
}: SearchPropsType) => {
  return (
    <div className={`list_info ${className}`}>
      <div className="list_info_search_input">
        <SearchIcon className="search_icon_svg" />
        <DebounceInput
          className="search_debounce_input"
          placeholder={placeholder}
          minLength={minLength}
          debounceTimeout={debounceTimeout}
          onChange={handleSearch}
          value={value}
          {...props}
        />
      </div>
      {handleFilter && (
        <button className="list_info_btn_filter" onClick={handleFilter}>
          <Sort />
          <span>Filter</span>
        </button>
      )}
    </div>
  )
}

export default Search
