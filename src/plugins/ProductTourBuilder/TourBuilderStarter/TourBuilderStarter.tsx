import { FaChevronDown, FaPlay } from 'react-icons/fa6'
import Joyride from 'react-joyride'

import { ReactComponent as PopupsLogo } from './../../assets/popupsLogo.svg'

import { Dispatch, SetStateAction } from 'react'
import { IoExitOutline, IoSettings } from 'react-icons/io5'
import { MdDone } from 'react-icons/md'
import { TourBuilderState } from '../types'

import { ICurrentStateContent } from '../ProductTourBuilder'
import Button from '@src/components/Button/Button'
import { Avatar } from 'antd'

interface ITourBuilderStarter
{
  setTourBuilderMode: Dispatch<SetStateAction<'starter' | 'stepEdit' | 'selector' | 'tourSteps' | 'preview'>>
  setIsVisible: Dispatch<SetStateAction<boolean>>
  tourBuilderMode: 'starter' | 'stepEdit' | 'selector' | 'tourSteps' | 'preview'
  hovredElement: string
  setElementSelect: any
  setTourBuilderState: Dispatch<SetStateAction<TourBuilderState>>
  setCurrentStepContent: Dispatch<SetStateAction<ICurrentStateContent>>
  currentStepContent: ICurrentStateContent
  tourBuilderState: TourBuilderState
}
const TourBuilderStarter = ({
  tourBuilderMode,
  setTourBuilderState,
  tourBuilderState,
  setCurrentStepContent,
  currentStepContent,
  setElementSelect,
  hovredElement,
  setIsVisible,
  setTourBuilderMode,
}: ITourBuilderStarter) =>
{
  const openTourStepsView = () =>
  {
    setElementSelect()
    setTourBuilderMode('tourSteps')
  }
  const handlePointSomeWhereElse = () =>
  {
    setElementSelect()
    setTourBuilderMode('selector')
    setCurrentStepContent({ progression_behavior: 0, button_text: null, description: '' })
  }
  const handleCancelTourStepsView = async () =>
  {
    if (window.opener)
    {
      window.opener.postMessage({ tourBuilderSteps: tourBuilderState }, '*');
    }
    window.close()
  }
  const addNewStep = () =>
  {
    setTourBuilderState((prev) =>
    {
      const prevSteps = prev.steps
      const newStep = {
        id: prevSteps.length < 1 ? '57384' : String(Number(prevSteps[prevSteps.length - 1].id) + 8),
        blocks: [
          {
            type: 'paragraph',
            text: currentStepContent.description,
          },
        ],
        selector: hovredElement,
        selectors: {
          auto_primary: hovredElement,
          auto_secondary: null,
          manual: null,
        },
        style: 'pointer',
        progression_behavior: currentStepContent.progression_behavior,
        placement: 0,
        pointer_size: 0,
        button_text: currentStepContent.button_text,
        url: window.location.href,
        order: prevSteps.length < 1 ? 1 : prevSteps[prevSteps.length - 1].order + 1,
        url_button_value: null,
      }
      return { ...prev, steps: [...prevSteps, newStep] }
    })
    setElementSelect()
    setCurrentStepContent({ progression_behavior: 0, button_text: null, description: '' })
    setTourBuilderMode('tourSteps')
  }

  const LeftPartTourBuilder = () =>
  {
    if (tourBuilderMode === 'tourSteps') return <div></div>
    return (
      <>
        <button onClick={() => setIsVisible(false)} className="tour-button-ghost">
          <FaChevronDown />
          Hide
        </button>
        <div className="tour-text">
          {tourBuilderMode === 'selector' ? (
            hovredElement
          ) : tourBuilderMode === 'stepEdit' ? (
            <ButtonsEditTourStep />
          ) : tourBuilderMode === 'preview' ?
            <></> : (
              'You can navigate to another page of your site if needed'
            )}
        </div>
      </>
    )
  }
  const ButtonsEditTourStep = () =>
  {
    return (
      <div className="tour-step-edit-mode-tool-bar">
        <span onClick={handlePointSomeWhereElse} className="point-somewhere-else">
          Point somewhere else
        </span>
        <div className="advanced-settings">
          <IoSettings />
          <span>advanced</span>
        </div>
        <Button onClick={openTourStepsView} variant="cancel" label="cancel" />
        <Button onClick={addNewStep} variant="primary" label="done" />
      </div>
    )
  }
  const RightPartTourBuilder = () =>
  {
    if (tourBuilderMode === 'tourSteps')
      return (
        <div className="tour-steps-view-buttons">
          <Button variant="cancel" label="cancel" onClick={handleCancelTourStepsView} />
          <Button variant="primary" label="save and close" onClick={handleCancelTourStepsView} />
        </div>
      )
    else if (tourBuilderMode === 'selector')
      return <Button variant="cancel" label="cancel" onClick={handleCancelTourStepsView} />
    else if (tourBuilderMode === 'starter')
      return (
        <button onClick={openTourStepsView} className="tour-button-primary">
          <MdDone />
          Begin Tour Here
        </button>
      )
    else return <></>
  }
  const getElementFromSelector = (selector: string): Element | null =>
  {
    try
    {
      return document.querySelector(selector);
    } catch (error)
    {
      console.error("Invalid selector:", selector, error);
      return null;
    }
  }
  function transformTourData(inputArray: any)
  {
    const resArr = inputArray.map((item: any) =>
    {
      const target = getElementFromSelector(item.selector);
      console.log(target)
      return {
        title: <div className="tour-step-preview-header">
          <Avatar className="tour-creater-avatar" />
          <p>Amir from softylines</p>
        </div>,
        hideCloseButton: false,
        disableOverlayClose: true,
        event: 'click',
        // hideFooter: true,
        placement: 'bottom',
        target: target,
        content: <div className='tour-preview-step-content'>{ item.blocks[0]?.text || ''}</div> ,
        style: {
          arrowColor: '#f0f0f0',
          backgroundColor: '#000',
          color: '#fff',
        },
        disableBeacon: true,
        spotlightPadding: 10,
        buttonText: item.button_text || 'Next',
      }
    })
    return resArr
  }
  const tourStepsConfig = transformTourData(tourBuilderState.steps)
  console.log(tourStepsConfig)
  const handlePreviewTour = () =>
  {
    setTourBuilderMode(tourBuilderMode === 'preview' ? 'tourSteps' : 'preview')
  }

  return (
    <div className="tour-builder-starter">
      <div className="tour-builder-left-side">
        <PopupsLogo className="popups-logo" />
        <LeftPartTourBuilder />
      </div>
      {tourBuilderState.steps.length > 0 && ['tourSteps', 'preview'].includes(tourBuilderMode) && (
        <button onClick={handlePreviewTour} className="tour-button-preview">
          {tourBuilderMode === 'preview' ? (
            <>
              <IoExitOutline />
              exit
            </>
          ) : (
            <>
              <FaPlay />
              preview
            </>
          )}
        </button>
      )}
      <Joyride
        styles={{
          options: {
            primaryColor: '#FC8353', textColor: '#000'
          }
        }}
        steps={tourStepsConfig}
        run={tourBuilderMode === 'preview'}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        scrollToFirstStep={true}
        callback={(data) =>
        {
          console.log(data,'data')
          if (data.status === 'finished' || data.status === 'skipped')
          {
            setTourBuilderMode('tourSteps')
          }
        }}
      />
      <RightPartTourBuilder />
    </div>
  )
}

export default TourBuilderStarter
