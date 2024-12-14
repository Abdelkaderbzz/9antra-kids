import React from 'react'
import { Modal, Skeleton } from 'antd'
import { ReportsType } from '@src/types/reportsTypes'

type DetailReportsProps = {
  setData: any
  data: ReportsType
}
const DetailReports: React.FC<DetailReportsProps> = ({ data, setData }) => {
  return (
    <Modal title="Detail Reports" open={true} footer={null} onCancel={() => setData()}>
      {data.image ? (
        <img
          src={`${import.meta.env.VITE_APP_BASE_URL}/reports/${data.image}`}
          className="detail-reports-img"
          alt="Detail Reports"
          crossOrigin="anonymous"
        />
      ) : (
        <Skeleton.Image className="detail-reports-img" />
      )}
      <p className="detail-reports-email">{data.email}</p>
      <p className="detail-reports-description">{data.description}</p>
    </Modal>
  )
}

export default DetailReports
