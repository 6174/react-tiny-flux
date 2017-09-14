# react-tiny-flux
The simplest flux implementation

# Example

```jsx
import M from "immutable";

const actions = {
  "todo-app/add-todo-item": (state, action) => {
    return state.set("todos", state.get("todos").push(M.fromJS(action.payload)));
  },
  "todo-app/load/todos": (state, action) => {
    return state.set("loading", true)
  },
  "todo-app/load/todos/success": (state, action) => {
    return state
      .set("todos", M.fromJS(action.payload))
      .set("loading", false)
  }
};

const asyncActions = {
  "todo-app/load-remote-todos": async (state, action, dispatch) => {
    try {
      const ret = await fetch(`//remote-todo-api`)
      dispatch({
        type: "todo-app/load/todos/success",
        payload: ret
      })
    } catch(err) {
      console.log(err)
    }
  }
};

<ReactTinyFlux
  initial={{ todos: [], loading: false }}
  actions={actions}
  asyncActions={asyncActions}>
  {({ state, dispatch }) => (
    <TodoApp
      todos={state.get("todos")}
      addTodo={todoItem => {
          dispatch({
            type: "todo-app/add-todo-item",
            payload: todoItem
          })
      }}
      loadRemoteTodos={ev => {
          dispatch({
            type: "todo-app/load-remote-todos"
          })
      }}
    />
  )}
</ReactTinyFlux>
```
