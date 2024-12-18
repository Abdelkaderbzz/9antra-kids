import { useState, Dispatch, SetStateAction } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { BsFileEarmarkPost, BsTrash3Fill } from 'react-icons/bs'
import { IoMdAdd } from 'react-icons/io'
import { MdDragIndicator, MdVideoLibrary } from 'react-icons/md'
import { TourBuilderState } from '../types'
import { Avatar } from 'antd'
import { TbSquareRoundedArrowRightFilled } from 'react-icons/tb'
import TourSettings from '../TourSettings/TourSettings'

interface ITourStepsView {
  tourBuilderMode: 'starter' | 'stepEdit' | 'selector' | 'tourSteps'| 'preview'
  tourBuilderState: TourBuilderState
  setTourBuilderMode: Dispatch<SetStateAction<'starter' | 'stepEdit' | 'selector' | 'tourSteps'|'preview' >>
  setTourBuilderState: Dispatch<SetStateAction<TourBuilderState>>
}
const TourStepsView = ({
  tourBuilderMode,
  setTourBuilderState,
  tourBuilderState,
  setTourBuilderMode,
}: ITourStepsView) => {
  const [activeTab, setActiveTab] = useState('steps')
  const [isTourStepHovred, setIsTourStepHovred] = useState(-1)

  const openDomSelector = () => {
    setTourBuilderMode('selector')
  }
  const onDragEnd = (result: any) => {
    if (!result.destination) return
    const newSteps = Array.from(tourBuilderState.steps)
    const [reorderedStep] = newSteps.splice(result.source.index, 1)
    newSteps.splice(result.destination.index, 0, reorderedStep)
    setTourBuilderState((prev) => ({
      ...prev,
      steps: newSteps,
    }))
  }

  const deleteStep = (id: string) => {
    setTourBuilderState((prev) => ({
      ...prev,
      steps: prev.steps.filter((step) => step.id !== id),
    }))
  }
  if (tourBuilderMode !== 'tourSteps') return null
  return (
    <div className="tour-builder-steps-view">
      <div className="tour-builder-steps-tabs">
        <div
          onClick={() => setActiveTab('steps')}
          className={`step-tab-item ${activeTab === 'steps' && 'active-tab'}`}
        >
          <span>Steps</span>
        </div>
        <div
          onClick={() => setActiveTab('settings')}
          className={`step-tab-item ${activeTab === 'settings' && 'active-tab'}`}
        >
          <span>Settings</span>
        </div>
      </div>
      {activeTab === 'settings' ? (
        <TourSettings
          setTourBuilderState={setTourBuilderState}
          tourBuilderState={tourBuilderState}
        />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="steps" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="tour-builder-steps-view-content"
              >
                <div
                  style={tourBuilderState.steps.length > 0 ? { gap: '0px' } : { gap: '30px' }}
                  className="tour-builder-steps-view-content-steps"
                >
                  {tourBuilderState.steps.map((step, index) => {
                    return (
                      <Draggable  key={step.id} draggableId={step.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            key={index}
                            className="tour-step-item-container"
                          >
                            <div className="tour-step-timeline">
                              <div className="tour-step-timeline-left-part">
                                <div className="small-arrow-step-indicator"></div>
                                <div className="tour-step-timeline-index">{index + 1}.</div>
                                <div
                                  onMouseLeave={() => setIsTourStepHovred(-1)}
                                  onMouseOver={() => setIsTourStepHovred(index)}
                                  className="tour-step-timeline-left-part-content"
                                >
                                  {isTourStepHovred === index && (
                                    <div className="drag-delete-step-options">
                                      <span {...provided.dragHandleProps}>
                                        <MdDragIndicator />
                                      </span>
                                      <span
                                        onClick={() => deleteStep(step.id)}
                                        className="delete-icon"
                                      >
                                        <BsTrash3Fill />
                                      </span>
                                    </div>
                                  )}
                                  <div className="tour-step-timeline-header">
                                    <Avatar className="tour-creater-avatar" />
                                    <p>Amir from softylines</p>
                                  </div>
                                  <div className="tour-step-timeline-content">
                                    {step.blocks[0].text}
                                  </div>
                                </div>
                              </div>
                              <div className="tour-step-timeline-right-part">
                                <div className="tour-step-timeline-right-part-tour-advance-method">
                                  <div className="small-line"></div>
                                  <TbSquareRoundedArrowRightFilled />
                                  <div className="small-line"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                  <div key={9999} className="tour-builder-step-item card-container">
                    <div className="content-wrapper">
                      <div className="button-primary" onClick={openDomSelector}>
                        <IoMdAdd />
                      </div>
                      <div className={`button-outline left `}>
                        <span className="sr-only">
                          <BsFileEarmarkPost />
                        </span>
                      </div>
                      <div className={`button-outline right `}>
                        <span className="sr-only">
                          <MdVideoLibrary />
                        </span>
                      </div>
                    </div>
                  </div>
                  {tourBuilderState.steps.length < 1 &&
                    Array.from({ length: 4 }, (_, i) => i).map((_, index) => (
                      <div
                        key={index + 9999}
                        className="tour-builder-step-item card-container"
                      ></div>
                    ))}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  )
}

export default TourStepsView
