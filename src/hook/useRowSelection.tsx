import { useState, useMemo } from 'react'

type RowSelectionOptions = {
  initialCount?: number
}

const useRowSelection = ({ initialCount = 0 }: RowSelectionOptions) => {
  const [selectedCount, setSelectedCount] = useState(initialCount)
  const [RowsSelected, setRowsSelected] = useState<any[]>([])

  const rowSelection = useMemo(
    () => ({
      onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
        setSelectedCount(selectedRowKeys.length)
        setRowsSelected(selectedRows)
      },
    }),
    [],
  )

  return { rowSelection, selectedCount, RowsSelected }
}

export default useRowSelection
