const url = "https://dummyjson.com/users?limit=60";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    let users = data.users;
    let table = document.querySelector(".app-list");

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
