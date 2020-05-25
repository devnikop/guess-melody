import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.GAME;

export const getCurrentQuestion = (state) => state[NAME_SPACE].currentQuestion;
export const getMistakes = (state) => state[NAME_SPACE].mistakes;
export const getErrorCount = (state) => state[NAME_SPACE].errorCount;
export const getGameTime = (state) => state[NAME_SPACE].gameTime;
