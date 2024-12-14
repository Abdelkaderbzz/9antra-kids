import { TbProgressCheck } from 'react-icons/tb'
import { HiDotsHorizontal } from 'react-icons/hi'
import { Progress } from 'antd'
import { ClientContent } from '../../types'

interface BillingCardProp {
  clientData: ClientContent
  className: string // Changed `class` to `className`
}

const BillingCard: React.FC<BillingCardProp> = ({ clientData, className }) => {
  const {
    clientName,
    clientCountry,
    clientBillingProgress,
    clientBillingAmount,
    clientBillingCurrency,
    clientAvatar,
  } = clientData

  return (
    <div className={`billing_card ${className}`}>
      <div className="billing_card_top_section">
        <nav>
          <span>{clientName}</span>
          <p>{clientCountry}</p>
        </nav>
        <div className="three_dots_triger">
          <HiDotsHorizontal />
        </div>
      </div>
      <div className="billing_card_progress">
        <nav className="progress_value">
          <p>
            <TbProgressCheck />
            <span>progress</span>
          </p>
          <span>{clientBillingProgress}%</span>
        </nav>

        <Progress className="progress_bar" percent={clientBillingProgress} showInfo={false} />
      </div>
      <div className="billing_card_avatar">
        <span>
          {clientBillingAmount} {clientBillingCurrency}
        </span>
        <img src={clientAvatar} alt="Client Avatar" />
      </div>
    </div>
  )
}

export default BillingCard
