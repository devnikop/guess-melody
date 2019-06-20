import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createAPI} from '../../api';
import * as React from 'react';

import {ActionCreator} from '../../reducer/user/user';

interface Props {
  login: (state: any) => void,
}

interface State {
  email: any,
  password: any,
}

const withAuthorizationScreen = (Component) => {
  class WithAuthorizationScreen extends React.PureComponent<Props, State> {
    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``,
      };

      this._handleInputChange = this._handleInputChange.bind(this);
      this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        onInputChange={this._handleInputChange}
        onSubmit={this._handleFormSubmit}
      />;
    }

    _handleInputChange(evt, keyName) {
      this.setState({
        [keyName]: evt.target.value
      } as Pick<State, keyof State>);
    }

    _handleFormSubmit(evt) {
      evt.preventDefault();
      this.props.login(this.state);
    }
  }

  return WithAuthorizationScreen;
};

const mapDispatchToProps = (dispatch) => ({
  login: (formData) => {
    createAPI(dispatch)
      .post(`/login`, formData)
      .then((response) => {
        if (response.data) {
          dispatch(ActionCreator.login(response.data));
          dispatch(ActionCreator.requiredAuthorization(false));
          history.pushState(null, null, `/`);
        }
      });
  }
});

export default compose(
    connect(null, mapDispatchToProps),
    withAuthorizationScreen
);
