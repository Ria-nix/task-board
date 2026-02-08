// model.js
const API_URL = "https://dummyjson.com/users";
const LIMIT = 10;

export function createUserModel() {
  let order = "asc";
  let sortBy = "lastName";
  let skip = 0;

  function buildUrl() {
    return `${API_URL}?limit=${LIMIT}&skip=${skip}&sortBy=${sortBy}&order=${order}`;
  }

  function fetchUsers() {
    return fetch(buildUrl())
      .then(response => response.json())
      .then(data => data.users || []);
  }

  return {
    fetchUsers,

    setOrder(value) {
      order = value;
    },

    setSort(value) {
      sortBy = value;
    },

    nextPage() {
      skip += LIMIT;
    },

    prevPage() {
      skip = Math.max(0, skip - LIMIT);
    },

    getPage() {
      return skip / LIMIT + 1;
    }
  };
}
