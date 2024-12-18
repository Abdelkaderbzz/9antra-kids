import { useState, useEffect, SetStateAction, Dispatch } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import Input from '@src/components/Input/Input'

import { Card, Switch } from 'antd'
import { HiCursorClick } from 'react-icons/hi'
import { RiArrowDownSFill } from 'react-icons/ri'
import { BsInputCursorText } from 'react-icons/bs'
import { TbSquareRoundedArrowRightFilled } from 'react-icons/tb'
import { MdOutlineDone } from 'react-icons/md'
import { FiInfo } from 'react-icons/fi'
import { ICurrentStateContent } from '../ProductTourBuilder'

interface TourTooltipProps {
  setCurrentStepContent: Dispatch<SetStateAction<ICurrentStateContent>>
  currentStepContent: ICurrentStateContent
  elementLocation: {
    top: number
    left: number
    width: number
    height: number
  } | null
}
interface Ioption {
  icon: JSX.Element
  label: string
  key: number
}

export function TourTooltip({
  elementLocation,
  currentStepContent,
  setCurrentStepContent,
}: TourTooltipProps) {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number>(0)

  useEffect(() => {
    const calculatePosition = () => {
      if (!elementLocation) return

      const tooltipWidth = 300
      const tooltipHeight = 150
      const padding = 10
      let top = elementLocation.top + elementLocation.height + padding
      let left = elementLocation.left + elementLocation.width / 2 - tooltipWidth / 2
      if (left < 0) left = padding
      if (left + tooltipWidth > window.innerWidth) left = window.innerWidth - tooltipWidth - padding
      if (top + tooltipHeight > window.innerHeight)
        top = elementLocation.top - tooltipHeight - padding

      setTooltipPosition({ top, left })
    }

    calculatePosition()
    window.addEventListener('resize', calculatePosition)

    return () => window.removeEventListener('resize', calculatePosition)
  }, [elementLocation])

  if (!elementLocation) return null

  const options: Ioption[] = [
    { key: 0, icon: <TbSquareRoundedArrowRightFilled />, label: 'Next on the element' },
    { key: 1, icon: <HiCursorClick />, label: 'Click on the element' },
    { key: 2, icon: <BsInputCursorText />, label: 'Fill in the field' },
  ]

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSelectOption = (key: number) => {
    setCurrentStepContent((prev) => {
      return { ...prev, progression_behavior: key }
    })
    setSelectedOption(key)
    setIsOpen(false)
  }
  return (
    <Card
      className="tooltip-step-tour-container"
      style={{
        top: `${tooltipPosition.top}px`,
        left: `${tooltipPosition.left}px`,
      }}
      title={
        <div className="tour-step-tooltip-header">
          <div className="tour-step-header-sender">
            <div className="tour-builder-sender-avatar" />
            <span className="tour-builder-sender-name">Amir from softylines</span>
          </div>
          <CloseOutlined />
        </div>
      }
    >
      <div>
        <textarea
          value={currentStepContent.description}
          onChange={(e) =>
            setCurrentStepContent((prev) => {
              return { ...prev, description: e.target.value }
            })
          }
          placeholder="type your content here..."
          className="step-description-field"
        />
      </div>
      <div className="how-should-the-tour-advance-section">
        <p className="how-should-the-tour-advance">How should the tour advance?</p>
        <div className="tour-advance-method-dropdown">
          <div className="tour-advance-method-dropdown">
            <button onClick={toggleDropdown} className="tour-advance-method">
              <span>
                {options.find((option: Ioption) => option.key === selectedOption)?.icon}
                <p>{options.find((option: Ioption) => option.key === selectedOption)?.label}</p>
              </span>
              <RiArrowDownSFill />
            </button>

            {isOpen && (
              <div className="tour-advance-method-tooltip">
                {options.map((option) => (
                  <div
                    key={option.label}
                    className={`tour-advance-method tour-advance-method-option ${
                      selectedOption === option.key ? 'active' : ''
                    }`}
                    onClick={() => handleSelectOption(option.key)}
                  >
                    <span>
                      {option.icon}
                      <p>{option.label}</p>
                    </span>
                    {selectedOption === option.key && <MdOutlineDone />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {selectedOption === 0 && (
          <div className="custom-button-advance-step">
            <div className="custom-button-advance-step-switch">
              <Switch
                checked={currentStepContent.button_text !== null ? true : false}
                onChange={(checked) => {
                  setCurrentStepContent((prev) => {
                    return { ...prev, button_text: checked ? '' : null }
                  })
                }}
                size="small"
              />
              <p>use custom button text</p>
              <FiInfo />
            </div>
            {currentStepContent.button_text !== null && (
              <Input
                variant="dark"
                size="sm"
                placeholder="Type your text"
                type="text"
                value={currentStepContent.button_text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setCurrentStepContent((prev) => {
                    return { ...prev, button_text: e.target.value }
                  })
                }}
              />
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
