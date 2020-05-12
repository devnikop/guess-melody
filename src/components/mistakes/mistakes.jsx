import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

const MAX_MISTAKES = 3;

const Mistakes = ({ mistakes }) => {
  return <div className="game__mistakes">
    {[...Array(MAX_MISTAKES)].map((item, index) =>
      (<div
        className={`${index < mistakes ? `wrong` : `correct`}`}
        key={`mistake-${index}`}
      />)
    )}
  </div>
};

Mistakes.propTypes = {
  mistakes: PropTypes.number.isRequired
}

export { Mistakes };

const mapStateToProps = (state) => {
  return {
    mistakes: state.mistakes
  }
}

export default connect(mapStateToProps)(Mistakes);
