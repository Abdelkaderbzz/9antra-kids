'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button, Card } from 'antd'

import { Timer } from '../timer/timer'
import { ProgressBar } from '../progressbar/pressbar'
import { questions } from '../quizz-data'
import { QuizState } from '../types'
import { useNavigate } from 'react-router-dom'

const TIMER_DURATION = 10

export function Quiz() {
  const navigate = useNavigate()
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    timeRemaining: TIMER_DURATION,
    isComplete: false,
  })

  useEffect(() => {
    if (!state.isComplete && state.timeRemaining > 0) {
      const timer = setInterval(() => {
        setState((prev) => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [state.timeRemaining, state.isComplete])

  const handleAnswer = (answerIndex: number) => {
    setState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [prev.currentQuestion]: answerIndex,
      },
    }))
  }

  const handleNext = () => {
    if (state.currentQuestion < questions.length - 1) {
      setState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        timeRemaining: TIMER_DURATION,
      }))
    } else {
      setState((prev) => ({
        ...prev,
        isComplete: true,
      }))
    }
  }

  const handleTimeUp = () => {
    handleNext()
  }

  if (state.isComplete) {
    const correctAnswers = Object.entries(state.answers).filter(
      ([questionIndex, answerIndex]) =>
        questions[Number(questionIndex)].correctAnswer === answerIndex,
    ).length

    return (
      <div className="quiz__complete">
        <h2>Quiz Complete!</h2>
        <p>
          You got {correctAnswers} out of {questions.length} correct!
        </p>
        <Button
          style={{ marginRight: '10px' }}
          onClick={() =>
            setState({
              currentQuestion: 0,
              answers: {},
              timeRemaining: TIMER_DURATION,
              isComplete: false,
            })
          }
        >
          Restart Quiz
        </Button>
        <Button onClick={() => navigate('/leagues')}>navigate to leagues</Button>
      </div>
    )
  }

  const currentQuestion = questions[state.currentQuestion]

  return (
    <div className="quiz">
      <div className="quiz__header">
        <h1>Quiz App</h1>
        <Timer timeRemaining={state.timeRemaining} onTimeUp={handleTimeUp} />
      </div>

      <ProgressBar progress={state.currentQuestion + 1} total={questions.length} />

      <div className="quiz__content">
        <h2>{currentQuestion.question}</h2>

        <div className="quiz__options">
          {currentQuestion.options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`quiz__option ${
                  state.answers[state.currentQuestion] === index ? 'quiz__option--selected' : ''
                }`}
                onClick={() => handleAnswer(index)}
              >
                <div className="quiz__option-content">
                  <span>{option}</span>
                  <span>{index + 1}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="quiz__actions">
          <Button onClick={() => window.location.reload()}>Rapport</Button>
          <Button onClick={handleNext}>
            {state.currentQuestion === questions.length - 1 ? 'Finish' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  )
}
