let orderValue = "asc";
let paginationCount = 0;

function fetchFunc(orderValue, paginationCount) {
    // console.log(orderValue, paginationCount);
  const url = `https://dummyjson.com/users?limit=10&skip=${paginationCount}&sortBy=firstName&order=${orderValue}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let users = data.users;
      let table = document.querySelector(".app-list");
      table.innerHTML = "";

      users.forEach((user) => {
        let row = document.createElement("tr");

        row.innerHTML = `<td>${user.id}</td>
                            <td>${user.firstName}</td>
                            <td>${user.lastName}</td>
                            <td>${user.maidenName || "-"}</td>
                            <td>${user.gender}</td>
                            <td>${user.age}</td>
                            <td>${user.email}</td>
                            <td>${user.phone}</td>`;

        table.appendChild(row);
      });
    })
    .catch((error) => {
      console.log("Ошибка: ", error);
      document.getElementById("app").textContent = "Ошибка загрузки!";
    });
}
fetchFunc(orderValue, paginationCount);

const orderBtn = document.querySelector(".sort");
orderBtn.textContent = `Sort: ${orderValue.toLocaleLowerCase()}`;

orderBtn.addEventListener("click", () => {
    orderValue = orderBtn.dataset.order === "asc" ? "desc" : "asc";
    orderBtn.dataset.order = orderValue;
    orderBtn.textContent = `Sort: ${orderValue.toLocaleLowerCase()}`;

    fetchFunc(orderValue, paginationCount);
});

const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");

btnLeft.addEventListener('click', () => {
  paginationCount = paginationCount - 10;
  if(paginationCount < 0) {
    paginationCount = 0;
  }
  fetchFunc(orderValue, paginationCount);
});
btnRight.addEventListener('click', () => {
  paginationCount = paginationCount + 10;
  fetchFunc(orderValue, paginationCount);
});