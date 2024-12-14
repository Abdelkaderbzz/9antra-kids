import { useRef, useState } from 'react'
import { CSVLink } from 'react-csv'
import { Select } from 'antd'
import { RootState, useAppDispatch, useAppSelector } from '@src/store'
import { getCSVData } from '@src/store/slices/csvFile/csvFileThunk'
import { ReactComponent as ExportIcon } from '@src/assets/icons/csvFile/export.svg'

type typeExportFile = 'reacts' | 'comments'
const typeExport = ['comments', 'reacts']
const CSVFile = ({ id }: { id: string | undefined }) => {
  const dispatch = useAppDispatch()
  const { status, csvData } = useAppSelector((state: RootState) => state.csvFile)
  const [type, setType] = useState<typeExportFile>('comments')
  const csvLink = useRef<any>(null)

  const onChangetype = (value: typeExportFile) => {
    setType(value)
  }
  const downloadCSV = () => {
    dispatch(getCSVData({ id, exportType: type })).then(() => {
      if (csvLink.current) {
        csvLink.current.link.click()
      }
    })
  }

  return (
    <div className="csv-export">
      <Select
        size={'large'}
        style={{ width: 200 }}
        value={type}
        onChange={onChangetype}
        options={typeExport.map((type) => ({ label: type, value: type }))}
      />

      <div>
        <button onClick={() => downloadCSV()} disabled={status === 'loading'} className="btn-csv">
          {status === 'loading' ? (
            'Loading...'
          ) : (
            <>
              <ExportIcon />
              <span className="btn-csv-title">Export</span>
            </>
          )}
        </button>
        <CSVLink
          data={csvData}
          filename={`${type}.csv`}
          className="hidden"
          ref={csvLink}
          target="_blank"
        />
      </div>
    </div>
  )
}
export default CSVFile
