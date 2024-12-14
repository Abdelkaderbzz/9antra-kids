import { ReactComponent as Tuning } from '@src/assets/icons/user/Tuning.svg'
import TableColumns from '@src/components/TableInfo/TableColumns/TableColumns'
import { ReactComponent as DeleteIcon } from '@assets/icons/DeleteIcon.svg'
import { ColumnType } from 'antd/es/table'

interface ListInfoProp {
  selectedCount?: number
  columns?: ColumnType<any>[]
  onToggleColumnHidden?: (dataIndex: string) => void
  handleDelete?: () => void
}

const TableCaption = ({
  selectedCount,
  columns,
  onToggleColumnHidden,
  handleDelete,
}: ListInfoProp) => {
  return (
    <div className="table_caption">
      <div className="table_caption_selected_items">
        {selectedCount != null && (
          <>
            {selectedCount > 0 && handleDelete && (
              <button className="table_caption_selected_items_delete_btn" onClick={handleDelete}>
                <DeleteIcon />
                <span>Delete</span>
              </button>
            )}
            {`(${selectedCount}) selected Items`}
          </>
        )}
      </div>
      {columns && onToggleColumnHidden && (
        <TableColumns onToggleColumnHidden={onToggleColumnHidden} columns={columns}>
          <div className="table_caption_btn_columns">
            <Tuning />
            <span>columns</span>
          </div>
        </TableColumns>
      )}
    </div>
  )
}

export default TableCaption
