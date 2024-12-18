import { useEffect, useState } from 'react'
import { DOMSelector, Ioverlay } from './DomSelector/DomSelector'
import TourStepsView from './TourStepsView/TourStepsView'
import TourBuilderStarter from './TourBuilderStarter/TourBuilderStarter'
import { TourTooltip } from './TourTooltip/TourTooltip'
import ToggledTourBuilder from './ToggledTourBuilder/ToggledTourBuilder'
import { TourBuilderState } from './types'
export interface ICurrentStateContent {
  progression_behavior: number
  button_text: string | null
  description: string
}
function ProductTourBuilder() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentStepContent, setCurrentStepContent] = useState<ICurrentStateContent>({
    progression_behavior: 0,
    button_text: null,
    description: '',
  })
  const [elementSelect, setElementSelect] = useState<Ioverlay>()
  const [hovredElement, setHovredElement] = useState('#main')
  const [tourBuilderMode, setTourBuilderMode] = useState<
    'starter' | 'stepEdit' | 'selector' | 'tourSteps' | 'preview'
  >(() => {
    const savedTourBuilderMode = sessionStorage.getItem(
      'taki-popups-snippet__intersection-last-composition-mode',
    )
    if (
      savedTourBuilderMode === 'starter' ||
      savedTourBuilderMode === 'stepEdit' ||
      savedTourBuilderMode === 'selector' ||
      savedTourBuilderMode === 'tourSteps'
    ) {
      return savedTourBuilderMode
    }
    return 'starter'
  })

  const [tourBuilderState, setTourBuilderState] = useState<TourBuilderState>(() => {
    const savedState = sessionStorage.getItem('taki-popups-snippet__intersection-tour')
    return savedState
      ? JSON.parse(savedState)
      : {
          steps: [],
          insertable_url: window.location.href,
          restartable: false,
          restart_button_text: null,
          snoozeable: true,
          snooze_button_text: null,
          end_tour_animation: 'confetti',
          button_color: null,
        }
  })
  useEffect(() => {
    sessionStorage.setItem(
      'taki-popups-snippet__intersection-tour',
      JSON.stringify(tourBuilderState),
    )
  }, [tourBuilderState])
  useEffect(() => {
    sessionStorage.setItem(
      'taki-popups-snippet__intersection-last-composition-mode',
      tourBuilderMode,
    )
  }, [tourBuilderMode])

  const [state, setstate] = useState(false)

  const onSelectDomElement = (overlay: Ioverlay | undefined) => {
    setTourBuilderMode('stepEdit')
    setElementSelect(overlay)
  }
  useEffect(() => {
    if (window.name === 'tourBuilderActiveWindow') {
      setstate(true)
    } else {
      setstate(false)
    }
  }, [window.name])
  if (!state) return null
  return (
    <>
      {elementSelect && (
        <div className="intersection-frame">
          <div
            data-selector-overlay
            className="intersection__highlight-container"
            style={{
              top: elementSelect.top,
              left: elementSelect.left,
              width: elementSelect.width,
              height: elementSelect.height,
            }}
          />
          <TourTooltip
            setCurrentStepContent={setCurrentStepContent}
            currentStepContent={currentStepContent}
            elementLocation={elementSelect}
          />
        </div>
      )}
      <ToggledTourBuilder setIsVisible={setIsVisible} />
      {tourBuilderMode === 'selector' && (
        <DOMSelector
          onHover={(selector) => setHovredElement(selector)}
          onSelect={onSelectDomElement}
        />
      )}
      <div
        style={isVisible ? { height: 'fit-content' } : { height: '0px' }}
        className="tour-container"
      >
        <TourStepsView
          setTourBuilderState={setTourBuilderState}
          tourBuilderState={tourBuilderState}
          tourBuilderMode={tourBuilderMode}
          setTourBuilderMode={setTourBuilderMode}
        />
        <TourBuilderStarter
          setCurrentStepContent={setCurrentStepContent}
          setTourBuilderState={setTourBuilderState}
          tourBuilderState={tourBuilderState}
          currentStepContent={currentStepContent}
          setElementSelect={setElementSelect}
          tourBuilderMode={tourBuilderMode}
          hovredElement={hovredElement}
          setIsVisible={setIsVisible}
          setTourBuilderMode={setTourBuilderMode}
        />
      </div>
    </>
  )
}
export default ProductTourBuilder
