import popupsLog from '@assets/images/auth/bg_section2.svg'

const StepsHeader = () => {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'start',borderBottom:'1px solid #ddd' }}> 
      <img style={{width:'170px'}} src={popupsLog} alt="" />
    </div>
  )
}

export default StepsHeader
