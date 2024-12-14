import { useState } from 'react'
import { ExtendedColumnType } from '@src/components/TableData/TableDataV2'

const initialColumns: ExtendedColumnType<any>[] = [
  { key: 'key', hidden: true, title: 'Id', dataIndex: '_id', align: 'center' },
  {
    key: 'key',
    hidden: false,
    title: 'fullName',
    dataIndex: 'fullName',
    align: 'center',
    cantHidden: true,
  },
  {
    key: 'key',
    hidden: false,
    title: 'description',
    dataIndex: 'description',
    align: 'center',
    width: 300,
  },
  { key: 'key', hidden: false, title: 'status', dataIndex: 'status', align: 'center' },
  {
    key: 'key',
    hidden: false,
    title: 'location',
    dataIndex: 'location',
    align: 'center',
  },
  {
    key: 'key',
    hidden: false,
    title: 'Created at',
    dataIndex: 'createdAt',
    align: 'center',
  },
  {
    key: 'key',
    hidden: false,
    title: 'Action',
    dataIndex: 'action',
    align: 'center',
    width: 100,
    cantHidden: true,
  },
]

const UserData = () => {
  const [columns, setColumns] = useState(initialColumns)
  const toggleColumnHiddenPosts = (dataIndex: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.dataIndex === dataIndex ? { ...col, hidden: !col.hidden } : col,
      ),
    )
  }

  const dataSource = (client: any) =>
    client?.map((item: any) => ({
      key: item?._id,
      _id: item?._id,
      fullName: <p>{item?.fullName}</p>,
      description: <p>{item?.description}</p>,
      status: <p>{item?.status}</p>,
      location: <p>{item?.locationInfo?.location}</p>,
      createdAt: <p>{item?.createdAt}</p>,
      action: <p>hello</p>,
    })) || []

  return { dataSource, columns, toggleColumnHiddenPosts }
}
export default UserData
