// view.js
export function createUserView() {
  const body = document.body;
  const table = document.querySelector(".app-list");
  const pageCounter = document.querySelector(".table_counter");
  const modal = document.querySelector(".popup-user__info");
  const modalName = modal.querySelector("h3 span");
  const modalImg = modal.querySelector(".popup-user__item-img");
  const modalNoPhoto = modal.querySelector(".popup-user__no-photo");
  const modalData = modal.querySelectorAll(".popup-user__item-data");
  const modalClose = modal.querySelector(".popup-user__close-btn");

  function renderUsers(users, page) {
    table.innerHTML = "";
    pageCounter.textContent = page;

    if (!users.length) {
      table.innerHTML = `<tr><td colspan="9">Нет данных</td></tr>`;
      return;
    }

    users.forEach(user => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${user.lastName}</td>
        <td>${user.firstName}</td>
        <td>${user.maidenName || "-"}</td>
        <td>${user.age}</td>
        <td>${user.gender}</td>
        <td>${user.phone}</td>
        <td>${user.email}</td>
        <td>${user.address.country}</td>
        <td>${user.address.city}</td>
      `;

      row.addEventListener("click", () => showModal(user));
      table.appendChild(row);
    });
  }

  function showModal(user) {
    body.classList.add("_no-overflow");
    modal.classList.remove("_none");

    modalName.textContent =
      `${user.firstName} ${user.maidenName} ${user.lastName}`;

    if (user.image) {
      modalImg.src = user.image;
      modalNoPhoto.classList.add("_none");
    } else {
      modalNoPhoto.classList.remove("_none");
    }

    const data = [
      `${user.address.country}, ${user.address.city}, ${user.address.address}`,
      user.age,
      `${user.height} см`,
      `${user.weight} кг`,
      user.phone,
      user.email
    ];

    modalData.forEach((el, i) => {
      el.textContent = data[i];
      if (el.tagName === "A") el.href = "mailto:" + data[i];
    });
  }

  function bindCloseModal() {
    modalClose.addEventListener("click", () => {
      body.classList.remove("_no-overflow");
      modal.classList.add("_none");
      modalImg.src = "";
    });
  }

  return {
    renderUsers,
    bindCloseModal
  };
}
