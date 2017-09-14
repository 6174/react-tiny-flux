import { Component } from 'react'
import M from "immutable";
class ReactTinyFlux extends Component {
  static defaultProps = {
    initial: {},
    asyncActions: {},
    actions: {}
  }

  state = {
    data: M.fromJS(this.props.initial)
  }


  dispatch = (action) => {
    const asyncActions = this.props.asyncActions;

    if (asyncActions[action.type]) {
      asyncActions[action.type](this.state.data, action, this.dispatch)
      return
    }

    const data = this.handleAction(this.state.data, action)
    this.setState({
      data
    })
  }

  handleAction = (state, action) => {

    const reducers = this.actions;

    // action is an array
    if (action instanceof Array) {
      return action.reduce((state, action) => {
        return this.handleAction(state, action);
      }, state);
    }

    const type = action.type;
    if (!reducers[type]) {
      return state
    }

    return reducers[type](state, action);
  }

  setState = this.setState.bind(this)

  render() {
    return this.props.children({
      _state: this.state,
      state: this.state.data,
      setState: this.setState,
      dispatch: this.dispatch
    })
  }
}

export default ReactTinyFlux
