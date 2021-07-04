import {
  _getUsers,
  _getQuestions,
  _saveQuestionAnswer,
  _saveQuestion
} from './_DATA.js';

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions
    })
  );
}

export function saveQuestionAnswerApi(answer) {
  return _saveQuestionAnswer(answer);
}

export function saveQuestionApi(question) {
  return _saveQuestion(question);
}
