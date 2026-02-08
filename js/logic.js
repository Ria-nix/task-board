// controller.js
export function createUserController(model, view) {

  function update() {
    model.fetchUsers()
      .then(users => {
        view.renderUsers(users, model.getPage());
      })
      .catch(() => {
        view.renderUsers([], model.getPage());
      });
  }

  function init() {
    view.bindCloseModal();
    update();
  }

  return {
    init,
    update,

    setOrder(value) {
      model.setOrder(value);
      update();
    },

    setSort(value) {
      model.setSort(value);
      update();
    },

    nextPage() {
      model.nextPage();
      update();
    },

    prevPage() {
      model.prevPage();
      update();
    }
  };
}
