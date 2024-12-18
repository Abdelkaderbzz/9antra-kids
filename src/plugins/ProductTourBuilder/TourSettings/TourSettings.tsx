import { Tooltip, Switch } from 'antd'
import { LuInfo } from 'react-icons/lu'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { TourBuilderState } from '../types'
import Confetti from 'react-confetti'
import Input from '@src/components/Input/Input'
import Button from '@src/components/Button/Button'

interface ITourSettings {
  setTourBuilderState: Dispatch<SetStateAction<TourBuilderState>>
  tourBuilderState: TourBuilderState
}

export default function TourSettings({ tourBuilderState, setTourBuilderState }: ITourSettings) {
  const [confeti, setConfeti] = useState(false)
  const handleTurnOnConfitti = () => {
    setConfeti(true)
  }
  useEffect(() => {
    let timer: any
    if (confeti) {
      timer = setTimeout(() => {
        setConfeti(false)
      }, 3000)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [confeti])
  return (
    <div className="tour-settings-container">
      {confeti && <Confetti width={window.innerWidth} />}
      <div className="tour-settings-flex">
        <div className="tour-settings-section design-tour">
          <div className="input-group">
            <label htmlFor="tour-url" className="form-label">
              Design the tour on:
            </label>
            <span className="url-label">{tourBuilderState.insertable_url}</span>
          </div>
          <Button variant="cancel">Change</Button>
        </div>

        <div className="tour-settings-section snooze-tour">
          <div className="section-header">
            <h2 className="section-title">Snooze tour</h2>
            <span className="new-badge">New</span>
          </div>
          <div className="toggle-group">
            <div className="toggle-item">
              <Switch
                checked={tourBuilderState.snoozeable}
                onChange={(checked) =>
                  setTourBuilderState((prev) => ({
                    ...prev,
                    snoozeable: checked,
                  }))
                }
                size="small"
                id="add-button"
              />
              <label htmlFor="add-button" className="toggle-label">
                Add a button to the first step to let users view the tour another time
              </label>
            </div>
            <div className="toggle-item">
              <Switch
                checked={tourBuilderState.snooze_button_text === null ? false : true}
                onChange={(checked) =>
                  setTourBuilderState((prev) => ({
                    ...prev,
                    snooze_button_text: checked ? '' : null,
                  }))
                }
                size="small"
                id="custom-text"
              />
              <div className="label-with-icon">
                <label htmlFor="custom-text" className="toggle-label">
                  Use custom button text
                </label>
                <Tooltip title="Customize the text that appears on the button">
                  <LuInfo className="info-icon" />
                </Tooltip>
              </div>
            </div>
            {tourBuilderState.snooze_button_text !== null && (
              <Input
                value={tourBuilderState.snooze_button_text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTourBuilderState((prev) => ({
                    ...prev,
                    snooze_button_text: e.target.value,
                  }))
                }
                variant="dark"
                size="sm"
                placeholder="type your text"
                type={'text'}
              />
            )}
          </div>
        </div>

        {/* Restart Tour Section */}
        <div className="tour-settings-section restart-tour">
          <div className="section-header">
            <h2 className="section-title">Restart tour</h2>
            <span className="new-badge">New</span>
          </div>
          <div className="toggle-group">
            <div className="toggle-item">
              <Switch
                checked={tourBuilderState.restartable}
                onChange={(checked) =>
                  setTourBuilderState((prev) => ({
                    ...prev,
                    restartable: checked,
                  }))
                }
                size="small"
                id="add-button-steps"
              />
              <label htmlFor="add-button-steps" className="toggle-label">
                Add a button to all subsequent steps to let users start the tour again
              </label>
            </div>
            <div className="toggle-item">
              <div className="label-with-icon">
                <Switch
                  checked={tourBuilderState.restart_button_text === null ? false : true}
                  onChange={(checked) =>
                    setTourBuilderState((prev) => ({
                      ...prev,
                      restart_button_text: checked ? '' : null,
                    }))
                  }
                  size="small"
                  id="custom-text-restart"
                />
                <label htmlFor="custom-text-restart" className="toggle-label">
                  Use custom button text
                </label>
                <Tooltip title="Customize the text that appears on the button">
                  <LuInfo className="info-icon" />
                </Tooltip>
              </div>
            </div>
            {tourBuilderState.restart_button_text !== null && (
              <Input
                value={tourBuilderState.restart_button_text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTourBuilderState((prev) => ({
                    ...prev,
                    restart_button_text: e.target.value,
                  }))
                }
                variant="dark"
                size="sm"
                placeholder="type your text"
                type={'text'}
              />
            )}
          </div>
        </div>

        {/* Celebrate Completion Section */}
        <div className="tour-settings-section celebrate-completion">
          <div className="section-header">
            <h2 className="section-title">Celebrate completion</h2>
          </div>
          <div className="toggle-group">
            <div className="toggle-item">
              <Switch
                checked={tourBuilderState.end_tour_animation === 'confetti' ? true : false}
                onChange={(checked) => {
                  checked && handleTurnOnConfitti()
                  setTourBuilderState((prev) => ({
                    ...prev,
                    end_tour_animation: checked ? 'confetti' : 'noanimation',
                  }))
                }}
                size="small"
                id="confetti"
              />
              <label htmlFor="confetti" className="toggle-label">
                Send confetti on the last step
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
