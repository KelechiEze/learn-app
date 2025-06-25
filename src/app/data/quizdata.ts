interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
}

export const quizQuestions: QuizQuestion[] = [
  // English Questions
  {
    id: 1,
    question: "What is a noun?",
    options: ["A describing word", "A person, place, or thing", "An action word", "A joining word"],
    correctAnswer: 1,
    subject: "English"
  },
  {
    id: 2,
    question: "Which word is a verb?",
    options: ["Happy", "Running", "Blue", "Chair"],
    correctAnswer: 1,
    subject: "English"
  },
  
  // Mathematics Questions
  {
    id: 3,
    question: "What is 5 + 3?",
    options: ["6", "7", "8", "9"],
    correctAnswer: 2,
    subject: "Mathematics"
  },
  {
    id: 4,
    question: "What is 10 - 4?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 1,
    subject: "Mathematics"
  },
  
  // Verbal Reasoning Questions
  {
    id: 5,
    question: "Which word doesn't belong: Cat, Dog, Fish, Car?",
    options: ["Cat", "Dog", "Fish", "Car"],
    correctAnswer: 3,
    subject: "Verbal Reasoning"
  },
  {
    id: 6,
    question: "If all birds can fly, and a robin is a bird, then:",
    options: ["Robins cannot fly", "Robins can fly", "Robins are not birds", "None of the above"],
    correctAnswer: 1,
    subject: "Verbal Reasoning"
  },
  
  // French Questions
  {
    id: 7,
    question: "What does 'Bonjour' mean?",
    options: ["Good night", "Hello", "Goodbye", "Thank you"],
    correctAnswer: 1,
    subject: "French"
  },
  {
    id: 8,
    question: "How do you say 'cat' in French?",
    options: ["Chien", "Chat", "Oiseau", "Poisson"],
    correctAnswer: 1,
    subject: "French"
  },
  
  // Literature Questions
  {
    id: 9,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1,
    subject: "Literature"
  },
  {
    id: 10,
    question: "What is a haiku?",
    options: ["A long story", "A type of poem", "A play", "A song"],
    correctAnswer: 1,
    subject: "Literature"
  },
  
  // CRS Questions
  {
    id: 11,
    question: "How many disciples did Jesus have?",
    options: ["10", "11", "12", "13"],
    correctAnswer: 2,
    subject: "CRS"
  },
  {
    id: 12,
    question: "What is the first book in the Bible?",
    options: ["Exodus", "Genesis", "Leviticus", "Numbers"],
    correctAnswer: 1,
    subject: "CRS"
  },
  
  // Vocational Questions
  {
    id: 13,
    question: "What tool is used to measure length?",
    options: ["Scale", "Ruler", "Thermometer", "Clock"],
    correctAnswer: 1,
    subject: "Vocational"
  },
  {
    id: 14,
    question: "Which is a safety equipment?",
    options: ["Hammer", "Helmet", "Pencil", "Book"],
    correctAnswer: 1,
    subject: "Vocational"
  }
];
