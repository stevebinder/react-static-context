React applications often have one or many **stores** in addition to **actions** which manipulate that store. This usually consists of a higher provider wrapping consumers at lower levels who access the store or dispatch actions. Utility files and consumers nested outside the provider as often unable to acess the store or dispatch actions which leads to complicated issues.

The package outlined below provides a collection of methods that stand up a static store which can be accessed via HOC or plain object reference. In this way the store is reduced to a basic state/setState api which is familiar to react developers.

In the following example we create a static context with **createStaticContext** and use it to provide references to a component:

```js
import { createStaticContex } from 'react-static-context';

const MyStaticContext = createStaticContext((state, setState) => ({
  age: 30,
  increaseAge: years => setState({ age: state.age + years }),
}));

const MyComponent = ({ age, increaseAge, name }) => (
  <MyStaticContext>
  {context => (
    <div>
      <h1>Hello {name}!</h1>
      <p>Current age: {age}</p>
      <button onClick={() => increaseAge(1)}>
        Add 2
      </button>
    </div>
  )}
  </MyStaticContext>
);
```

Furthermore we can make this example more performant by using **withStaticContext** which wraps our component with PureComponent shallow comparison logic while also allowing us to pass references from our context:

```js
import { withStaticContext } from 'react-static-context';

withStaticContext(
  MyComponent,
  MyStaticContext,
  (context, props) => ({
    age: context.age,
    increaseAge: context.increaseAge,
    name: props.name,
  }),
);
```

We can also access the store from areas outside of React components:

```js
import MyStaticContext from './MyStaticContext';

const getCurrentAge = () => {
  const age = MyStaticContext.age;
  alert(`Current age is ${age}`);
};
```


Lastly, we can initilize our store with values if need be:

```js
import { createStaticContext } from 'react-static-context';

const MyStaticContext = createStaticContext(
  (state, setState) => ({
    age: 30,
    name: 'Bob',
  }),
  (state, setState) => {
    setState({
      age: state.age + 1,
    });
  },
);