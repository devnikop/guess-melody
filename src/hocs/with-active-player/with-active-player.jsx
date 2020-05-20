import React from "react";

const withActivePlayer = (Component) => {
  class WithActivePlayer extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: -1,
      };

      this._handlePlayClick = this._handlePlayClick.bind(this);
    }

    render() {
      const { activePlayer } = this.state;

      return <Component
        {...this.props}
        activePlayer={activePlayer}
        onPlayButtonClick={this._handlePlayClick}
      />
    }

    _handlePlayClick(index) {
      const { activePlayer } = this.state;

      this.setState({
        activePlayer: (activePlayer === index) ? -1 : index,
      })
    }
  }

  return WithActivePlayer;
}

export default withActivePlayer;
