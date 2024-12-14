import { ChangeEvent, MutableRefObject } from 'react'
import { message } from 'antd'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { uploadFiles } from '@src/store/slices/uploadFiles/uploadFilesThunk'
import { useAppDispatch } from '@src/store'
import { useTranslation } from 'react-i18next'

interface UploadButtonProps {
  ref?: MutableRefObject<null>
  isProfileUploaded?: boolean
}

const UploadButton = ({ isProfileUploaded, ref }: UploadButtonProps) => {
  const { t } = useTranslation('createPopup')
  const dispatch = useAppDispatch()
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const file = event.target.files?.[0]
    const maxSize = 1024 * 1024 * 5
    if (file) {
      if (file.size > maxSize) {
        message.error('File size exceeds the maximum limit of 5MB.')
        event.target.value = ''
        return
      }
      dispatch(uploadFiles(file))
    }
  }
  return (
    <>
      <label ref={ref} className="upload-btn" htmlFor="upload-button">
        {isProfileUploaded && <AiOutlineCloudUpload />}
        <span>{t('editor.uploadimage')}</span>
      </label>
      <input
        id="upload-button"
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleFileUpload}
      />
    </>
  )
}

export default UploadButton
