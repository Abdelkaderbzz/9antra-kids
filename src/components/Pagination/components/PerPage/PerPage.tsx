import { Select } from 'antd'
import { useState } from 'react'
import { NavigateOptions, URLSearchParamsInit } from 'react-router-dom'

interface perPageProps {
  searchParams: URLSearchParams
  setSearchParams: (
    nextInit?: URLSearchParamsInit | ((prev: URLSearchParams) => URLSearchParamsInit) | undefined,
    navigateOpts?: NavigateOptions | undefined,
  ) => void
}
const PerPage = ({ setSearchParams, searchParams }: perPageProps) => {
  const [itemPerPage, setItemPerPage] = useState(searchParams.get('pageSize') || '10')
  const perPages = ['5', '10', '24', '48', '100']
  const onPageSizeChange = (pageSize: string) => {
    setSearchParams((prevParams) => {
      const updatedParams = {
        ...Object.fromEntries(prevParams),
        page: '1',
        pageSize,
      }
      return updatedParams
    })
    setItemPerPage(pageSize)
  }

  return (
    <div className="per-page-contianer">
      <Select
        style={{ width: 90 }}
        value={itemPerPage}
        onChange={onPageSizeChange}
        options={perPages.map((size: string) => ({ label: size, value: size }))}
      />
    </div>
  )
}

export default PerPage
