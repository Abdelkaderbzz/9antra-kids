import { Skeleton } from 'antd'

const SkeletonCard = ({ index }: { index: number }) => {
  return (
    <div className="skeleton-reports-card" key={index}>
      <Skeleton.Image active />
      <Skeleton.Input active />
      <Skeleton active paragraph={{ rows: 2, width: '90%' }} title={false} />
      <Skeleton.Button active />
    </div>
  )
}
export default SkeletonCard
