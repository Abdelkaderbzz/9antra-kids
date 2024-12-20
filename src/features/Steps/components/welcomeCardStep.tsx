'use client'

import { Card } from 'antd'

interface WelcomeCardProps {
  name: string
  onStart: () => void
}

export default function WelcomeCard({ name, onStart }: WelcomeCardProps) {
  return (
    <Card className={'card'}>
      <div className={'content'}>
        <h1 className={'title'}>
          <div className={'greeting'}>
            Bienvenue{' '}
            <span role="img" aria-label="waving hand">
              👋
            </span>{' '}
            chez 9antra Kids,
          </div>
          <div className={'name'}>{name} !</div>
        </h1>

        <p className={'description'}>
          Pour personnaliser votre expérience, nous vous poserons quelques questions.
        </p>

        <button onClick={onStart} className={'star-button-step'}>
          Commencer
        </button>
      </div>
    </Card>
  )
}
