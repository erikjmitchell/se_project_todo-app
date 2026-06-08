import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import TodoCounter from "../components/TodoCounter.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";

import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");

const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");
const addTodoForm = document.querySelector("#add-todo-form");

const todoTemplateSelector = "#todo-template";
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const renderTodo = (item) => {
  const todo = generateTodo(values);
  section.addItem(todo);
};

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };

    addTodoPopup.close();
    newTodoValidator.resetValidation();
    todoCounter.updateTotal(true);
  },
});

addTodoPopup.setEventListeners();

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  todoCounter.updateTotal(false);
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

const generateTodo = (data) => {
  const todo = new Todo(data, todoTemplateSelector, handleCheck, handleDelete);
  const todoElement = todo.getView();

  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});
section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});
initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
