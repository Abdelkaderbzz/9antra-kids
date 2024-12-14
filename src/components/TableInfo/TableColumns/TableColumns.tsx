import React, { ReactNode, useState } from 'react'
import { Popover, Switch } from 'antd'
import { ColumnType } from 'antd/es/table'
import { IoMdClose } from 'react-icons/io'
import { MdDragIndicator } from 'react-icons/md'

interface TableColumnsProps {
  children?: React.ReactNode
  columns: ColumnType<any>[]
  onToggleColumnHidden: (dataIndex: string) => void
}

const TableColumns = ({ children, columns, onToggleColumnHidden, ...props }: TableColumnsProps) => {
  const [toggleColumn, setToggleColumn] = useState(false)
  const handleOpenChange = (open: boolean) => {
    setToggleColumn(() => open)
  }

  return (
    <Popover
      trigger="click"
      placement="left"
      overlayClassName="table_columns"
      open={toggleColumn}
      onOpenChange={handleOpenChange}
      title={
        <div className="table_columns_title">
          <p>Configure columns</p>
          <IoMdClose
            className="table_columns_close_icon"
            onClick={() => setToggleColumn((prev: boolean) => !prev)}
          />
        </div>
      }
      content={
        <nav className="table_columns_content">
          {columns?.map((column, index) => (
            <div key={index} className="table_columns_content_column">
              <MdDragIndicator />
              <span
                onClick={() => onToggleColumnHidden(column?.dataIndex)}
                className="table_column_title_icon"
              >
                <Switch className="table_column_switch_icon" checked={!column?.hidden} />
                {column?.title as string | ReactNode}
              </span>
            </div>
          ))}
        </nav>
      }
      children={children}
      {...props}
    />
  )
}

export default TableColumns
