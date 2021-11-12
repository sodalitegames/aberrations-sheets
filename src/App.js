import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { RecoilRoot, atom, selector, useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

import { getCurrentUser } from './recoil/user/user.selectors';
// import SlideOver from './layouts/components/app/SlideOver';
// import Modal from './layouts/components/app/Modal';
// import Notification from './layouts/components/app/Notification';

//import './App.css';

const todoListState = atom({
  key: 'todoListState',
  default: [],
});

const speciesState = atom({
  key: 'speciesState',
  default: [],
});

const getSpeciesSync = selector({
  key: 'getSpeciesSync',
  get: ({ get }) => {
    return [{ name: 'Freemaker' }];
  },
});

function Species() {
  const currentUser = useRecoilValue(getCurrentUser);
  return <div>{JSON.stringify(currentUser)}</div>;
}

function App() {
  const currentUser = useRecoilValue(getCurrentUser);

  console.log('Current User:', currentUser);

  if (!currentUser) {
    return <div>You need to log in to your account to proceed.</div>;
  }

  return (
    <>
      <Outlet />
      {/* <SlideOver />
      <Modal />
      <Notification /> */}
    </>
  );
}

export default App;

function TodoList() {
  const todoList = useRecoilValue(todoListState);

  return (
    <>
      {/* <TodoListStats /> */}
      {/* <TodoListFilters /> */}
      <TodoItemCreator />

      {todoList.map(todoItem => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
}

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList(oldTodoList => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue('');
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

// utility for creating unique Id
let id = 0;
function getId() {
  return id++;
}

function TodoItem({ item }) {
  const [todoList, setTodoList] = useRecoilState(filteredTodoListState);
  const index = todoList.findIndex(listItem => listItem === item);

  const editItemText = ({ target: { value } }) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input type="checkbox" checked={item.isComplete} onChange={toggleItemCompletion} />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

const todoListFilterState = atom({
  key: 'todoListFilterState',
  default: 'Show All',
});

const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case 'Show Completed':
        return list.filter(item => item.isComplete);
      case 'Show Uncompleted':
        return list.filter(item => !item.isComplete);
      default:
        return list;
    }
  },
});
