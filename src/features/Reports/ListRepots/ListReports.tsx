import { useEffect, useState } from 'react'
import { Empty, Skeleton } from 'antd'
import { RootState, useAppDispatch, useAppSelector } from '@src/store'
import { getReports } from '@src/store/slices/Reports/reportsThunk'
import DetailReports from '../DetailReports'
import { ReportsType } from '@src/types/reportsTypes'
import SkeletonCard from '../components/SkeletonCard'
import { getTextDirection } from '@src/utils/checkArabicLanguage'

const list_reports = () => {
  const dispatch = useAppDispatch()
  const { status, listReports } = useAppSelector((state: RootState) => state.reports)
  const [data, setData] = useState<ReportsType | null>(null)
  useEffect(() => {
    if (!listReports.meta.page) {
      dispatch(getReports(1))
    }
  }, [dispatch, listReports.meta.page])

  const loadMore = listReports.meta.hasNextPage && status !== 'failed' && (
    <div className="reports-list-btn-loading-more">
      <button onClick={() => dispatch(getReports(listReports.meta.page + 1))}>loading more</button>
    </div>
  )

  const skeleton = () => {
    const remainingDocs = listReports.meta.totalDocs - listReports.docs.length
    const numberOfSkeletons = Math.min(remainingDocs, listReports.meta.limit)
    return Array.from({ length: numberOfSkeletons | 5 }, (_, index) => (
      <SkeletonCard index={index} />
    ))
  }

  return (
    <>
      <div className="list-reports">
        {status === 'loading' && listReports.docs.length === 0 && skeleton()}
        {status === 'failed' && <p className="no-reports">Something went wrong</p>}
        {status === 'succeeded' && listReports.docs.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          listReports.docs.map((el, index) => {
            const direction = getTextDirection(el.description)
            return (
              <div className="list-reports-card" key={Math.random() + index}>
                {el.image ? (
                  <img
                    src={`${import.meta.env.VITE_APP_BASE_URL}/reports/${el?.image}`}
                    alt="Reports"
                    className="reports-card-img"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <Skeleton.Image className="reports-card-img" />
                )}
                <p className="reports-card-title">{el.email}</p>
                <p className="reports-card-description" style={{ direction }}>
                  {el.description}
                </p>
                <button className="reports-card-btn" onClick={() => setData(el)}>
                  View Detail
                </button>
              </div>
            )
          })
        )}
        {status === 'loading' && skeleton()}
        {data && <DetailReports data={data} setData={setData} />}
      </div>
      {loadMore}
    </>
  )
}
export default list_reports
