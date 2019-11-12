import { PureComponent } from 'react';

export default (creator, initializer = null) => {

  let initialized = false;
  const listeners = [];
  const stateValue = {};

  const addListener = obj => listeners.push(obj);

  const createState = component => {
    const propsGetterObj = {
      get getter() {
        return component.props;
      }
    };
    return creator(
      stateValue,
      setState,
      propsGetterObj.getter,
    );
  };

  const removeListener = obj => listeners.splice(
    listeners.findIndex(item => item === obj),
    1,
  );

  const setState = (changes, callback) => {
    updateState(changes);
    listeners.forEach((listener, index) => {
      if (index === listeners.length - 1) {
        listener.forceUpdate(callback);
      } else {
        listener.forceUpdate();
      }
    });
  };

  const updateState = changes =>
    Object.entries(changes).forEach(([key, value]) => stateValue[key] = value);

  return class extends PureComponent {

    constructor(props) {
      super(props);
      if (!initialized) {
        initialized = true;
        updateState(createState(this));
        if (initializer) {
          setTimeout(() => initializer(stateValue, setState, this.props));
        }
      }
      addListener(this);
    }

    componentWillUnmount() {
      removeListener(this);
    }

    render() {
      return typeof this.props.children === 'function'
        ? this.props.children(stateValue)
        : this.props.children;
    }
  }
}