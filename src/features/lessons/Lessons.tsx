
import Button from '@src/components/Button/Button'
import Video from "../../assets/video.svg"
import { useNavigate } from 'react-router-dom'
const Lessons = () =>
{
  const navigate=useNavigate()
  return (
    <div className="lessons-container">
      <div >
        <img src={Video} alt="" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
        <Button size="xl" variant="cancel">
          precedent
        </Button>
        <Button onClick={()=>navigate('/quizes')} size="xl" variant="secondary">
          suivante
        </Button>
      </div>
    </div>
  )
}

export default Lessons
