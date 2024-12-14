import { TbProgressCheck } from 'react-icons/tb'
import { HiDotsHorizontal } from 'react-icons/hi'
import { Progress } from 'antd'
import { ClientContent } from '../../../BoardView/types'

interface BillingCardListProp {
  clientData: ClientContent
  className: string // Changed `class` to `className`
}

const BillingCardList: React.FC<BillingCardListProp> = ({ clientData, className }) => {
  const {
    clientName,
    clientCountry,
    clientBillingProgress,
    clientBillingAmount,
    clientBillingCurrency,
    clientAvatar,
  } = clientData

  return (
    <div className={`billing_card_list ${className}`}>
      <img className="client_avatar" src={clientAvatar} alt="Client Avatar" />
      <pre className="client_name">{clientName}</pre>
      <pre className="client_country">{clientCountry}</pre>
      <Progress className="progress_bar" percent={clientBillingProgress} showInfo={false} />
      <nav className="progress_value">
        <p>
          <TbProgressCheck />
          <span>progress</span>
        </p>
        <span>{clientBillingProgress}%</span>
      </nav>
      <pre className="client_billing_amount">
        {clientBillingAmount} {clientBillingCurrency}
      </pre>
      <div className="three_dots_triger">
        <HiDotsHorizontal />
      </div>
    </div>
  )
}

export default BillingCardList
