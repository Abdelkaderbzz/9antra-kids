export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

export interface QuizState {
  currentQuestion: number
  answers: Record<number, number>
  timeRemaining: number
  isComplete: boolean
}
