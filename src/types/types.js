import PropTypes from "prop-types";

const artistQuestionType = PropTypes.shape({
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      picture: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
    })
  ),
  song: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }),
  type: PropTypes.oneOf([`artist`]).isRequired,
}).isRequired;

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
  artistQuestionType,
  genreQuestionType
};
