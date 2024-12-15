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
  {
    id: 3,
    question: 'Which attribute is used in HTML to specify an image source?',
    options: ['src', 'alt', 'href', 'source'],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: 'What does CSS stand for?',
    options: [
      'Cascading Style Sheets',
      'Creative Style Syntax',
      'Computer Style Sheets',
      'Cascading Syntax Sheets',
    ],
    correctAnswer: 0,
  },

]

