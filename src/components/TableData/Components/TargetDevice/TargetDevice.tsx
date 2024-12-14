import { FaDesktop, FaMobileAlt } from 'react-icons/fa'

const TargetDevice = ({ target }: { target: string }) => {
  return (
    <div className="target-device">
      {target === 'all' ? (
        <>
          <FaMobileAlt />
          <FaDesktop />
        </>
      ) : target === 'mobile' ? (
        <FaMobileAlt />
      ) : (
        <FaDesktop />
      )}
    </div>
  )
}

export default TargetDevice
