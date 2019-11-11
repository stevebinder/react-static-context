import React, { PureComponent } from 'react';

export default (Component, Context, getter) => {
  const creator = typeof getter === 'function'
    ? (c, p) => getter(c, p)
    : c => getter.reduce(
        (result, key) => ({
          ...result,
          [key]: c[key],
        }),
        {},
      );
  class WrapperComponent extends PureComponent {
    render() {
      return <Component {...this.props} />
    }
  }
  return props => (
    <Context>
    {context => (
      <WrapperComponent
        {...props}
        {...creator(context, props)}
      />
    )}
    </Context>
  );
};