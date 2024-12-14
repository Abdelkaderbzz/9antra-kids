const TagCom = ({ value }: any) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p
        style={{
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '34px',
          color: '#333',
          backgroundColor: '#eee',
          fontSize: '16px',
          fontWeight: '400',
          padding: '10px 16px',
          borderRadius: '10px',
          textTransform: 'capitalize',
        }}
      >
        {value}
      </p>
    </div>
  )
}

export default TagCom
