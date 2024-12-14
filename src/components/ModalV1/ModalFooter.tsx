import Button from '@components/Button/Button'
interface ImodalFooter {
  onCancel?: () => void
  onOk?: () => void
  cancelText?: string
  okText?: string
}

const ModalFooter = ({ onCancel, onOk, cancelText, okText }: ImodalFooter) => {
  return (
    <div className="modal-footer-container">
      {cancelText && (
        <Button onClick={onCancel} variant="cancel">
          {cancelText}
        </Button>
      )}
      {okText && (
        <Button onClick={onOk} variant="primary">
          {okText}
        </Button>
      )}
    </div>
  )
}

export default ModalFooter
