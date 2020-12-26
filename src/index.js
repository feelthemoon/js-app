import "./styles.css";
import { createModal, isValid } from "./utils";
import { Question } from "./question";
import { authWithEmailAndPassword, getAuthForm } from "./auth";
const form = document.getElementById("form");
const input = form.querySelector("#question-input");
const btnSubmit = form.querySelector("#submit");
const btnModal = document.getElementById("modal-btn");

const submitFormHandler = async (e) => {
  e.preventDefault();
  if (isValid(input.value.trim())) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };
    btnSubmit.disabled = true;
    await Question.create(question);
    input.value = "";
    input.className = "";
  }
};

const renderAfterAuth = (content) => {
  createModal("Your questions list", Question.toHTML(content));
};
const authFormHandler = async (e) => {
  e.preventDefault();
  const email = e.target.querySelector("#email").value;
  const btn = e.target.querySelector("button");
  btn.disabled = true;
  const password = e.target.querySelector("#password").value;
  try {
    const token = await authWithEmailAndPassword({ email, password });
    await Question.fetch(token).then(renderAfterAuth);
  } catch (err) {
    createModal("Error!", err.message);
    btn.disabled = false;
  }
};

const openModal = () => {
  createModal("Authorization", getAuthForm());
  document
    .getElementById("auth-form")
    .addEventListener("submit", authFormHandler);
};

form.addEventListener("submit", submitFormHandler);
input.addEventListener("input", () => {
  btnSubmit.disabled = !isValid(input.value.trim());
});
btnModal.addEventListener("click", openModal);
window.addEventListener("load", Question.renderList);
