// Show the input where the query entered
class SearchView {
  #parentEl = document.querySelector(`.search`);

  getQuery() {
    const query = this.#parentEl.querySelector(`.search__field`).value; // word searched
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentEl.querySelector(`.search__field`).value = ``;
  }

  // Submit handler for searching query
  addHandlerSearch(handler) {
    this.#parentEl.addEventListener(`submit`, function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView(); // Export to the instance of the class
