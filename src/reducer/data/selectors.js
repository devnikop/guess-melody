import {createSelector} from 'reselect';
import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.DATA;

const getQuestions = (state) => {
  return state[NAME_SPACE].questions;
};

const getGenreQuestions = createSelector(
    getQuestions,
    (questions) => questions.filter((it) => it.type === `genre`)
);

export {
  getGenreQuestions,
  getQuestions,
};
