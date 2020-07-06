import React, { useState, KeyboardEvent, MouseEvent } from 'react';
import classNames from 'classnames';

export interface ITodoItemPropsInterface {
  text: string;
  completed: boolean;
  onToggleComplete: (checked: boolean) => void;
  onTodoDelete: () => void;
  onTodoEdit: (text: string) => void;
}

let uniqId = 1;
export function Todo({ onToggleComplete, completed, text, onTodoDelete, onTodoEdit }: ITodoItemPropsInterface) {
  const [editAble, setEditAble] = useState(false);
  let inputRef: HTMLInputElement | null = null;

  const liClassName = classNames({
    completed: completed,
    editing: editAble,
  });

  const onDbClick = (e: MouseEvent) => {
    if (completed) {
      return;
    }
    e.preventDefault();
    setEditAble(!editAble);
    setTimeout(() => {
      if (inputRef && editAble) {
        inputRef.focus();
      }
    });
  };

  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef) {
      setEditAble(!editAble);
      onTodoEdit(inputRef.value);
    }
  };
  const id = `random-id${uniqId++}`;

  return (
    <li className={liClassName}>
      <div className="view">
        <input
          id={id}
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={e => {
            onToggleComplete(e.currentTarget.checked);
          }}
        />
        <label htmlFor={id} onDoubleClick={onDbClick}>
          {text}
        </label>
        <button className="destroy" onClick={onTodoDelete}></button>
      </div>
      <input ref={r => (inputRef = r)} className="edit" defaultValue={text} onKeyPress={onKeyPress} />
    </li>
  );
}
