import {ReactComponent as HeaderLesson} from '@assets/images/lessons/header.svg'
import {ReactComponent as DescriptionLesson} from '@assets/images/lessons/introductions.svg'
import { ReactComponent as VideoLesson } from '@assets/images/lessons/video.svg'
import popupsLog from '@assets/images/auth/bg_section2.svg'
import Button from '@src/components/Button/Button'

const Lessons = () => {
  return (
    <div className="lessons-container">
      <div style={{ display: 'flex' }}>
        <img style={{ width: '170px' }} src={popupsLog} alt="" />
        <HeaderLesson />
      </div>
      <div>
        <DescriptionLesson />
      </div>
      <div>
        <VideoLesson />
      </div>
      <div style={{ display: 'flex', justifyContent: 'end', gap:'10px'}}>
        <Button variant='cancel'>precedent</Button>
        <Button variant='secondary'>suivante</Button>
      </div>
    </div>
  )
}

export default Lessons
