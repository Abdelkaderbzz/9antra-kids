import FormatTime from '@src/components/FormatTime/FormatTime'
import TagCom from '@src/components/TagCom/TagCom'
import { TFunction } from 'i18next'

export const userDataToPreview = (userToPreview: any, t: TFunction<'modal', undefined>) => {
  return (
    <div className="preview-filed-container">
      <div className="preview-filed">
        <label htmlFor="">{t('id')}</label>
        <p>{userToPreview?.user?._id}</p>
      </div>
      <div className="preview-filed">
        <label htmlFor="">{t('name')}</label>
        <p>{userToPreview?.user?.name}</p>
      </div>

      {userToPreview?.user?.email && (
        <div className="preview-filed">
          <label htmlFor="">{t('email')}</label>
          <p>{userToPreview?.user?.email}</p>
        </div>
      )}

      {userToPreview?.user?.roles && (
        <div className="preview-filed">
          <label htmlFor="">{t('role')}</label>
          {userToPreview?.user?.roles.length < 1 && <TagCom value={'-'} />}
          <div className="preview-field-permissions">
            {userToPreview?.user?.roles.map((el: any, i: number) => {
              return <TagCom key={i} value={el?.name}></TagCom>
            })}
          </div>
        </div>
      )}
      {userToPreview?.user?.createdAt && (
        <div className="preview-filed">
          <label htmlFor="">{t('createdAt')}</label>
          <FormatTime originalTime={userToPreview?.user?.createdAt} />
        </div>
      )}
      {userToPreview?.user?.updatedAt && (
        <div className="preview-filed">
          <label htmlFor="">{t('updatedAt')}</label>
          <FormatTime originalTime={userToPreview?.user?.updatedAt} />
        </div>
      )}
    </div>
  )
}
