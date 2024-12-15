import { ReactComponent as HeaderLesson } from '@assets/images/lessons/header.svg'
import { ReactComponent as DescriptionLesson } from '@assets/images/lessons/introductions.svg'
import { ReactComponent as VideoLesson } from '@assets/images/lessons/video.svg'
import popupsLog from '@assets/images/auth/bg_section2.svg'
import Button from '@src/components/Button/Button'
import Video from "../../assets/video.svg"
const Lessons = () => {
  return (
    <div className="lessons-container">
      <div >
        <img src={Video} alt="" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
        <Button size="xl" variant="cancel">
          precedent
        </Button>
        <Button size="xl" variant="secondary">
          suivante
        </Button>
      </div>
    </div>
  )
}

export default Lessons
