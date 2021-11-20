import html from "html";

export default {
  name: `Filterbar`,
  template: html`
    <div class="col-md-3 col-lg-2 mb-4">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Search here..."
          v-on:keyup="changeSearchVal"
        />
      </div>
      <div class="mt-4">
        <h5>Sort By</h5>
        <div class="form-group">
          <input
            type="radio"
            class="form-check-input"
            id="subject"
            name="sort"
            value="subject"
            v-model="filterOptions.sort"
            v-on:change="changeSort"
          />
          <label class="ms-2" for="subject">Subject</label>
        </div>
        <div class="form-group">
          <input
            type="radio"
            class="form-check-input"
            id="location"
            name="sort"
            value="location"
            v-model="filterOptions.sort"
            v-on:change="changeSort"
          />
          <label class="ms-2" for="location">Location</label>
        </div>
        <div class="form-group">
          <input
            type="radio"
            class="form-check-input"
            id="price"
            name="sort"
            value="price"
            v-model="filterOptions.sort"
            v-on:change="changeSort"
          />
          <label class="ms-2" for="price">Price</label>
        </div>
        <div class="form-group">
          <input
            type="radio"
            class="form-check-input"
            id="availability"
            name="sort"
            value="space"
            v-model="filterOptions.sort"
            v-on:change="changeSort"
          />
          <label class="ms-2" for="availability">Availability</label>
        </div>
        <div class="mt-4">
          <div class="form-group">
            <input
              type="radio"
              class="form-check-input"
              id="ascending"
              name="filter"
              v-model="filterOptions.filter"
              value="ascending"
              v-on:change="changeFilter"
            />
            <label class="ms-2" for="ascending">Ascending</label>
          </div>
          <div class="form-group">
            <input
              type="radio"
              class="form-check-input"
              id="descending"
              name="filter"
              v-model="filterOptions.filter"
              value="descending"
              v-on:change="changeFilter"
            />
            <label class="ms-2" for="descending">Descending</label>
          </div>
        </div>
      </div>
    </div>
  `,
  props: ["filterOptions"],
  methods: {
    changeSort(e) {
      this.$emit("changeSort", e.target.value);
    },
    changeFilter(e) {
      this.$emit("changeFilter", e.target.value);
    },
    changeSearchVal(e) {
      this.$emit("changeSearchVal", e.target.value);
    },
  },
};
