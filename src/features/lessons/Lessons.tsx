
import Button from '@src/components/Button/Button'
import Video from "../../assets/video.svg"
const Lessons = () => {
  return (
    <div className="lessons-container">
      <div >
        <img src={Video} alt="" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
        <Button variant="cancel">precedent</Button>
        <Button variant="secondary">suivante</Button>
      </div>
    </div>
  )
}

export default Lessons
