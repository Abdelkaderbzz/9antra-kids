import { Modal, ModalProps } from 'antd'
import { createStyles } from 'antd-style'

const useStyle = createStyles(({ token }) => ({
  'my-modal-body': {
    background: token.blue1,
    padding: token.paddingSM,
  },
  'my-modal-mask': {
    boxShadow: `inset 0 0 15px #fff`,
  },
  'my-modal-header': {
    borderBottom: `1px dotted ${token.colorPrimary}`,
  },
  'my-modal-footer': {
    color: token.colorPrimary,
  },
  'my-modal-content': {
    border: '1px solid #333',
  },
}))

const ModalV1: React.FC<ModalProps> = ({ children, ...props }) => {
  const { styles } = useStyle()

  const classNames = {
    // body: styles['my-modal-body'],
    // mask: styles['my-modal-mask'],
    // header: styles['my-modal-header'],
    footer: styles['my-modal-footer'],
    content: styles['my-modal-content'],
  }

  const modalStyles = {
    header: {
      borderRadius: 0,
      paddingInlineStart: 5,
    },
    body: {},
    mask: {
      backdropFilter: 'blur(0.5px)',
    },
    footer: {},
    content: {
      boxShadow: '0 0 30px #999',
    },
  }

  return (
    <>
      <Modal {...props} classNames={classNames} styles={modalStyles}>
        {children}
      </Modal>
    </>
  )
}

export default ModalV1
