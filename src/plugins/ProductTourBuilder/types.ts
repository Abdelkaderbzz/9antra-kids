interface Block {
  type: string
  text?: string
  items?: string[]
}

interface Selectors {
  auto_primary: string | null
  auto_secondary: string | null
  manual: string | null
}

interface Step {
  blocks: Block[]
  selector: string | null
  selectors: Selectors
  progression_behavior: number
  placement: number
  pointer_size: number
  button_text: string | null
  url: string
  order: number
  style: string
  url_button_value: string | null
}

export type Steps = Step[]

export type TourBuilderState = {
  steps: Steps
  insertable_url: string
  restartable: boolean
  restart_button_text: string | null
  snoozeable: boolean
  snooze_button_text: string | null
  end_tour_animation: 'confetti' | 'noanimation'
  button_color: string | null
}
