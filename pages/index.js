import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const initialTodos = [
  {
    id: "7cec7373-681b-49d9-b065-021d61a69d03",
    name: "Read the sprint's theory",
    completed: true,
    date: new Date(),
  },
  {
    id: "a7bfd5ef-37cc-4fa6-89f2-cac098a8aeba",
    name: "Read project instructions",
    completed: false,
    date: new Date(),
  },
  {
    id: "aa486839-63ab-437f-b8a2-29ab217dff4f",
    name: "Complete project",
    completed: false,
    date: new Date(),
  },
];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  errorClass: "popup__error_visible",
  inputErrorClass: "popup__input_type_error",
  inactiveButtonClass: "button_disabled",
};

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
const todo = new Todo(data, "#todo-template" );
const todoElement =todo.getView();
return todoElement;


addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  const todo = generateTodo(values);
  todosList.append(todo);
  closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo); 
}); 

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();