import React, { useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd'
import { message, Upload, Image } from 'antd'

const { Dragger } = Upload

const ImageUpload: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const props: any = {
    name: 'file',
    multiple: true,
    accept: 'image/*',
    maxCount: 3,
    listType: 'picture',
    fileList: fileList,
    beforeUpload: (file: File) => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error(`${file.name} is not an image file`)
        return Upload.LIST_IGNORE
      }
      return false // Prevent default upload behavior
    },
    onChange(info: any) {
      // Update fileList
      setFileList(info.fileList.slice(0, 3))
    },
    onDrop(e: React.DragEvent<HTMLDivElement>) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  return (
    <div style={{ width: '100%' }}>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click to upload or drag and drop</p>
        <p className="ant-upload-hint">Add up to 3 pictures (images only)</p>
      </Dragger>

      {fileList.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <h4>Image Preview:</h4>
          <Image.PreviewGroup>
            {fileList.map((file) => (
              <Image
                key={file.uid}
                src={file.thumbUrl || URL.createObjectURL(file.originFileObj as Blob)}
                alt={file.name}
                width={100}
                height={100}
                style={{ objectFit: 'cover', marginRight: 8 }}
              />
            ))}
          </Image.PreviewGroup>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
