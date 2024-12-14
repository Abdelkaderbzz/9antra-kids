import { getAllClient } from '@store/slices/clientSlice/clientThunk'

import TableCaption from '@src/components/TableInfo/TableCaption/TableCaption'

import PaginationV2 from '@src/components/Pagination/PaginationV2'
import { RootState, useAppDispatch, useAppSelector } from '@store/index'
import { toggleCrudForm } from '@src/store/slices/sittingSlice/sittingSlice'
import Search from '@components/TableInfo/Search/Search'
import Table from '@src/components/TableData/TableDataV2'
import { ReactComponent as UserRounded } from '@src/assets/icons/user/UserRounded.svg'
import useSearch from '@src/hook/useSearch'
import useRowSelection from '@src/hook/useRowSelection'
import UserData from './UserData'
import SectionHeader from '@src/components/SectionHeader/SectionHeader'
import ClientForm from '@src/components/ClientsForm/clientForm'

export type ClientType = {
  key: React.Key
  name: string
  email: string
  roles: string
  createdAt: string
  action: JSX.Element
}

const Clients = () => {
  const dispatch = useAppDispatch()
  const { columns, dataSource, toggleColumnHiddenPosts } = UserData()
  const { length, client, status } = useAppSelector((state: RootState) => state.client)
  const { handleSearch, pageSize, searchValue } = useSearch(
    (params) => dispatch(getAllClient(params)),
    { searchValue: '' },
  )

  const { selectedCount, rowSelection } = useRowSelection({ initialCount: 0 })

  const handleFilter = () => {}
  const onToggleColumnHidden = (dataIndex: string) => {
    toggleColumnHiddenPosts(dataIndex)
  }

  return (
    <div className="client_container">
      <div className="client_data">
        <SectionHeader
          title={'total clients'}
          length={length}
          btn_title={'new client'}
          Icon={<UserRounded />}
          handleClick={() => dispatch(toggleCrudForm())}
        />
        <Search
          placeholder="Search by : Name ,  Email"
          handleSearch={handleSearch}
          handleFilter={handleFilter}
          value={searchValue}
        />

        <Table
          columns={columns}
          dataSource={dataSource(client)}
          loading={status}
          className="users_table"
          rowSelection={rowSelection}
          scroll={{ x: 1000, y: 300 }}
          title={() =>
            TableCaption({
              selectedCount,
              columns,
              onToggleColumnHidden,
            })
          }
        />
      </div>
      <ClientForm />
      {length > 0 && <PaginationV2 totalItems={length} itemsPerPage={pageSize} />}
    </div>
  )
}

export default Clients
