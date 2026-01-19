const url = "https://dummyjson.com/users?limit=10";

fetch(url)
    .then(response => response.json())
    .then(data => {
        let users = data.users;

        let list = document.getElementById('app');
        list.innerHTML = "";

        users.forEach(user => {
            const el = document.createElement('p');
            el.textContent = `${user.id}: ${user.firstName} ${user.lastName} - ${user.email}`;
            list.append(el);
            console.log(user.firstName);
        });
    })
    .catch(error => {
        console.log("Ошибка: ", error);
        document.getElementById('app').textContent = "Ошибка загрузки!";
    })