document.addEventListener("DOMContentLoaded", () => {
  let orderValue = "asc";
  let paginationCount = 0;

  function fetchFunc() {
    const url = getUsersList(orderValue, paginationCount);
    // console.log(url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let users = data.users;
        let table = document.querySelector(".app-list");
        if (!table) return;
        table.innerHTML = "";

        users.forEach((user) => {
          table.appendChild(getUsersTable(user));
        });
      })
      .catch((error) => {
        console.log("Ошибка: ", error);
        document.getElementById("app").textContent = "Ошибка загрузки!";
      });
  }
  fetchFunc();

  function getUsersList(orderValue, paginationCount) {
    let objUrl = {
      base: "https://dummyjson.com/users",
      limit: "limit=10",
      skip: `skip=${paginationCount}`,
      sort: "sortBy=firstName",
      order: `order=${orderValue}`,
    };

    let baseUrl = objUrl.base;
    let params = [];

    for (let item in objUrl) {
      if (item != "base") {
        params.push(objUrl[item]);
      }
    }

    return baseUrl + "?" + params.join("&");
  }

  function getUsersTable(user) {
    let row = document.createElement("tr");
    row.innerHTML = `<td>${user.id}</td>
                  <td>${user.firstName}</td>
                  <td>${user.lastName}</td>
                  <td>${user.maidenName || "-"}</td>
                  <td>${user.gender}</td>
                  <td>${user.age}</td>
                  <td>${user.email}</td>
                  <td>${user.phone}</td>`;
    return row;
  }

  
  const orderBtn = document.querySelector(".sort");
  orderBtn.textContent = `Sort: ${orderValue.toLocaleLowerCase()}`;

  orderBtn.addEventListener("click", () => {
    orderValue = orderBtn.dataset.order === "asc" ? "desc" : "asc";
    orderBtn.dataset.order = orderValue;
    orderBtn.textContent = `Sort: ${orderValue.toLocaleLowerCase()}`;

    fetchFunc();
  });


  const btnLeft = document.querySelector(".btn-left");
  const btnRight = document.querySelector(".btn-right");

  btnLeft.addEventListener("click", () => {
    paginationCount = paginationCount - 10;
    if (paginationCount < 0) {
      paginationCount = 0;
    }
    fetchFunc();
  });
  btnRight.addEventListener("click", () => {
    paginationCount = paginationCount + 10;
    fetchFunc();
  });

  // FORM
  // const form = document.querySelector(".form_search");

  // form.addEventListener("submit", (e) => {
  //   e.preventDefault();
  //   console.log(e.target.name.value);
  //   if (!filter) {
  //     // getUsersList(orderValue, paginationCount, filter);
  //   }
  // });
});
