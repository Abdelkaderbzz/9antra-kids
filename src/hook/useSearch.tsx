import { useCallback, useEffect } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'

type DispatchFunction = (params: Record<string, string>) => void

const useSearch = (dispatchFunction: DispatchFunction, initialParams: URLSearchParamsInit) => {
  const [searchParams, setSearchParams] = useSearchParams(initialParams)
  const pageSize = searchParams.get('pageSize')
  const page = searchParams.get('page')
  const searchValue = searchParams.get('searchValue') || ''
  const stableDispatchFunction = useCallback(dispatchFunction, [])

  useEffect(() => {
    const paramsObject = Object.fromEntries(searchParams.entries()) as Record<string, string>
    stableDispatchFunction(paramsObject)
  }, [searchParams, stableDispatchFunction])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const newParams = new URLSearchParams(searchParams)
    newParams.set('searchValue', value)
    setSearchParams(newParams)
  }

  return { handleSearch, pageSize, page, searchValue, searchParams, setSearchParams }
}

export default useSearch
