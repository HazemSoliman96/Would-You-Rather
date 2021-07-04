import {
  getInitialData,
  saveQuestionApi,
  saveQuestionAnswerApi
} from '../utils/api';
import { Users, saveUserAnswer, saveUserQuestion } from './users';
import { Questions, saveQuestion, saveQuestionAnswer } from './questions';

export function InitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(Users(users));
      dispatch(Questions(questions));
    });
  };
}

export function handleSaveQuestion(author) {
  console.log(author);
  const question = {
    author: author.author,
    optionOneText: author.optionOne,
    optionTwoText: author.optionTwo
  };
  return (dispatch) => {
    return saveQuestionApi(question).then((q) => {
      dispatch(saveQuestion(q));
      dispatch(saveUserQuestion(q.author, q.id));
    });
  };
}

export function handleAnswer(User, id, answer) {
  return (dispatch) => {
    dispatch(saveQuestionAnswer(User, id, answer));
    dispatch(saveUserAnswer(User, id, answer));
    return saveQuestionAnswerApi({
      User: User,
      id: id,
      answer: answer
    });
  };
}
