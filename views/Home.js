import html from "html";
import Lessons from "../components/Lessons.js";
import Filterbar from "../components/Filterbar.js";
import Navbar from "../components/Navbar.js";

export default {
  template: html`
    <Navbar v-bind:carts="carts" />
    <div class="row mt-4 container-fluid">
      <Filterbar
        v-bind:filterOptions="filterOptions"
        v-on:changeSort="changeSort"
        v-on:changeFilter="changeFilter"
        v-on:changeSearchVal="setSearchVal"
      />
      <Lessons
        v-bind:lessons="filteredLessons"
        v-on:addtocart="addToCart"
        v-bind:isAddToCart="true"
      />
    </div>
  `,
  data: function () {
    return {
      lessons: [],
      filterOptions: {
        sort: "subject",
        filter: "ascending",
      },
      searchVal: "",
      filteredLessons: [],
      carts: [],
    };
  },
  components: {
    Lessons,
    Filterbar,
    Navbar,
  },
  mounted: function () {
    let cartsList = localStorage.getItem("carts");
    this.carts = cartsList ? JSON.parse(cartsList) : [];
    fetch("../data/lessons.json")
      .then((res) => res.json())
      .then((res) => {
        let lessonArr = res.lessons;
        let carts = localStorage.getItem("carts")
          ? JSON.parse(localStorage.getItem("carts"))
          : [];
        if (carts.length > 0) {
          lessonArr.forEach((lesson) => {
            carts.forEach((cart) => {
              if (lesson.id == cart.id) lesson.space -= cart.num;
            });
          });
        }
        this.lessons = lessonArr;
        this.filteredLessons = lessonArr;
        this.filterLessons(
          this.filterOptions.sort,
          this.filterOptions.filter,
          this.filteredLessons
        );
      });
  },
  methods: {
    changeSort: function (sort) {
      this.filterOptions.sort = sort;
      this.filterLessons(
        this.filterOptions.sort,
        this.filterOptions.filter,
        this.filteredLessons
      );
    },
    changeFilter: function (filter) {
      this.filterOptions.filter = filter;
      this.filterLessons(
        this.filterOptions.sort,
        this.filterOptions.filter,
        this.filteredLessons
      );
    },
    filterLessons: function (sortVal, filter, filteringLessons) {
      let filterLessons = filteringLessons;
      filterLessons = filterLessons.sort((a, b) => {
        let fa = a[sortVal],
          fb = b[sortVal];
        if (filter == "ascending") {
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        } else {
          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        }
      });
      this.filteredLessons = filterLessons;
    },
    setSearchVal: function (val) {
      this.searchVal = val;
      this.filterLessons(
        this.filterOptions.sort,
        this.filterOptions.filter,
        this.searchLessons(this.lessons)
      );
    },
    searchLessons: function (lessons) {
      return lessons.filter(
        (lesson) =>
          lesson.subject
            .toString()
            .toLowerCase()
            .includes(this.searchVal.toLowerCase()) ||
          lesson.location
            .toString()
            .toLowerCase()
            .includes(this.searchVal.toLowerCase()) ||
          lesson.price
            .toString()
            .toLowerCase()
            .includes(this.searchVal.toLowerCase()) ||
          lesson.space
            .toString()
            .toLowerCase()
            .includes(this.searchVal.toLowerCase())
      );
    },
    addToCart: function (id) {
      let carts = localStorage.getItem("carts")
        ? JSON.parse(localStorage.getItem("carts"))
        : [];
      let cart = carts.find((cart) => cart.id == id);
      let lesson = this.lessons.find((lesson) => lesson.id == id);
      if (cart) {
        carts.forEach((cart) => {
          if (cart.id == id) cart.num++;
        });
      } else {
        carts.push({ ...lesson, num: 1 });
      }
      let lessonArr = this.filteredLessons;
      lessonArr.forEach((lesson) => {
        if (lesson.id == id) lesson.space--;
      });
      localStorage.setItem("carts", JSON.stringify(carts));
      this.carts = carts;
      this.filterLessons(
        this.filterOptions.sort,
        this.filterOptions.filter,
        lessonArr
      );
    },
  },
};
