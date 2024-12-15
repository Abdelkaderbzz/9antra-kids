import { useState } from 'react'
import { CategorySelection } from './category-selection'
import { Step, FormData, Category } from './types'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from 'antd'
import { ProgressBar } from './progress-bar'
import WelcomeCard from './welcomeCardStep'
import conan from '@assets/images/auth/conan.svg'
import onepiece from '@assets/images/auth/onepiece.svg'
import mimecraft from '@assets/images/auth/minecraft.svg'
import adv from '@assets/images/auth/adv.svg'
import lofi from '@assets/images/auth/lofi.svg'
import zoro from '@assets/images/auth/zoro.svg'
import nami from '@assets/images/auth/nami.svg'
import usofo from '@assets/images/auth/usofo.svg'
import char1 from '@assets/images/auth/char1.svg'
import sanji from '@assets/images/auth/sanji.svg'
import char2 from '@assets/images/auth/char2.svg'
import char3 from '@assets/images/auth/char3.svg'
import { useNavigate } from 'react-router-dom'
const STEPS: Step[] = [
  {
    id: 0,
    title: '',
    description: '',
  },
  {
    id: 1,
    title: 'Choisissez votre thème',
    description: '',
  },
  {
    id: 2,
    title: 'Which category do you prefer?',
    description: 'Select your interests',
  },
]

const CATEGORIES: Category[][] = [
  [
    { id: 1, name: 'Category 1', image: conan },
    { id: 2, name: 'Category 2', image: onepiece },
    { id: 3, name: 'Category 3', image: mimecraft },
    { id: 4, name: 'Category 4', image: adv },
  ],
  [
    { id: 1, name: 'Category 1', image: lofi },
    { id: 22, name: 'Category 2', image: sanji },
    { id: 33, name: 'Category 2', image: nami },
    { id: 44, name: 'Category 2', image: usofo },
    { id: 55, name: 'Category 2', image: zoro },
    { id: 66, name: 'Category 2', image: char1 },
    { id: 77, name: 'Category 2', image: char2 },
    { id: 773, name: 'Category 2', image: char3 },
  ],
]

export function OnboardingForm() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    selectedCategories: [],
    preferences: {},
  })

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1)
    } else {
      navigate('/courses')
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleCategorySelect = (categoryId: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter((id) => id !== categoryId)
        : [...prev.selectedCategories, categoryId],
    }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeCard name="ahmed" onStart={() => setCurrentStep((prev) => prev + 1)} />
      case 2:
        return (
          <CategorySelection
            categories={CATEGORIES[0]}
            selectedCategories={formData.selectedCategories}
            onSelect={handleCategorySelect}
          />
        )
      case 3:
        return (
          <CategorySelection
            categories={CATEGORIES[1]}
            selectedCategories={formData.selectedCategories}
            onSelect={handleCategorySelect}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="onboarding-form">
      <div className="progress-bar">
        <ProgressBar currentStep={currentStep} totalSteps={STEPS.length} />
      </div>
      <div className="step-header">
        <h2>{STEPS[currentStep - 1].title}</h2>
        {STEPS[currentStep - 1].description && <p>{STEPS[currentStep - 1].description}</p>}
      </div>
      <div className="step-content">{renderStep()}</div>
      <div className="button-group">
        <Button onClick={handlePrevious} disabled={currentStep === 1}>
          <ArrowLeft className="icon" />
          Previous
        </Button>
        <Button onClick={handleNext}>
          {currentStep === STEPS.length ? 'Finish' : 'Next'}
          <ArrowRight className="icon reverse" />
        </Button>
      </div>
    </div>
  )
}
