import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.GAME;

const getMistakes = (state) => {
  return state[NAME_SPACE].mistakes;
};

const getStep = (state) => {
  return state[NAME_SPACE].step;
};

export {
  getMistakes,
  getStep,
};
