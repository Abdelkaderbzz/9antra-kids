import React, { useState } from 'react'
import { RcFile } from 'antd/lib/upload/interface'
import { DeleteOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { message, Modal, Upload } from 'antd'

type DragAndDropProps = {
  icon: React.ReactNode
  desc: string
  uploadedImage: RcFile | null
  setUploadedImage: React.Dispatch<React.SetStateAction<RcFile | null>>
}

const DragAndDrop: React.FC<DragAndDropProps> = ({
  icon,
  desc,
  uploadedImage,
  setUploadedImage,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewTitle, setPreviewTitle] = useState('')
  const props: UploadProps = {
    multiple: false,
    showUploadList: false,
    onDrop: handleFileDrop,
    beforeUpload: handleBeforeUpload,
    onChange: handleFileChange,
  }
  function handleBeforeUpload(file: RcFile): boolean {
    const isLt2M = file.size / 1024 / 1024 < 2
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      message.error('You can only upload image file!')
      return false
    }
    if (!isLt2M) {
      message.error('File must be smaller than 2MB!')
      return false
    }
    setPreviewTitle(file.name)
    setUploadedImage(file)
    return false
  }
  function handleFileDrop(e: React.DragEvent<HTMLDivElement>): void {
    if (e.dataTransfer.files.length > 1) {
      message.error('You can only upload one file at a time')
      setPreviewTitle('')
      setUploadedImage(null)
    }
  }
  function handleFileChange(info: any) {
    const { status } = info.file
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }
  function handleClearImage() {
    setPreviewTitle('')
    setUploadedImage(null)
  }
  return (
    <>
      {!uploadedImage ? (
        <Upload.Dragger {...props}>
          <p className="upload-text">
            {icon}
            <span>{desc}</span>
          </p>
        </Upload.Dragger>
      ) : (
        <>
          <div className="img-upload">
            <div>
              <img
                src={URL.createObjectURL(uploadedImage)}
                alt="file reports bugs"
                onClick={() => setPreviewOpen(true)}
              />
              <p onClick={() => setPreviewOpen(true)}>{previewTitle}</p>
            </div>
            <button className="remove-img-upload" onClick={handleClearImage}>
              <DeleteOutlined />
            </button>
          </div>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={() => setPreviewOpen(false)}
          >
            <img
              alt="img-upload-bugs"
              style={{ width: '100%' }}
              src={URL.createObjectURL(uploadedImage)}
            />
          </Modal>
        </>
      )}
    </>
  )
}

export default DragAndDrop
