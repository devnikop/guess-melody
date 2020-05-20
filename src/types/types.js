import PropTypes from "prop-types";

const genreQuestionType = PropTypes.shape({
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      genre: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    })
  ).isRequired,
  genre: PropTypes.oneOf([`rock`, `pop`, `jazz`]).isRequired,
  type: PropTypes.oneOf([`genre`]).isRequired,
});

export {
  genreQuestionType
};
