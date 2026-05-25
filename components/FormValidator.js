class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formElement = formElement;
  }
const showInputError = (this._formElement, inputElement, errorMessage, ) => {
  const errorElementId = `#${inputElement.id}-error`;
  const errorElement = this._formElement.querySelector(errorElementId);
  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._errorClass);
};

const hideInputError = (this._formElement, inputElement, ) => {
  const errorElementId = `#${inputElement.id}-error`;
  const errorElement = this._formElement.querySelector(errorElementId);
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = "";
};


  _checkInputValidity = (this._formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(
        this._formElement,
        inputElement,
        inputElement.validationMessage
       
      );
    } else {
      hideInputError(this._formElement, inputElement);
    }
  };

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector),
    );
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector,
    );

    toggleButtonState(this._inputList, buttonElement);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this._formElement, inputElement);
        toggleButtonState(this._inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
  resetValidation();
}


export default FormValidator;
