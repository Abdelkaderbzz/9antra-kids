const ToolTipText = ({ value }: any) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'end',
        gap: '10px',
        minWidth: '160px',
      }}
    >
      <p style={{ color: '#1c1c26d9', fontFamily: 'Poppins', fontSize: '16px', fontWeight: '500' }}>
        {value}
      </p>
    </div>
  )
}

export default ToolTipText
