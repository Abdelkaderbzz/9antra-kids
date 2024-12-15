import { Question } from './types'

export const questions: Question[] = [
  {
    id: 1,
    question: 'What is the preferred way for adding a background color in HTML?',
    options: [
      'background-color: #fff;',
      "bgcolor='white'",
      "style='background-color: white'",
      'bg-color: white;',
    ],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: 'Which HTML tag is used to create a hyperlink?',
    options: ['<link>', '<a>', '<href>', '<url>'],
    correctAnswer: 1,
  },
  // Add more questions as needed
]
