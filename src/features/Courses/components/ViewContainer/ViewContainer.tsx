import DailyProgress from '../DailyProgress/DailyProgress'
import ViewHeaderSearchFilters from '../ViewHeaderSearchFilters/ViewHeaderSearchFilters'
import ListView from '../ListView/ListView'
import BoardView from '../BoardView/BoardView'
function ViewContainer({ type }: { type: string }) {
  return (
    <section className="board_view_container">
      <div className="board_view_right_section">
        <ViewHeaderSearchFilters />
        {type === 'board' ? <BoardView /> : <ListView />}
      </div>
      <DailyProgress />
    </section>
  )
}

export default ViewContainer
