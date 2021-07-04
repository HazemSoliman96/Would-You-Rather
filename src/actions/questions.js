export const QUESTIONS = 'QUESTIONS';
export const SAVE_QUESTION = 'SAVE_QUESTION';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';

export function Questions(questions) {
  return {
    type: QUESTIONS,
    questions
  };
}

export function saveQuestion(question) {
  return {
    type: SAVE_QUESTION,
    question
  };
}

export function saveQuestionAnswer(User, id, answer) {
  return {
    type: SAVE_QUESTION_ANSWER,
    User,
    id,
    answer
  };
}
