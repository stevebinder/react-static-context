

Often in React applications we want to create a **global context** or **store** which is initialized once and can be referenced from anywhere in the app without using providers (a singleton). The **createStaticContext** method allows us to create a HOC to reference a static context without any provider/consumer pattern. It is most helpful as a global store for an application, or section of an application.

In the following example we create a static context **MyStaticContext** and use it to wrap two components. When either component calls **addValue**, both components will update because they reference the same context. Remember, the context is only initialized once per application which allows us to use it as a global store.

```
import { render } from 'react-dom';
import { createStaticContext, withStaticContext } from 'react-static-context';

const MyStaticContext = createStaticContext((state, setState) => ({

  values: [1, 2, 3],

  addValue: value => setState({
    values: [...state.values, value],
  }),

}));

const MyComponent = ({ addValue, name, values }) => (
  <div>
    <h1>Hello {name}</h1>
    <p>The current values are {values.join(',')}</p>
    <button onClick={() => addValue(4)}>Add</button>
  </div>
);

const MyContainer = withStaticContext(
  MyComponent,
  MyStaticContext,
  (context, props) => ({
    addValue: context.addValue,
    name: props.name,
    values: context.values,
  }),
);

render(
  document.getElementById('root'),
  <div>
    <MyComponent1 />
    <MyComponent2 />
  </div>
);
```