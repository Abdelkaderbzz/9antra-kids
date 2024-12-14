import { ChangeEvent } from 'react'
import { message } from 'antd'
import { ReactComponent as UploadIcon } from '@assets/icons/popupContent/upload.svg'

import { uploadBackgroundImage } from '../../store/slices/uploadFiles/uploadFilesThunk'
import { useAppDispatch } from '../../store/index'

const PopupBackgroundUpload = () => {
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
      dispatch(uploadBackgroundImage(file))
    }
  }

  return (
    <>
      <label htmlFor="popup-background-upload-input" className="popup-background-upload">
        <UploadIcon />
        <span>upload</span>
      </label>
      <input
        id="popup-background-upload-input"
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleFileUpload}
      />
    </>
  )
}

export default PopupBackgroundUpload
