import './assets/style.css';

import { createUserModel } from "./components/model.js";
import { createUserView } from "./components/view.js";
import { createUserController } from "./components/logic.js";

const model = createUserModel();
const view = createUserView();
const controller = createUserController(model, view);

document.addEventListener("DOMContentLoaded", controller.init);

document.querySelector(".sort_order")
  .addEventListener("change", e => controller.setOrder(e.target.value));

document.querySelector(".sort_name")
  .addEventListener("change", e => controller.setSort(e.target.value));

document.querySelector(".btn-right")
  .addEventListener("click", controller.nextPage);

document.querySelector(".btn-left")
  .addEventListener("click", controller.prevPage);

document.querySelector(".sort-table")
  .addEventListener("click", controller.update);

document.querySelector(".unsort-table")
  .addEventListener("click", () => controller.setSort(""));
