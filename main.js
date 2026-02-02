document.addEventListener("DOMContentLoaded", () => {
  let userOrder = "asc";
  let userSort = "lastName";
  let userSkipCount = 0;
  let userPageCounterView = 1;

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
      sort: `sortBy=${userSort}`,
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
    row.innerHTML = `<td>${user.lastName}</td>
                  <td>${user.firstName}</td>
                  <td>${user.maidenName || "-"}</td>
                  <td>${user.age}</td>
                  <td>${user.gender}</td>
                  <td>${user.phone}</td>
                  <td>${user.email}</td>
                  <td>${user.address.country}</td>
                  <td>${user.address.city}</td>`;
    showModalInfoRow(row, user);
    return row;
  }

  function showModalInfoRow(row, user) {
    row.addEventListener("click", () => {
      body.classList.add("_no-overflow");
      userModal.classList.remove("_none");

      createUserModalInfo(user);
    });
  }

  function createUserModalInfo(user) {
    let fullName = user.firstName + " " + user.maidenName + " " + user.lastName;
    userModalNameElem.textContent = fullName;
    userModalImage.src = user.image || alert("нет фото");

    let dataModal = [
      user.age,
      user.address.address,
      user.height,
      user.weight,
      user.phone,
      user.email,
    ];

    userModalDataItem.forEach((item, index) => {
      item.textContent = dataModal[index];
    });
  }

  userModalCloseBtn.addEventListener("click", () => {
    body.classList.remove("_no-overflow");
    userModal.classList.add("_none");
  });

  userOrderSelect.addEventListener("change", (event) => {
    userOrder = event.target.value;
  });

  userOrderSelectByName.addEventListener("change", (event) => {
    userSort = event.target.value;
  });

  userOrderBtnTable.addEventListener("click", () => {
    showUserTable();
  });

  userUnorderBtnTable.addEventListener("click", () => {
    userSort = "";
    showUserTable();
  });

  userPageBtnPrev.addEventListener("click", () => {
    userSkipCount = userSkipCount - 10;
    userPageCounterElement.textContent = userPageCounterView - 1;

    if (userSkipCount < 0) {
      userSkipCount = 0;
      userPageCounterElement.textContent = userPageCounterView = 1;
    }

    showUserTable();

    userPageCounterView--;
    userPageCounterElement.textContent = userPageCounterView;

    if (userSkipCount <= 0) {
      userPageCounterView = 1;
      userPageCounterElement.textContent = userPageCounterView;
    }
  });

  userPageBtnNext.addEventListener("click", () => {
    userSkipCount = userSkipCount + 10;

    showUserTable();

    userPageCounterView++;
    userPageCounterElement.textContent = userPageCounterView;
  });
});
