interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className={'progressBarContainer'}>
      <div className={'progressBarFill'} style={{ width: `${progress}%` }} />
    </div>
  )
}
