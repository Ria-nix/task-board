document.addEventListener("DOMContentLoaded", () => {
  let userOrder = "asc";
  let userSkipCount = 0;

  let userTable = document.querySelector(".app-list");
  if (!userTable) return;

  function showUserTable() {
    const url = getUsersListUrl(userOrder, userSkipCount);
    // console.log(url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let users = data.users;
        userTable.innerHTML = "";

        users.forEach((user) => {
          userTable.appendChild(createUserRow(user));
        });
      })
      .catch((error) => {
        console.log("Ошибка: ", error);
        document.getElementById("app").textContent = "Ошибка загрузки!";
      });
  }
  showUserTable();

  function getUsersListUrl(userOrder, userSkipCount) {
    let objUrl = {
      base: "https://dummyjson.com/users",
      limit: "limit=10",
      skip: `skip=${userSkipCount}`,
      sort: "sortBy=firstName",
      order: `order=${userOrder}`,
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

  function createUserRow(user) {
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

  const userOrderBtn = document.querySelector(".sort");
  userOrderBtn.textContent = `Sort: ${userOrder.toLocaleLowerCase()}`;

  userOrderBtn.addEventListener("click", () => {
    userOrder = orderBtn.dataset.order === "asc" ? "desc" : "asc";
    userOrderBtn.dataset.order = userOrder;
    userOrderBtn.textContent = `Sort: ${userOrder.toLocaleLowerCase()}`;

    showUserTable();
  });


  const userPageBtnPrev = document.querySelector(".btn-left");
  const userPageBtnNext = document.querySelector(".btn-right");

  userPageBtnPrev.addEventListener("click", () => {
    userSkipCount = userSkipCount - 10;
    if (userSkipCount < 0) {
      userSkipCount = 0;
    }
    showUserTable();
  });
  userPageBtnNext.addEventListener("click", () => {
    userSkipCount = userSkipCount + 10;
    showUserTable();
  });

  // FORM
  // const form = document.querySelector(".form_search");

  // form.addEventListener("submit", (e) => {
  //   e.preventDefault();
  //   console.log(e.target.name.value);
  //   if (!filter) {
  //     // getUsersListUrl(userOrder, userSkipCount, filter);
  //   }
  // });
});
