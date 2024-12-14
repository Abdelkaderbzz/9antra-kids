import React from 'react'
import { Table as AntdTable } from 'antd'
import type { TableProps } from 'antd'
import { ColumnType } from 'antd/es/table'

type RecordType = {
  key: React.Key
  [key: string]: any
}

export interface ExtendedColumnType<RecordType> extends ColumnType<RecordType> {
  cantHidden?: boolean
}

const Table: React.FC<TableProps<RecordType>> = (props) => {
  return (
    <AntdTable<RecordType>
      size="middle"
      bordered={false}
      pagination={false}
      footer={undefined}
      scroll={props?.dataSource?.length ? { x: 'auto' } : undefined}
      rowSelection={{ type: 'checkbox' }}
      rowHoverable={false}
      {...props}
      className={`table_data ${props?.className}`}
    />
  )
}

export default Table
