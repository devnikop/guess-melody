import React, {PureComponent} from 'react';

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: -1,
      };
    }

    render() {
      const {activePlayer} = this.state;

      return <Component
        {...this.props}
        activePlayer={activePlayer}
        onPlayButtonClick={(i) =>
          this.setState({
            activePlayer: this.state.activePlayer === i ? -1 : i
          })}
      />;
    }
  }
  return WithActivePlayer;
};

export default withActivePlayer;
